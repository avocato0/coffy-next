import React from 'react'
import styles from './Form.module.scss'

export interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<IFormProps> = ({ children }) => {
	return <form className={styles.Component}>{children}</form>
}
