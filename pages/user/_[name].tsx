import {
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import Link from 'next/link'
import { getGithubData } from '../../api/sandbox'
import { useRouter } from 'next/router'

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await getGithubData(` query {
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
	`)

	return {
		paths: data.viewer.repositories.nodes.map(({ name, url }) => ({
			params: { name },
		})),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const data = await getGithubData(` 
		query {
			viewer {
				repository(name: "${context.params.name}") {
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
		revalidate: 10,
	}
}

const User: InferGetStaticPropsType<typeof getStaticProps> = ({ data }) => {
	const { isFallback } = useRouter()
	console.log('User', isFallback, data)

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
