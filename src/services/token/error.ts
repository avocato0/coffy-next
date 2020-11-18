import type { IError } from 'models'

export default class TokenError extends Error implements IError {
	constructor(message: string) {
		super(message)
		this.name = 'TokenError'
	}
}
