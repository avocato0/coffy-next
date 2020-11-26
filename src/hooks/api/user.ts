import { PrivateRouteModel } from 'services/api/model'
import { HttpService } from 'services/http'

export const useUser = () => {
	const { data, error } = HttpService.get<PrivateRouteModel.Me>('/api/me', {
		revalidateOnFocus: false,
	})

	return {
		data,
		isError: !!error,
		isLoading: !data && !error,
	}
}
