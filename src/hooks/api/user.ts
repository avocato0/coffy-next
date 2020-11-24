import { PrivateRouteModel } from 'services/api/model'
import { HttpService } from 'services/http'

export const useUser = () => {
	const { data, error } = HttpService.get<PrivateRouteModel.Me>('/api/me')

	return {
		data,
		isError: !!error,
		isLoading: !data && !error,
	}
}
