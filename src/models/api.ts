import { IUserAuth, IUserAuthResponse } from './user'

export interface IResponse<T> {
	data: T | null
	error: string | null
}

export interface IFetch {
	path: string
	request: any
	response: IResponse<any>
}

export interface IApiHandler {}

export interface IApi<Path extends string, Req, Resp> extends IFetch {
	path: Path
	request: Req
	response: IResponse<Resp>
}

export type IApiAuth = IApi<'/api/auth/signin', IUserAuth, IUserAuthResponse>
