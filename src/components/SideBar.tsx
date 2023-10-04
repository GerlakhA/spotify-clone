'use client'

import { usePathname } from 'next/navigation'
import { FC, useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import Box from './Box'
import Library from './Library'
import SidebarItem from './SidebarItem'

interface ISideBar {
	children: React.ReactNode
}

const SideBar: FC<ISideBar> = ({ children }) => {
	const pathname = usePathname()

	const routes = useMemo(
		() => [
			{
				icon: HiHome,
				label: 'Home',
				active: pathname !== '/search',
				href: '/',
			},
			{
				icon: BiSearch,
				label: 'Search',
				active: pathname === '/search',
				href: '/search',
			},
		],
		[pathname]
	)

	return (
		<div className='flex h-full'>
			<div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
				<Box className='flex flex-col gap-y-4 p-5'>
					{routes.map(item => (
						<SidebarItem key={item.label} {...item} />
					))}
				</Box>
				<Box className='overflow-y-auto h-full'>
					<Library />
				</Box>
			</div>
			<main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
		</div>
	)
}

export default SideBar
