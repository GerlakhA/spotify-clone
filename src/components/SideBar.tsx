'use client'

import { usePlayer } from '@/hooks/usePlayer'
import { usePathname } from 'next/navigation'
import { FC, useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import { Song } from '../../types'
import Box from './Box'
import Library from './Library'
import SidebarItem from './SidebarItem'

interface ISideBar {
	children: React.ReactNode
	songs: Song[]
}

const SideBar: FC<ISideBar> = ({ children, songs }) => {
	const pathname = usePathname()
	const player = usePlayer()

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
		<div
			className={twMerge(
				`
			flex
			h-full
		`,
				player.activeId && 'h-[calc(100%-80px)]'
			)}
		>
			<div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
				<Box className='flex flex-col gap-y-4 p-5'>
					{routes.map(item => (
						<SidebarItem key={item.label} {...item} />
					))}
				</Box>
				<Box className='overflow-y-auto h-full'>
					<Library songs={songs} />
				</Box>
			</div>
			<main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
		</div>
	)
}

export default SideBar
