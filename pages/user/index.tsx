import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { getGithubData } from '../../api/sandbox'

const User = ({ data }: any) => {
	const size = 200
	const name = data.viewer.name
	return (
		<>
			<h1 className='test'>{name}</h1>
			<img
				src={data.viewer.avatarUrl}
				width={size}
				height={size}
				alt={name}
			/>
			<ul>
				{data.viewer.repositories.nodes.map(({ name }) => {
					return (
						<li key={name}>
							<Link href={`user/${name}`}>
								<a>{name}</a>
							</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const data = await getGithubData(
		` query {
				viewer {
					name
					avatarUrl
					repositories(first: 30) {
						nodes {
							name
							url
						}
					}
				}
			}
					
		`
	)

	return {
		props: {
			data,
		},
	}
}

export default User
