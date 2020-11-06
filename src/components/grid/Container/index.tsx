import React from 'react'
import styles from './Container.module.scss'

export interface IContainerProps {}

export const Container: React.FC<IContainerProps> = ({ children }) => {
	return <div className={styles.Component}>{children}</div>
}
