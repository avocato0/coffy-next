import { getHandler } from 'utils/api'
import authService from 'services/auth'
import { UnauthApiError } from 'errors/api'

export default getHandler(async ({ data: { accessToken } }) => {
	if (!accessToken) throw UnauthApiError()
	return authService.verify(accessToken)
})
