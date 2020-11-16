import { TokenExpiredError } from 'jsonwebtoken'
import authService from 'services/auth'

const USER_ID = 137

describe('JWT', () => {
	test('Must generate access and refresh tokens with valid payload', async () => {
		const tokens = authService.makeToken({ id: USER_ID })

		expect(tokens.accessToken).toBeDefined()
		expect(tokens.refreshToken).toBeDefined()

		const payload = await authService.verify(tokens.accessToken)
		expect(payload.id).toBe(USER_ID)
	})

	test('Must generate Error for invalid user', async () => {
		process.env.TOKEN_EXPIRED = '0'
		const tokens = authService.makeToken({ id: USER_ID })

		try {
			await authService.verify(tokens.accessToken)
		} catch (err) {
			expect(err).toBeInstanceOf(TokenExpiredError)
		}
	})
})
