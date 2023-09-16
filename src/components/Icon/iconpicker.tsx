import { useOverlayRef } from "@/hooks/util"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Transition } from "@headlessui/react"
import React, { useState } from 'react'

interface Icon {
	id: string,
	name: string,
	native: string,
	unified: string,
	keywords: string[],
	shortcodes: string,
	emoticons: string[]
}
export default function IconPicker() {
	const { ref, open, toggleOpen } = useOverlayRef()
	const [icon, setIcon] = useState<Icon>()
	return (
		<div>
			<div>
				<button onClick={() => toggleOpen(!open)}>{icon?.native ? icon?.native : '🔖'}</button>
			</div>
			<Transition
				ref={ref}
				as="div"
				show={open}
				className="flex flex-col gap-2 px-8 absolute"
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Picker emojiButtonSize={36} data={data} onEmojiSelect={setIcon} />
			</Transition>
		</div>
	)
}
