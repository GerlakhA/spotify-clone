import SideBar from '@/components/SideBar'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '../providers/SupabaseProvider'
import './globals.css'

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
				<SupabaseProvider>
					<SideBar>{children}</SideBar>
				</SupabaseProvider>
			</body>
		</html>
	)
}
