import { ALogo } from '@/modules/core/components/atom/ALogo'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { themeChange } from 'theme-change'

export function AuthLayout() {
	// useEffect(() => {
	// 	themeChange(false)
	// 	// 👆 false parameter is required for react project
	// }, [])
	return (
		<main className='flex min-h-screen items-center justify-center bg-base-200 px-4 py-12'>

			<div className='w-full max-w-[450px] space-y-8'>
				{/* <Link to='/' className='block text-center'>
					<h1 className='text-5xl font-bold text-secondary'>Shortly</h1>
				</Link>*/}
				<ALogo className='flex' imgClassName='w-46' />

				<Outlet />
			</div>
		</main>
	)
}
