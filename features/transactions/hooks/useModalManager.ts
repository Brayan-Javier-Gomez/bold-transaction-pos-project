import { useEffect } from "react"

export interface UseModalManagerOptions {

  readonly onClose?: () => void

  readonly lockBodyScroll?: boolean

  readonly closeOnEscape?: boolean
}


export function useModalManager(
  isOpen: boolean,
  options: UseModalManagerOptions = {}
) {
  const {
    onClose,
    lockBodyScroll = true,
    closeOnEscape = true
  } = options

  // Manejar tecla Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape || !onClose) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Bloquear scroll del body
  useEffect(() => {
    if (!isOpen || !lockBodyScroll) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, lockBodyScroll])
}
