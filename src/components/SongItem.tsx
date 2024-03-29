'use client'

import { useLoadImage } from '@/hooks/useLoadImage'
import Image from 'next/image'
import { FC } from 'react'
import { Song } from '../../types'
import PlayButton from './PlayButton'

interface ISongItem {
	data: Song
	onClick: (id: string) => void
}

const SongItem: FC<ISongItem> = ({ data, onClick }) => {
	const imagePath = useLoadImage(data)
	return (
		<div
			onClick={() => onClick(data.id)}
			className='relative group flex flex-col items-center justify-center
       rounded-md overflow-hidden bg-neutral-400/5 gap-x-4 cursor-pointer
       hover:bg-neutral-400/10 transition p-3'
		>
			<div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
				<Image
					className='object-cover'
					src={imagePath || '/images/liked.png'}
					fill
					alt='Image'
				/>
			</div>
			<div className='flex flex-col items-start w-full pt-4 gap-y-1'>
				<p className='font-semibold truncate w-full'>{data.title}</p>
				<p className='text-neutral-400'>By {data.author}</p>
			</div>
			<div className='absolute bottom-24 right-5'>
				<PlayButton />
			</div>
		</div>
	)
}

export default SongItem
