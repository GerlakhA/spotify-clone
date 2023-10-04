import { User } from '@supabase/auth-helpers-nextjs'
import { createContext } from 'react'
import { ISubscription, IUserDeteails } from '../../types'

type UserContextType = {
	accessToken: string | null
	user: User | null
	userDetails: IUserDeteails | null
	isLoading: boolean
	subscription: ISubscription | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
	[propName: string]: any
}

const MyUserContetxProvider = (props: Props) => {
	return <div>useUser</div>
}

export default MyUserContetxProvider
