import TokenService, { Constant } from './'

const USER_ID = '137'

describe('Token Service', () => {
	test('Must generate access and refresh tokens with valid payload', async () => {
		const tokens = TokenService.makeTokens({ id: USER_ID })

		expect(tokens.accessToken).toBeDefined()
		expect(tokens.refreshToken).toBeDefined()

		const payload = await TokenService.verify(tokens.accessToken)
		expect(payload.id).toBe(USER_ID)
	})

	test('Must generate Error for expired tokens', async () => {
		process.env.TOKEN_EXPIRED = '0'
		const tokens = TokenService.makeTokens({ id: USER_ID })

		expect(TokenService.verify(tokens.accessToken)).rejects.toThrowError(
			Constant.TokenMessage.EXPIRED
		)
	})

	test('Must generate new tokens from expired update token', async () => {
		process.env.TOKEN_EXPIRED = '0'
		const tokens = TokenService.makeTokens({ id: USER_ID })

		// @ts-ignore
		await wait(1000)

		const newTokens = TokenService.updateTokens(tokens.refreshToken)

		expect(newTokens.accessToken).toBeDefined()
		expect(newTokens.refreshToken).toBeDefined()

		expect(() => {
			TokenService.updateTokens(tokens.refreshToken)
		}).toThrowError(Constant.TokenMessage.NOT_EXIST)
	})
})
