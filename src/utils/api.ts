import { RequestMessage, ResponseMessage } from 'constants/api'
import { ApiError } from 'errors/api'
import { IApiUpdateToken, IFetch, IResponse } from 'models/api'
import { NextApiRequest, NextApiResponse } from 'next'
import httpStatus from 'http-status-codes'
import storage from 'store/storage'

export const fetcher = async <T extends IFetch>(
	path: T['path'],
	body: T['request']['body']
): Promise<T['response']> => {
	try {
		const response = await fetch(path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				accessToken: storage.store?.tokens?.accessToken,
				body,
			}),
		})

		if (response.status === httpStatus.UNAUTHORIZED) {
			const token = storage.store?.tokens?.refreshToken
			if (token) {
				storage.clear()
				const resp = await fetcher<IApiUpdateToken>(
					'/api/auth/update',
					token
				)

				if (resp.data) {
					storage.update({
						tokens: resp.data,
					})

					return fetcher<T>(path, body)
				}
			}
		}

		return response.json()
	} catch (err) {
		console.error(err)
	}

	const error: IResponse<null> = {
		error: RequestMessage.FETCH_ERROR,
		status: httpStatus.BAD_REQUEST,
		data: null,
	}

	return error
}

export const getHandler = <T extends IFetch>(
	callback: (data: {
		data: T['request']
		query: NextApiRequest['query']
	}) => Promise<T['response']['data']>
) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const data = await callback({
				data: req.body,
				query: req.query,
			})

			res.send(
				data
					? {
							data,
							status: httpStatus.OK,
							error: null,
					  }
					: {
							data: null,
							status: httpStatus.BAD_REQUEST,
							error: ResponseMessage.EMPTY_RESPONSE,
					  }
			)
		} catch (err) {
			res.status(httpStatus.BAD_REQUEST)

			if (err instanceof ApiError) {
				res.status(err.status)
			}

			res.send({
				data: null,
				error: err.message,
				status: err.status,
			})
		}
	}
}
