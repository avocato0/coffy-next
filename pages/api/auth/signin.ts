import AuthService from 'services/auth'
import ApiService, { Model as ApiModel, ApiError } from 'services/api'

export default ApiService.getHandler<ApiModel.IApiAuth>(
	async ({ data: { body } }) => {
		try {
			return await AuthService.signin(body)
		} catch (err) {
			throw new ApiError(err.message, ApiError.status.BAD_REQUEST)
		}
	}
)
