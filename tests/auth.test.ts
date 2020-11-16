import { LoginMessage } from 'constants/auth'
import { IApiAuth } from 'models/api'
import { fetcher } from 'utils/api'

const user = {
	email: '0.snilcy@gmail.com',
	password: '123456',
}

describe('Authentication API', () => {
	test('Must generate access and refresh tokens for valid authentication data', async () => {
		const response = await fetcher<IApiAuth>('/api/auth/signin', user)

		expect(response.data?.accessToken).toBeDefined()
		expect(response.data?.refreshToken).toBeDefined()
		expect(response.error).toBeNull()
		expect(response.status).toBe(200)
	})

	test('Must generate Error for invalid user', async () => {
		const response = await fetcher<IApiAuth>('/api/auth/signin', {
			email: user.email,
			password: 'wrong',
		})

		expect(response.error).toMatch(LoginMessage.WRONG_PASSWORD)
		expect(response.data).toBeNull()
		expect(response.status).toBe(400)
	})
})
