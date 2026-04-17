const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET || "secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";
const API_KEY = process.env.API_KEY;

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.use(cors());
app.use(jsonServer.bodyParser);

const db = router.db;

// 🔐 API KEY (opcional)
app.use((req, res, next) => {
	if (!API_KEY) return next();

	const key = req.headers["x-api-key"];
	if (key !== API_KEY) {
		return res.status(403).json({ message: "Forbidden" });
	}

	next();
});

// 🧠 helpers
function createAccessToken(user) {
	return jwt.sign(
		{ id: user.id, role: user.role },
		SECRET,
		{ expiresIn: "15m" }
	);
}

function createRefreshToken(user) {
	return jwt.sign(
		{ id: user.id },
		REFRESH_SECRET,
		{ expiresIn: "7d" }
	);
}

// 🔐 middleware auth
function verifyToken(req, res, next) {
	const auth = req.headers.authorization;

	if (!auth) return res.status(401).json({ message: "No token" });

	try {
		const token = auth.split(" ")[1];
		req.user = jwt.verify(token, SECRET);
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
}

// 🔐 roles
function requireRole(role) {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res.status(403).json({ message: "Forbidden" });
		}
		next();
	};
}

// ================= AUTH =================

// REGISTER
app.post("/auth/register", (req, res) => {
	const { email, password, name, role } = req.body;

	const exists = db.get("users").find({ email }).value();
	if (exists) {
		return res.status(400).json({ message: "User exists" });
	}

	const hashed = bcrypt.hashSync(password, 10);

	const user = {
		id: Date.now(),
		email,
		name,
		password: hashed,
		role: role || "user"
	};

	db.get("users").push(user).write();

	res.json({
		accessToken: createAccessToken(user),
		refreshToken: createRefreshToken(user),
		user: { id: user.id, email: user.email, name: user.name, role: user.role }
	});
});

// LOGIN
app.post("/auth/login", (req, res) => {
	const { email, password } = req.body;

	const user = db.get("users").find({ email }).value();
	if (!user) {
		return res.status(400).json({ message: "Invalid credentials" });
	}

	const valid = bcrypt.compareSync(password, user.password);
	if (!valid) {
		return res.status(400).json({ message: "Invalid credentials" });
	}

	res.json({
		accessToken: createAccessToken(user),
		refreshToken: createRefreshToken(user),
		user: { id: user.id, email: user.email, name: user.name, role: user.role }
	});
});

// REFRESH TOKEN
app.post("/auth/refresh", (req, res) => {
	const { refreshToken } = req.body;

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
		const user = db.get("users").find({ id: decoded.id }).value();

		const newAccessToken = createAccessToken(user);

		res.json({ accessToken: newAccessToken });
	} catch {
		res.status(401).json({ message: "Invalid refresh token" });
	}
});

// ME
app.get("/auth/me", verifyToken, (req, res) => {
	const user = db.get("users").find({ id: req.user.id }).value();

	res.json({
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role
	});
});

// LOGOUT (fake)
app.post("/auth/logout", (req, res) => {
	res.json({ message: "Logged out (client should delete tokens)" });
});

// DELETE USER
app.delete("/users/:id", verifyToken, (req, res, next) => {
	if (req.user.id !== Number(req.params.id) && req.user.role !== "admin") {
		return res.status(403).json({ message: "Forbidden" });
	}
	next();
});

// ================= LINKS =================

// proteger rutas
app.use("/links", verifyToken);

// estadísticas
app.get("/links/stats", (req, res) => {
	const allLinks = db.get("links").value() || [];
	const userLinks = allLinks.filter(link => link.userId === req.user.id);

	const totalLinks = userLinks.length;
	const totalClicks = userLinks.reduce((sum, link) => sum + (link.clicks || 0), 0);

	let mostPopular = null;
	if (totalLinks > 0) {
		mostPopular = userLinks.reduce((max, link) => {
			return (link.clicks || 0) > (max.clicks || 0) ? link : max;
		}, userLinks[0]);
	}

	res.json({
		totalLinks,
		totalClicks,
		mostPopular
	});
});

// ownership automático
app.post("/links", (req, res, next) => {
	req.body.userId = req.user.id;
	req.body.createdAt = new Date().toISOString();
	req.body.clicks = 0;
	req.body.status = "new";
	next();
});

// evitar editar de otros y actualizar status
app.patch("/links/:id", (req, res, next) => {
	const link = db.get("links").find({ id: Number(req.params.id) }).value();

	if (!link) {
		return res.status(404).json({ message: "Not found" });
	}

	if (link.userId !== req.user.id && req.user.role !== "admin") {
		return res.status(403).json({ message: "Forbidden" });
	}

	if (req.body.clicks !== undefined) {
		if (req.body.clicks > 100) {
			req.body.status = "popular";
		} else if (req.body.clicks > 0) {
			req.body.status = "active";
		} else {
			req.body.status = "new";
		}
	}

	next();
});

// eliminar
app.delete("/links/:id", (req, res, next) => {
	const link = db.get("links").find({ id: Number(req.params.id) }).value();

	if (!link) {
		return res.status(404).json({ message: "Not found" });
	}

	if (link.userId !== req.user.id && req.user.role !== "admin") {
		return res.status(403).json({ message: "Forbidden" });
	}

	next();
});

// ================= FINAL =================

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("🚀 API running on port", PORT);
});
