'use client'

import { MyUserContextProvider } from '@/hooks/useUser'
import { FC } from 'react'

interface IUserProvider {
	children: React.ReactNode
}

const UserProvider: FC<IUserProvider> = ({ children }) => {
	return <MyUserContextProvider>{children}</MyUserContextProvider>
}

export default UserProvider
