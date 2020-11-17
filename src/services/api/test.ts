import ApiService, { Model as ApiModel } from './'
import { Constant as AuthConstant } from 'services/auth'

const user = {
	email: '0.snilcy@gmail.com',
	password: '123456',
}

describe('API Service', () => {
	describe('SignIn', () => {
		test('Must generate access and refresh tokens for valid authentication data', async () => {
			const response = await ApiService.fetch<ApiModel.IApiAuth>(
				'/api/auth/signin',
				user
			)

			expect(response.data?.accessToken).toBeDefined()
			expect(response.data?.refreshToken).toBeDefined()
			expect(response.error).toBeNull()
			expect(response.status).toBe(200)
		})

		test('Must generate Error for invalid user', async () => {
			const response = await ApiService.fetch<ApiModel.IApiAuth>(
				'/api/auth/signin',
				{
					email: user.email,
					password: 'wrong',
				}
			)

			expect(response.error).toMatch(
				AuthConstant.SignInMessage.WRONG_PASSWORD
			)
			expect(response.data).toBeNull()
			expect(response.status).toBe(400)
		})
	})

	describe('Update tokens', () => {
		test('Must return new tokens for valid refresh token', async () => {
			const { data: tokens } = await ApiService.fetch<ApiModel.IApiAuth>(
				'/api/auth/signin',
				user
			)

			if (tokens) {
				const response = await ApiService.fetch<
					ApiModel.IApiUpdateToken
				>('/api/auth/update', tokens.refreshToken)

				expect(response.data?.accessToken).toBeDefined()
				expect(response.data?.refreshToken).toBeDefined()
				expect(response.error).toBeNull()
				expect(response.status).toBe(200)
			}
		})
	})
})
