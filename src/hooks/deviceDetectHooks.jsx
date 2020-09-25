import { useLayoutEffect, useState } from 'react'

export function useDeviceDetect() {
    const [isMobile, setIsMobile] = useState(null)

    useLayoutEffect(() => {
        const userAgent =
            typeof navigator === 'undefined' ? '' : navigator.userAgent
        const mobile = Boolean(
            userAgent.match(
                /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        )
        setIsMobile(mobile)
    }, [])

    return { isMobile }
}
