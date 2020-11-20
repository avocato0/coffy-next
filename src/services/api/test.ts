import { StoreService } from 'services/store'

import type { PrivateRouteModel, RouteModel } from './model'
import { fetcher } from 'services/fetch'
import ApiError from './error'

const user = {
	email: '0.snilcy@gmail.com',
	password: '123456',
}

const auth = () => fetcher<RouteModel.Auth>('/api/auth/signin', user)

beforeEach(StoreService.clear)

describe('API Service', () => {
	describe('SignIn', () => {
		test('Must generate access and refresh tokens for valid authentication data', async () => {
			const response = await auth()

			expect(response.data?.accessToken).toBeDefined()
			expect(response.data?.refreshToken).toBeDefined()
			expect(response.errors.length).toBe(0)
		})

		test('Must generate Error for invalid user', async () => {
			const response = await fetcher<RouteModel.Auth>(
				'/api/auth/signin',
				{
					email: user.email,
					password: 'wrong',
				}
			)

			expect(response.data).toBeNull()
			expect(response.errors[0].name).toBe(ApiError.name)
		})
	})

	describe('Private route', () => {
		test('Must return DB user for valid access token', async () => {
			const { data: tokens } = await auth()

			StoreService.tokens = tokens
			const response = await fetcher<PrivateRouteModel.Me>('/api/me')

			expect(response.data).toBeDefined()
			expect(response.errors.length).toBe(0)
		})

		test('Must return error for empty token', async () => {
			const response = await fetcher<PrivateRouteModel.Me>('/api/me')

			expect(response.data).toBeNull()
			expect(response.errors[0].name).toBe(ApiError.name)
		})
	})

	describe('Update tokens', () => {
		test('Must return new tokens for valid refresh token', async () => {
			const { data: tokens } = await auth()

			if (tokens) {
				const response = await fetcher<RouteModel.UpdateToken>(
					'/api/auth/update',
					tokens.refreshToken
				)

				expect(response.data?.accessToken).toBeDefined()
				expect(response.data?.refreshToken).toBeDefined()
				expect(response.errors.length).toBe(0)
			}
		})

		test('Must return new tokens and data for expired acess token and valid refresh', async () => {
			process.env.TOKEN_EXPIRED = '1s'
			const { data: tokens } = await auth()
			// @ts-ignore
			await wait(1000)

			StoreService.tokens = tokens
			const response = await fetcher<PrivateRouteModel.Me>('/api/me')

			expect(response.data).toBeDefined()
			expect(response.errors.length).toBe(0)
		})
	})
})
