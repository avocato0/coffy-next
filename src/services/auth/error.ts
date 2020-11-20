class AuthError extends Error {
	name = 'AuthError'

	constructor(public message: string, public inner?: Error) {
		super()
	}
}

export default AuthError
