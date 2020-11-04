import type { AppProps } from 'next/app'

import Head from 'next/head'
import 'styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{Component.name} &#8210; Coffy</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />
		</>
	)
}
