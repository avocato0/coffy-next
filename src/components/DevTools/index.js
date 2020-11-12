import { observe, set, runInAction, toJS } from 'mobx'

const init = (store) => {
	let devTools
	let unsubscribe
	let silense = false

	const extension = window.__REDUX_DEVTOOLS_EXTENSION__

	if (extension) {
		observe(store, (change) => {
			if (devTools && !silense) {
				devTools.send(
					`${change.type} ${change.name.toUpperCase()}`,
					change.object
				)
			}
		})

		devTools = extension.connect()
		unsubscribe = devTools.subscribe((message) => {
			// console.log('DevTools Message: ', message)

			if (message.type === 'DISPATCH') {
				switch (message.payload.type) {
					case 'JUMP_TO_STATE':
						const state = JSON.parse(message.state)

						runInAction(() => {
							silense = true
							set(store, toJS(state))
							silense = false
						})
				}
			}
		})
		devTools.init(store)
	}

	return () => {
		extension.disconnect()
		unsubscribe()
	}
}

export default {
	init,
}
