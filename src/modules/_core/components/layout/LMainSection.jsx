export function LMainSection({ title, children }) {
	return (
		<div className="w-full">
			<h1 className="text-2xl md:text-3xl font-bold text-base-content mb-6 md:mb-8 tracking-tight text-center md:text-left">
				{title}
			</h1>

			<main>
				{children}
			</main>
		</div>
	)
}

export default LMainSection
