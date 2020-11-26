import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserModel } from 'services/user/model'
import type { TokenModel } from 'services/token/model'

export namespace APIModel {
	export interface Response<T> {
		data: T | null
		error: Error | null
	}

	export interface Fetch {
		path: string
		request: any
		response: Response<any>
	}

	export interface Route<Path extends string, Req, Resp> extends Fetch {
		path: Path
		request: Req
		response: Response<Resp>
	}

	type HandlerCallback<F extends APIModel.Fetch> = (
		data: F['request'],
		query: NextApiRequest['query'],
		userId: string
	) => Promise<F['response']['data']>

	export type Hanlder = <R extends APIModel.Fetch>(
		callback: HandlerCallback<R>
	) => (
		req: Omit<NextApiRequest, 'body'> & {
			body: R['request']
			userId: string
		},
		res: NextApiResponse<R['response']>
	) => Promise<void>
}

export namespace RouteModel {
	export type Auth = APIModel.Route<
		'/api/auth/signin',
		UserModel.Auth,
		TokenModel.Tokens
	>

	export type UpdateToken = APIModel.Route<
		'/api/auth/update',
		TokenModel.Tokens['refreshToken'],
		TokenModel.Tokens
	>
}

export namespace PrivateRouteModel {
	export type Me = APIModel.Route<'/api/me', undefined, UserModel.DB>
}
