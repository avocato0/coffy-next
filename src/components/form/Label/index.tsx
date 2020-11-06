import React from 'react'
import { Input, IInputProps } from '../Input'
import styles from './Label.module.scss'

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	title: string
	input: IInputProps
}

export const Label: React.FC<ILabelProps> = ({ title, input }) => {
	return (
		<label className={styles.Component}>
			{title}
			<Input {...input} />
		</label>
	)
}
