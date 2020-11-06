import React from 'react'
import styles from './Input.module.scss'

export interface IInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onInput?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<IInputProps> = ({
	type = 'text',
	value = '',
	...args
}) => {
	return (
		<input
			className={styles.Component}
			type={type}
			defaultValue={value}
			{...args}
		/>
	)
}
