import { useEffect } from 'react'

export function useGestures(ref) {
    useEffect(() => {
        const element = ref.current

        element.addEventListener('touchstart', handleTouchStart)
        element.addEventListener('touchmove', handleTouchMove)
        element.addEventListener('touchend', handleTouchEnd)
        return () => {
            element.removeEventListener('touchstart', handleTouchStart)
            element.removeEventListener('touchmove', handleTouchMove)
            element.removeEventListener('touchend', handleTouchEnd)
        }
    })

    const handleTouchStart = (event) => {}

    const handleTouchMove = (event) => {}

    const handleTouchEnd = (event) => {}

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    }
}
