const { useEffect } = require('react')

export function useClickOutSide(ref, onClickOutSide) {
    useEffect(() => {
        function handleClickOutSide(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutSide('You clicked outside of me!')
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutSide)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    }, [ref, onClickOutSide])
}
