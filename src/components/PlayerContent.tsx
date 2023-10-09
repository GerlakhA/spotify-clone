'use client'

import { usePlayer } from '@/hooks/usePlayer'
import { FC, useEffect, useState } from 'react'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import useSound from 'use-sound'
import { Song } from '../../types'
import LikeButton from './LikeButton'
import MediaItem from './MediaItem'
import Slider from './Slider'

interface IPlayerContent {
	song: Song
	songUrl: string
}

const PlayerContent: FC<IPlayerContent> = ({ song, songUrl }) => {
	const [volume, setVolume] = useState(1)
	const [isPlaying, setIsPlaying] = useState(false)

	const player = usePlayer()

	const Icon = isPlaying ? BsPauseFill : BsPlayFill
	const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

	const [play, { pause, sound }] = useSound(songUrl, {
		volume: volume,
		onplay: () => setIsPlaying(true),
		onend: () => {
			setIsPlaying(false)
			onPlayNext()
		},
		onpause: () => setIsPlaying(false),
		format: ['mp3'],
	})

	useEffect(() => {
		sound?.play()

		return () => {
			sound?.unload()
		}
	}, [sound])

	const handlePlayer = () => {
		if (!isPlaying) {
			play()
		} else {
			pause()
		}
	}

	const toggleMute = () => {
		if (volume === 0) {
			setVolume(1)
		} else {
			setVolume(0)
		}
	}

	const onPlayNext = () => {
		if (player.ids.length === 0) return

		const currentIndex = player.ids.findIndex(id => id === player.activeId)

		const nextSong = player.ids[currentIndex + 1]

		if (!nextSong) return player.setId(player.ids[0])

		player.setId(nextSong)
	}

	const onPlayPrevious = () => {
		if (player.ids.length === 0) return

		const currentIndex = player.ids.findIndex(id => id === player.activeId)

		const backSong = player.ids[currentIndex - 1]

		if (!backSong) return player.setId(player.ids[player.ids.length - 1])

		player.setId(backSong)
	}

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 h-full'>
			<div className='flex w-full justify-start'>
				<div className='flex items-center gap-x-4'>
					<MediaItem data={song} />
					<LikeButton songId={song.id} />
				</div>
			</div>
			<div className='flex md:hidden col-auto w-full justify-end items-center'>
				<div
					onClick={handlePlayer}
					className='h-10 w-10 flex justify-center items-center
         rounded-full bg-white p-1 cursor-pointer'
				>
					<Icon size={30} className='text-black' />
				</div>
			</div>
			<div
				className='hidden h-full md:flex justify-center items-center w-full
        max-w[722px] gap-x-6'
			>
				<AiFillStepBackward
					onClick={onPlayPrevious}
					size={30}
					className='text-neutral-400 cursor-pointer hover:text-white transition'
				/>
				<div className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'>
					<Icon size={30} className='text-black' onClick={handlePlayer} />
				</div>
				<AiFillStepForward
					onClick={onPlayNext}
					size={30}
					className='text-neutral-400 cursor-pointer hover:text-white transition'
				/>
			</div>
			<div className='hidden md:flex w-full justify-end pr-2'>
				<div className='flex items-center gap-x-2 w-[120px]'>
					<VolumeIcon
						size={30}
						onClick={toggleMute}
						className='cursor-pointer'
					/>
					<Slider value={volume} onChange={value => setVolume(value)} />
				</div>
			</div>
		</div>
	)
}

export default PlayerContent