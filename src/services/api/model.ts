import { IUserAuth } from 'models/user'
import { Model as TokenModel } from 'services/token'

export interface IResponse<T> {
	data: T | null
	error: string | null
	status: number
}

interface IRequest<T> {
	body: T
	accessToken?: TokenModel.ITokens['accessToken']
}

export interface IFetch {
	path: string
	request: IRequest<any>
	response: IResponse<any>
}

export interface IApiHandler {}

export interface IApi<Path extends string, Req, Resp> extends IFetch {
	path: Path
	request: IRequest<Req>
	response: IResponse<Resp>
}

export type IApiAuth = IApi<'/api/auth/signin', IUserAuth, TokenModel.ITokens>
export type IApiUpdateToken = IApi<
	'/api/auth/update',
	TokenModel.ITokens['refreshToken'],
	TokenModel.ITokens
>
