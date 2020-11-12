import Link from 'next/link'
import { useEffect } from 'react'
import { useStore, observer } from 'store'
import styles from './Navbar.module.scss'

const navList = [
	{ title: 'Home', link: '/' },
	{ title: 'SignIn', link: '/auth/signin' },
	// { title: 'User', link: '/user' },
]

const Navbar = observer(() => {
	const store = useStore()
	return (
		<section className={styles.Container}>
			<nav>
				<ul>
					{navList.map(({ title, link }) => {
						return (
							<li key={link}>
								<Link href={link}>
									<a>{title}</a>
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
			{store.user.name}
		</section>
	)
})

export default Navbar
