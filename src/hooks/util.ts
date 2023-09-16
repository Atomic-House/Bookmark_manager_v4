import { useEffect, useRef, useState } from "react";

export function useOverlayRef() {
	const [open, toggleOpen] = useState(false)
	const ref = useRef<HTMLElement | null>(null)

	useEffect(() => {
		function handleOverlayClose(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				toggleOpen(false)
			}
		}
		if (open) {
			document.addEventListener("click", handleOverlayClose)
		}
		else {
			document.removeEventListener("click", handleOverlayClose)
		}
	}, [open])
	return { ref, toggleOpen, open }
}
