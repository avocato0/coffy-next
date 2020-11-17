import authService from 'services/auth'
import { UnauthApiError } from 'services/api/error'
import ApiService from 'services/api'

export default ApiService.getHandler(async ({ data: { accessToken } }) => {
	if (!accessToken) throw UnauthApiError()
	return authService.verify(accessToken)
})
