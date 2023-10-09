'use client'

import { useAuthModal } from '@/hooks/useAuthModal'
import { useOnPlay } from '@/hooks/useOnPlay'
import { useUploadModal } from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { FC } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import { Song } from '../../types'
import MediaItem from './MediaItem'

interface ILibrary {
	songs: Song[]
}

const Library: FC<ILibrary> = ({ songs }) => {
	const authModal = useAuthModal()
	const uploadModal = useUploadModal()
	const { user } = useUser()
	const onPlay = useOnPlay(songs)

	const onClick = () => {
		if (!user) {
			return authModal.onOpen()
		}

		return uploadModal.onOpen()
	}

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<TbPlaylist size={28} className='text-neutral-400' />
					<p className='text-neutral-400 font-medium text-md'>Your library</p>
				</div>
				<AiOutlinePlus
					onClick={onClick}
					size={26}
					className='text-neutral-400 hover:text-white transition cursor-pointer'
				/>
			</div>
			<div className='flex flex-col gap-y-2 mt-4 px-3'>
				{songs.map(item => (
					<MediaItem
						key={item.id}
						data={item}
						onClick={(id: string) => onPlay(id)}
					/>
				))}
			</div>
		</div>
	)
}

export default Library
