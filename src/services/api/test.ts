import { ApiService, PrivateRouteModel, RouteModel } from './'
import { AuthConstant } from 'services/auth'
import { StoreService } from 'services/store'

const user = {
	email: '0.snilcy@gmail.com',
	password: '123456',
}

const auth = () => ApiService.fetch<RouteModel.Auth>('/api/auth/signin', user)

beforeEach(StoreService.clear)

describe('API Service', () => {
	describe('SignIn', () => {
		test('Must generate access and refresh tokens for valid authentication data', async () => {
			const response = await auth()

			expect(response.data?.accessToken).toBeDefined()
			expect(response.data?.refreshToken).toBeDefined()
			expect(response.error).toBeNull()
			expect(response.status).toBe(200)
		})

		test('Must generate Error for invalid user', async () => {
			const response = await ApiService.fetch<RouteModel.Auth>(
				'/api/auth/signin',
				{
					email: user.email,
					password: 'wrong',
				}
			)

			expect(response.error).toMatch(
				AuthConstant.Message.SignIn.WRONG_PASSWORD
			)
			expect(response.data).toBeNull()
			expect(response.status).toBe(400)
		})
	})

	describe('Private route', () => {
		test('Must return DB user for valid access token', async () => {
			const { data: tokens } = await auth()

			StoreService.tokens = tokens
			const response = await ApiService.fetch<PrivateRouteModel.Me>(
				'/api/me'
			)

			expect(response.data).toBeDefined()
			expect(response.error).toBeNull()
			expect(response.status).toBe(200)
		})

		test('Must return error for empty token', async () => {
			const response = await ApiService.fetch<PrivateRouteModel.Me>(
				'/api/me'
			)
			expect(response.status).toBe(401)
			expect(response.data).toBeNull()
		})
	})

	describe('Update tokens', () => {
		test('Must return new tokens for valid refresh token', async () => {
			const { data: tokens } = await auth()

			if (tokens) {
				const response = await ApiService.fetch<RouteModel.UpdateToken>(
					'/api/auth/update',
					tokens.refreshToken
				)

				expect(response.data?.accessToken).toBeDefined()
				expect(response.data?.refreshToken).toBeDefined()
				expect(response.error).toBeNull()
				expect(response.status).toBe(200)
			}
		})

		test('Must return new tokens and data for expired acess token and valid refresh', async () => {
			process.env.TOKEN_EXPIRED = '1s'
			const { data: tokens } = await auth()
			// @ts-ignore
			await wait(1000)

			StoreService.tokens = tokens
			const response = await ApiService.fetch<PrivateRouteModel.Me>(
				'/api/me'
			)

			expect(response.data).toBeDefined()
			expect(response.status).toBe(200)
		})
	})
})
