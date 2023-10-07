'use client'

import { useAuthModal } from '@/hooks/useAuthModal'
import { useUploadModal } from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

const Library = () => {
	const authModal = useAuthModal()
	const uploadModal = useUploadModal()
	const { user } = useUser()
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
			<div className='flex flex-col gap-y-2 mt-4 px-3'>List songs!</div>
		</div>
	)
}

export default Library
