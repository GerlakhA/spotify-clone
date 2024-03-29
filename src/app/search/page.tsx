import getSongsByTitle from '@/actions/getSongsByTitle'
import { FC } from 'react'
import Header from '../../components/Header'
import SearchContent from '../../components/SearchContent'
import SearchInput from '../../components/SearchInput'

interface ISearch {
	searchParams: {
		title: string
	}
}

const Search: FC<ISearch> = async ({ searchParams }) => {
	const songs = await getSongsByTitle(searchParams.title)
	return (
		<div
			className='bg-neutral-900 rounded-lg w-full h-full
			overflow-hidden overflow-y-auto'
		>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-3xl text-white font-semibold'>Search</h1>
					<SearchInput />
				</div>
			</Header>
			<SearchContent songs={songs} />
		</div>
	)
}

export default Search
