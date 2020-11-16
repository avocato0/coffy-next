import User from 'components/User'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from 'utils/api'
import styles from './Navbar.module.scss'

const navList = [
	{ title: 'Home', link: '/' },
	{ title: 'SignIn', link: '/auth/signin' },
	// { title: 'User', link: '/user' },
]

const Navbar = () => {
	// const response = useSWR('/api/me', fetcher)
	// console.log(response.data)

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
			<User />
		</section>
	)
}

export default Navbar
