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

    const [typingMembers, setTypingMembers] = useState('')

    const [messagesLoading, setMessagesLoading] = useState(false)
    const [messages, setMessages] = useState([])

    const [showVideoCall, setShowVideoCall] = useState(false)

    const [prevMessageListQuery, setPrevMessageListQuery] = useState(null)

    const [directCall, setDirectCall] = useState(null)
    const [localConstraints, setLocalConstraints] = useState({
        audio: true,
        video: true,
    })
    const [remoteConstraints, setRemoteConstraints] = useState({
        audio: true,
        video: true,
    })
    const [mediaAccess, setMediaAccess] = useState(null)

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
        messagesLoading,
        setMessagesLoading,
        messages,
        setMessages,
        showVideoCall,
        setShowVideoCall,
        prevMessageListQuery,
        setPrevMessageListQuery,
        directCall,
        setDirectCall,
        localConstraints,
        setLocalConstraints,
        remoteConstraints,
        setRemoteConstraints,
        mediaAccess,
        setMediaAccess,
    }
}
