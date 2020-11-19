import { AuthService, AuthConstant } from './'

const user = {
	email: '0.snilcy@gmail.com',
	password: '123456',
}

describe('Authentication Service', () => {
	describe('SignIn', () => {
		test('Must generate access and refresh tokens for valid authentication data', async () => {
			const tokens = await AuthService.signin(user)

			expect(tokens.accessToken).toBeDefined()
			expect(tokens.refreshToken).toBeDefined()
		})

		test('Must generate Error for invalid user', async () => {
			expect(
				AuthService.signin({
					email: user.email,
					password: 'wrong',
				})
			).rejects.toThrowError(AuthConstant.Message.SignIn.WRONG_PASSWORD)
		})
	})

	describe('Verify', () => {
		test('Must verify valid access token', async () => {
			const tokens = await AuthService.signin(user)
			const payload = await AuthService.verify(tokens.accessToken)

			expect(payload).toEqual({ id: '1' })
		})

		test('Must generate Error for invalid token', async () => {
			expect(AuthService.verify('wrong')).rejects.toThrowError(
				AuthConstant.Message.Verify.UNAUTHORIZED
			)
		})

		test('Must generate Error for expired token', async () => {
			process.env.TOKEN_EXPIRED = '0'
			const tokens = await AuthService.signin(user)

			expect(AuthService.verify(tokens.accessToken)).rejects.toThrowError(
				AuthConstant.Message.Verify.UNAUTHORIZED
			)
		})
	})

	describe('Update', () => {
		test('Must generate new tokens from valid refresh token', async () => {
			const tokens = await AuthService.signin(user)
			const newTokens = AuthService.updateTokens(tokens.refreshToken)

			expect(newTokens.accessToken).toBeDefined()
			expect(newTokens.refreshToken).toBeDefined()
		})

		test('Must generate Error for invalid refresh token', async () => {
			expect(() => {
				AuthService.updateTokens('wrong')
			}).toThrowError(AuthConstant.Message.Verify.UNAUTHORIZED)
		})
	})
})
