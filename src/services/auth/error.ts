import { IError } from 'models'

export default class AuthError extends Error implements IError {
	constructor(message: string) {
		super(message)
		this.name = 'AuthError'
	}
}
