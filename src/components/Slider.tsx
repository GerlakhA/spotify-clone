'use client'

import * as RadixSlider from '@radix-ui/react-slider'
import { FC } from 'react'

interface ISlider {
	value?: number
	onChange: (value: number) => void
}

const Slider: FC<ISlider> = ({ value = 1, onChange }) => {
	const handleChange = (newValue: number[]) => {
		onChange?.(newValue[0])
	}

	return (
		<RadixSlider.Root
			className='relative flex items-center select-none touch-none w-full h-10'
			defaultValue={[1]}
			value={[value]}
			onValueChange={handleChange}
			max={1}
			step={0.1}
			aria-label='Volume'
		>
			<RadixSlider.Track className='bg-neutral-600 relative grow rounded-full h-[3px]'>
				<RadixSlider.Range className='absolute rounded-full h-full bg-white' />
			</RadixSlider.Track>
		</RadixSlider.Root>
	)
}

export default Slider
