import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { Icon } from '@iconify/react'
import { useTheme } from '@/modules/core/hooks/use-theme'
import { AButton } from '@/modules/core/components/atom/AButton'
import { cn } from '@/modules/core/utils/cn'

export function DThemeSwitch({ className, ...prop }) {
	const { theme, setTheme } = useTheme()

	const themeOptions = ['light', 'cobalt', 'cyberpunk']

	// useEffect(() => {
	//   themeChange(false)
	//   // 👆 false parameter is required for react project
	// }, [])

	function handleInput(e) {
		const themeSelected = e.target.value
		setTheme(themeSelected)
	}

	return (
		<aside
			className={cn('dropdown dropdown-end lg:dropdown-bottom', className)}
		>
			<AButton tabIndex={0} className='hidden px-3 lg:flex' variant='ghost'>
				<div className='flex items-center gap-1'>
					<Icon
						className='size-6'
						icon='material-symbols:format-paint-outline'
					/>
					Theme
					<Icon icon='ri:arrow-down-s-line' />
				</div>
			</AButton>
			<AButton tabIndex={0} className='lg:hidden' variant='icon'>
				<Icon className='size-6' icon='material-symbols:format-paint-outline' />
			</AButton>

			<ul
				tabIndex={1}
				className='shadow-1xl dropdown-content z-20 mt-1 w-auto rounded-box bg-base-200 p-2'
			>
				{themeOptions.map(themeOption => (
					<li key={themeOption}>
						<input
							aria-label={themeOption}
							value={themeOption}
							checked={theme === themeOption}
							data-set-theme={themeOption}
							className='theme-controller btn btn-block justify-start capitalize btn-ghost btn-sm'
							type='radio'
							name='theme-dropdown'
							data-act-class='ACTIVECLASS'
							onChange={handleInput}
						/>
					</li>
				))}
			</ul>
		</aside>
		// <select className='select select-bordered w-auto'
		//   <option className='text-sm font-semibold' value='light'>
		//     Light
		//   </option>
		//   <option className='text-sm font-semibold' value='cyberpunk'>
		//     Cyberpunk
		//   </option>
		//   <option className='text-sm font-semibold' value='cobalt'>
		//     Cobalt
		//   </option>
		// </select>
	)
}
