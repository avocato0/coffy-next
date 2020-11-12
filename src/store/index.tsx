import { observe, runInAction, set, toJS } from 'mobx'
import {
	enableStaticRendering,
	useLocalObservable,
	observer,
} from 'mobx-react-lite'
import { createContext, FC, useContext, useEffect } from 'react'
import initial from './initial'
import storage from './storage'
import DevTools from 'components/DevTools'

enableStaticRendering(typeof window === 'undefined')

type IStore = ReturnType<typeof initial>

// @ts-ignore
export const StoreContext = createContext<IStore>()

export const InjectStoreContext: FC<{}> = ({ children }) => {
	const store = useLocalObservable<IStore>(initial)

	useEffect(() => {
		runInAction(() => set(store, storage.store || {}))
		DevTools.init(store)
	}, [])

	observe(store, (change) => {
		if (change.type === 'update') {
			storage.update(change.object)
		}
	})

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	)
}

export const useStore = () => useContext(StoreContext)

export { observer, initial }
