import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay?: number): T => {
	const [deboucedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay || 500)

		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])

	return deboucedValue
}
