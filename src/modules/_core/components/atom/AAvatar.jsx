import { useState } from 'react'

export function AAvatar({
	src,
	alt = '',
	className = '',
	sizeClass = 'w-20',
	shapeClass = 'rounded-full',
	textClass = 'text-2xl',
	...props
}) {
	const [imgError, setImgError] = useState(false)

	// Extraer iniciales del texto alt, máximo 2 letras
	const initials = alt
		? alt
				.split(' ')
				.filter(word => word.trim().length > 0)
				.map((n) => n[0])
				.join('')
				.substring(0, 2)
				.toUpperCase()
		: 'U'

	const showImage = Boolean(src && !imgError)

	return (
		<div className={`avatar ${!showImage ? 'avatar-placeholder placeholder' : ''} ${className}`} {...props}>
			<div className={`${sizeClass} ${shapeClass} ${!showImage ? 'bg-base-200 text-base-content' : ''}`}>
				{showImage ? (
					<img 
						src={src} 
						alt={alt} 
						onError={() => setImgError(true)} 
						className="object-cover w-full h-full"
					/>
				) : (
					<span className={`${textClass} font-bold`}>{initials}</span>
				)}
			</div>
		</div>
	)
}
