import User from 'components/User'
import { useUser } from 'hooks/api/user'
import Link from 'next/link'
import { fetcher } from 'services/fetch'
import useSWR from 'swr'
import styles from './Navbar.module.scss'

const navList = [
	{ title: 'Home', link: '/' },
	{ title: 'SignIn', link: '/auth/signin' },
	// { title: 'User', link: '/user' },
]

const Navbar = () => {
	const { user } = useUser()

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
			{user?.name || 'Unknow'}
		</section>
	)
}

export default Navbar
