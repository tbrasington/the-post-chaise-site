import { FC, useCallback, useEffect, useRef } from "react"
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock"

import { Cross } from "@components/icons"
import FocusTrap from "@lib/focus-trap"

interface ModalProps {
  className?: string
  children?: any
  onClose: () => void
  onEnter?: () => void | null
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (ref.current) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true })
      window.addEventListener("keydown", handleKey)
    }
    return () => {
      if (ref && ref.current) {
        enableBodyScroll(ref.current)
      }
      clearAllBodyScrollLocks()
      window.removeEventListener("keydown", handleKey)
    }
  }, [handleKey])

  return (
    <div>
      <div role="dialog" ref={ref}>
        <button onClick={() => onClose()} aria-label="Close panel">
          <Cross className="h-6 w-6" />
        </button>
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
  )
}

export default Modal
