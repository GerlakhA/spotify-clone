'use client'

import { useAuthModal } from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { toast } from 'sonner'

interface ILikeButton {
	songId: string
}

const LikeButton: FC<ILikeButton> = ({ songId }) => {
	const [isLiked, setIsLiked] = useState(false)
	const router = useRouter()
	const { supabaseClient } = useSessionContext()
	const authModal = useAuthModal()

	const { user } = useUser()

	useEffect(() => {
		if (!user?.id) return

		const fetchData = async () => {
			const { data, error } = await supabaseClient
				.from('liked_songs')
				.select('*')
				.eq('user_id', user.id)
				.eq('song_id', songId)
				.single()

			if (!error && data) {
				setIsLiked(true)
			}
		}

		fetchData()
	}, [songId, supabaseClient, user?.id])

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart

	const clickLike = async () => {
		if (!user) {
			authModal.onOpen()
		}

		if (isLiked) {
			const { error } = await supabaseClient
				.from('liked_songs')
				.delete()
				.eq('user_id', user?.id)
				.eq('song_id', songId)

			if (error) {
				toast.error(error.message)
			} else {
				setIsLiked(false)
				toast.success('Removed from favorites')
			}
		} else {
			const { error } = await supabaseClient.from('liked_songs').insert({
				song_id: songId,
				user_id: user?.id,
			})

			if (error) {
				toast.error(error.message)
			} else {
				setIsLiked(true)
				toast.success('Added to favorites!')
			}
		}

		router.refresh()
	}

	return (
		<button onClick={clickLike} className='hover:opacity-75 cursor-pointer'>
			<Icon color={isLiked ? '#22c55e' : '#fff'} size={30} />
		</button>
	)
}

export default LikeButton
