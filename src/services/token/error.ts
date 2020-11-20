export default class TokenError extends Error {
	constructor(public message: string) {
		super()
	}
}
