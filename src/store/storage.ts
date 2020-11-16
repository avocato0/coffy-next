interface IStore {
	tokens?: {
		accessToken: string
		refreshToken: string
	}
}

class Storage {
	private data: IStore = {}

	update(newValue: object) {
		this.data = {
			...this.data,
			...newValue,
		}
	}

	get store() {
		return this.data
	}

	clear() {
		this.data = {}
	}
}

export default new Storage()
