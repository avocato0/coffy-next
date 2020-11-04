import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from 'next'
import Link from 'next/link'
import { getGithubData } from '../../api/sandbox'
import { useRouter } from 'next/router'

export async function getServerSideProps(
	context: GetServerSidePropsContext
): GetServerSidePropsResult {
	const data = await getGithubData(` 
		query {
			viewer {
				repository(name: "${context.params.repoName}") {
					url
					updatedAt
					pushedAt
					nameWithOwner
				}
			}
		}
	`)

	return {
		props: {
			data,
		},
	}
}

const User = ({ data }) => {
	const { isFallback } = useRouter()

	return (
		<>
			<h1 className='test'>User Page</h1>
			<pre>
				{isFallback
					? 'Repository is loading...'
					: `Data: ${JSON.stringify(data, null, '\t')}`}
			</pre>
			<Link href='/user'>
				<a>Back</a>
			</Link>
		</>
	)
}

export default User
