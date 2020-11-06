import Navbar from 'components/Navbar'
import type { AppProps } from 'next/app'

import Head from 'next/head'
import { InjectStoreContext } from 'store'
import 'styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<InjectStoreContext>
			<Head>
				<title>{Component.name} &#8210; Coffy</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navbar />
			<Component {...pageProps} />
		</InjectStoreContext>
	)
}
