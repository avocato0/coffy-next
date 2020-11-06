import {
	enableStaticRendering,
	useLocalObservable,
	Observer,
} from 'mobx-react-lite'
import { IUserDB } from 'models/user'
import { createContext, FC, ReactElement, useContext } from 'react'
import initial from './initial'

enableStaticRendering(typeof window === 'undefined')

type IStore = ReturnType<typeof initial>

// @ts-ignore
export const StoreContext = createContext<IStore>()

export const InjectStoreContext: FC<{}> = ({ children }) => {
	const store = useLocalObservable<IStore>(initial)

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	)
}

export const useStore = (component: ReactElement) => {
	const store = useContext(StoreContext)
	return <Observer>{component}</Observer>
}
