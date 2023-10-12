import getSongsByUserId from '@/actions/getSongsByuserId'
import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import { Toaster } from 'sonner'
import Player from '../components/Player'
import SideBar from '../components/SideBar'
import SupabaseProvider from '../providers/SupabaseProvider'
import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spotify clone',
	description: 'Listen to music',
}

export const revalidate = 0

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const userSongs = await getSongsByUserId()
	return (
		<html lang='en'>
			<body className={font.className}>
				<Toaster
					position='top-center'
					theme='dark'
					closeButton
					duration={2500}
				/>
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider />
						<SideBar songs={userSongs}>{children}</SideBar>
						<Player />
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	)
}
