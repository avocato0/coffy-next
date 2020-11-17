import { LoginMessage } from './constant'
import ApiService, { Model as ApiModel } from 'services/api'

const user = {
	email: '0.snilcy@gmail.com',
	password: '123456',
}

describe('Authentication Service', () => {
	describe('SignIn', () => {
		test('Must generate access and refresh tokens for valid authentication data', async () => {
			const response = await ApiService.fetcher<ApiModel.IApiAuth>(
				'/api/auth/signin',
				user
			)

			expect(response.data?.accessToken).toBeDefined()
			expect(response.data?.refreshToken).toBeDefined()
			expect(response.error).toBeNull()
			expect(response.status).toBe(200)
		})

		test('Must generate Error for invalid user', async () => {
			const response = await ApiService.fetcher<ApiModel.IApiAuth>(
				'/api/auth/signin',
				{
					email: user.email,
					password: 'wrong',
				}
			)

			expect(response.error).toMatch(LoginMessage.WRONG_PASSWORD)
			expect(response.data).toBeNull()
			expect(response.status).toBe(400)
		})
	})

	describe('Authentication verify', () => {
		test.only('Must verify valid access token', async () => {
			const verify = AuthS

			expect('').toBe(null)
		})
	})
})
