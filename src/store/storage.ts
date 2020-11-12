class Storage {
	private STORAGE_KEY = '__STATE__'

	update(newValue: object) {
		localStorage.setItem(
			this.STORAGE_KEY,
			JSON.stringify(Object.assign({}, this.store, newValue))
		)
	}

	get store() {
		try {
			let store = localStorage.getItem(this.STORAGE_KEY)
			if (store) return JSON.parse(store)
		} catch (err) {
			console.error(err.message)
		}

		return null
	}
}

export default new Storage()
