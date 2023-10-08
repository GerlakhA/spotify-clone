import getSongsByTitle from '@/actions/getSongsByTitle'
import { FC } from 'react'

interface ISearch {
	searchParams: {
		title: string
	}
}

const Search: FC<ISearch> = ({ searchParams }) => {
	const songs = getSongsByTitle(searchParams.title)
	return (
		<div
			className='bg-neutral-900 rounded-lg w-full h-full
	overflow-hidden overflow-y-auto'
		>
			page
		</div>
	)
}

export default Search
