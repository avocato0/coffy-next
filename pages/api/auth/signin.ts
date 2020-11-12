import AuthService from 'services/auth'
import { IApiAuth } from 'models/api'
import { getHandler } from 'utils/api'

export default getHandler<IApiAuth>(async (user) => {
	return AuthService.signin(user)
})
