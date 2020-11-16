import AuthService from 'services/auth'
import { IApiAuth } from 'models/api'
import { getHandler } from 'utils/api'

export default getHandler<IApiAuth>(async ({ data: { body } }) => {
	return AuthService.signin(body)
})
