import { ITokens, IUserAuth } from './user'

export interface IResponse<T> {
	data: T | null
	error: string | null
	status: number
}

interface IRequest<T> {
	body: T
	accessToken?: ITokens['accessToken']
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

export type IApiAuth = IApi<'/api/auth/signin', IUserAuth, ITokens>
export type IApiUpdateToken = IApi<
	'/api/auth/update',
	ITokens['refreshToken'],
	ITokens
>
