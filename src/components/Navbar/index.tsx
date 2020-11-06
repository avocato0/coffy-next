import { Observer, observer, useLocalObservable } from 'mobx-react-lite'
import Link from 'next/link'
import { useStore } from 'store'
import styles from './Navbar.module.scss'

const navList = [
	{ title: 'Home', link: '/' },
	{ title: 'SignIn', link: '/auth/signin' },
	// { title: 'User', link: '/user' },
]

const Navbar = () => {
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
}

export default Navbar
