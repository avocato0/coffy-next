import AuthService from 'services/auth'
import { IApiAuth, IApiUpdateToken } from 'models/api'
import { getHandler } from 'utils/api'

export default getHandler<IApiUpdateToken>(async ({ data: { body } }) => {
	return AuthService.updateTokens(body)
})
