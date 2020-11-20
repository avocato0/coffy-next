import { fetcher } from 'services/fetch'
import useSWR from 'swr'

export const useUser = () => {
	const { data, error } = useSWR('/api/me', fetcher)

	return {
		user: data?.data,
		isLoading: !error && !data,
	}
}
