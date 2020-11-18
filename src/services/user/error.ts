import type { IError } from 'models'

export default class UserError extends Error implements IError {
	constructor(message: string) {
		super(message)
		this.name = 'UserError'
	}
}
