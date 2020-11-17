import AuthService from 'services/auth'
import { IApiAuth, IApiUpdateToken } from 'services/api/model'
import ApiService from 'services/api'

export default ApiService.getHandler<IApiUpdateToken>(
	async ({ data: { body } }) => {
		return AuthService.updateTokens(body)
	}
)
