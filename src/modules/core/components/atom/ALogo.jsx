import { Link } from 'react-router'

import { Logo } from '@/assets/img'
import { useTheme } from '@/modules/core/hooks/use-theme'
import { cn } from '@/modules/core/utils/cn'

export function ALogo({ className, imgClassName }) {
	const { theme } = useTheme()

	return (
		<Link to='/' className={cn('btn px-0 btn-link', className)}>
			<img
				className={cn(
					{
						invert: ['cobalt', 'cyberpunk'].includes(theme),
					},
					imgClassName
				)}
				src={Logo}
				alt='Shortly logo'
			/>
		</Link>
	)
}
