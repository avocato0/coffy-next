import AuthService, { Constant } from './'

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
			try {
				await AuthService.signin({
					email: user.email,
					password: 'wrong',
				})
			} catch (err) {
				expect(err.name).toBe('AuthError')
				expect(err.message).toBe(Constant.SignInMessage.WRONG_PASSWORD)
			}
		})
	})

	describe('Verify', () => {
		test('Must verify valid access token', async () => {
			const tokens = await AuthService.signin(user)
			const payload = await AuthService.verify(tokens.accessToken)

			expect(payload).toEqual({ id: '1' })
		})

		test('Must generate Error for invalid token', async () => {
			try {
				await AuthService.verify('wrong')
			} catch (err) {
				expect(err.name).toBe('AuthError')
				expect(err.message).toBe(Constant.VerifyMessage.FORBIDDEN)
			}
		})

		test.only('Must generate Error for expired token', async () => {
			process.env.TOKEN_EXPIRED = '0'
			const tokens = await AuthService.signin(user)

			const payload = await AuthService.verify(tokens.accessToken)
			console.log(payload)
			// try {
			// } catch (err) {
			// 	expect(err.name).toBe('AuthError')
			// 	expect(err.message).toBe(Constant.VerifyMessage.FORBIDDEN)
			// }
		})
	})
})
