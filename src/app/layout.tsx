import SideBar from '@/components/SideBar'
import ModalProvider from '@/providers/ModalProvider'
import UserProvider from '@/providers/UserProvider'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '../providers/SupabaseProvider'
import './globals.css'
import { Toaster } from 'sonner'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spotify clone',
	description: 'Listen to music',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<Toaster position='top-center' />
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider />
						<SideBar>{children}</SideBar>
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	)
}
