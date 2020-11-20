import Navbar from 'components/Navbar'
import Head from 'next/head'

import 'styles/globals.scss'

import type { AppProps } from 'next/app'

// import { InjectStoreContext } from 'store'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{Component.name} &#8210; Coffy</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navbar />
			<Component {...pageProps} />
		</>
	)
}
