export default class UserError extends Error {
	name = 'UserError'

	constructor(public message: string) {
		super()
	}
}
