namespace TokenModel {
	export interface Tokens {
		accessToken: string
		refreshToken: string
	}

	export interface Payload {
		id: string
	}
}

export default TokenModel
