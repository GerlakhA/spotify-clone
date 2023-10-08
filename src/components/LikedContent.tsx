'use client'

import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import { Song } from '../../types'
import LikeButton from './LikeButton'
import MediaItem from './MediaItem'

interface ILikedContent {
	songs: Song[]
}

const LikedContent: FC<ILikedContent> = ({ songs }) => {
	const router = useRouter()
	const { isLoading, user } = useUser()

	useEffect(() => {
		if (!isLoading && !user) {
			return router.replace('/')
		}
	}, [isLoading, user, router])

	if (songs.length === 0) {
		return (
			<div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
				You havent added any songs to your favorites
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-y-2 w-full p-6'>
			{songs.map(item => (
				<div key={item.id} className='flex items-center gap-x-4 w-full'>
					<div className='flex-1'>
						<MediaItem data={item} />
					</div>
					<LikeButton songId={item.id} />
				</div>
			))}
		</div>
	)
}

export default LikedContent
