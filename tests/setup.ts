import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
	path: path.resolve(process.cwd(), '.env.local'),
})

global.fetch = async (path: RequestInfo, req?: RequestInit | undefined) => {
	const response = {
		body: null,
		json() {
			return Promise.resolve(this.body)
		},
		status: NaN,
	}

	const headers: {
		[key: string]: string
	} = {}
	for (let header in req?.headers) {
		headers[header.toLowerCase()] = (req?.headers as {
			[key: string]: string
		})[header]
	}

	const { default: handler } = require(`../pages${path}`)
	return new Promise((resolve) => {
		handler(
			{
				body: req?.body ? JSON.parse(req.body as string) : {},
				headers: req?.headers,
			},
			{
				status(status: number) {
					response.status = status
				},
				send(data: any) {
					response.body = data
					resolve(response as Response)
				},
			}
		)
	})
}

// @ts-ignore
global.wait = async (timeout = 100) => {
	return new Promise((resolve) => setTimeout(resolve, timeout))
}
