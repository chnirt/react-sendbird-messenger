import React, {
    useState,
    useContext,
    createContext,
    useLayoutEffect,
} from 'react'

const DashboardContext = createContext()

export function DashboardProvider({ children }) {
    return (
        <DashboardContext.Provider value={DashboardValue()}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = () => useContext(DashboardContext)

function DashboardValue() {
    const [channelsLoading, setChannelsLoading] = useState(false)
    const [channels, setChannels] = useState([])

    const [channelLoading, setChannelLoading] = useState(false)
    const [channel, setChannel] = useState(null)

    const [typingMembers, setTypingMembers] = useState('Typing...')

    useLayoutEffect(() => {}, [])

    return {
        channelsLoading,
        setChannelsLoading,
        channels,
        setChannels,
        channelLoading,
        setChannelLoading,
        channel,
        setChannel,
        typingMembers,
        setTypingMembers,
    }
}
