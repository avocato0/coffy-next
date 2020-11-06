import type { IObject } from 'models'

export const copyWithoutProps = <T extends IObject>(
	obj: T,
	...keys: string[]
) => {
	const result: IObject = {}
	for (let key in obj) {
		if (keys.includes(key)) continue
		result[key] = obj[key]
	}

	return result as T
}
