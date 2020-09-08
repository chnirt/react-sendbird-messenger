import React, {
    useContext,
    createContext,
    useRef,
    useLayoutEffect,
} from 'react'
import SendBird from 'sendbird'
import { uuidv4 } from '../utils'

const REACT_APP_SB_APP_ID = '7AE1264D-2D61-4D37-A25C-AEDF55FD631D'

// ChannelHandler.onMessageReceived = function(channel, message) {};
// ChannelHandler.onMessageUpdated = function(channel, message) {};
// ChannelHandler.onMessageDeleted = function(channel, messageId) {};
// ChannelHandler.onMentionReceived = function(channel, message) {};
// ChannelHandler.onChannelChanged = function(channel) {};
// ChannelHandler.onChannelDeleted = function(channelUrl, channelType) {};
// ChannelHandler.onChannelFrozen = function(channel) {};
// ChannelHandler.onChannelUnfrozen = function(channel) {};
// ChannelHandler.onMetaDataCreated = function(channel, metaData) {};
// ChannelHandler.onMetaDataUpdated = function(channel, metaData) {};
// ChannelHandler.onMetaDataDeleted = function(channel, metaDataKeys) {};
// ChannelHandler.onMetaCountersCreated = function(channel, metaCounter) {};
// ChannelHandler.onMetaCountersUpdated = function(channel, metaCounter) {};
// ChannelHandler.onMetaCountersDeleted = function(channel, metaCounterKeys) {};
// ChannelHandler.onChannelHidden = function(groupChannel) {};
// ChannelHandler.onUserReceivedInvitation = function(groupChannel, inviter, invitees) {};
// ChannelHandler.onUserDeclinedInvitation = function(groupChannel, inviter, invitee) {};
// ChannelHandler.onUserJoined = function(groupChannel, user) {};
// ChannelHandler.onUserLeft = function(groupChannel, user) {};
// ChannelHandler.onDeliveryReceiptUpdated = function(groupChannel) {};
// ChannelHandler.onReadReceiptUpdated = function(groupChannel) {};
// ChannelHandler.onTypingStatusUpdated = function(groupChannel) {};
// ChannelHandler.onUserEntered = function(openChannel, user) {};
// ChannelHandler.onUserExited = function(openChannel, user) {};
// ChannelHandler.onUserMuted = function(channel, user) {};
// ChannelHandler.onUserUnmuted = function(channel, user) {};
// ChannelHandler.onUserBanned = function(channel, user) {};
// ChannelHandler.onUserUnbanned = function(channel, user) {};

const SendBirdContext = createContext()

export function SendBirdProvider({ children }) {
    return (
        <SendBirdContext.Provider value={SendBirdValue()}>
            {children}
        </SendBirdContext.Provider>
    )
}

export const useSendBird = () => useContext(SendBirdContext)

function SendBirdValue() {
    const sbRef = useRef(null)
    const channelHandler = useRef(null)
    const userEventHandler = useRef(null)
    const connectionHandler = useRef(null)
    const userId = localStorage.getItem('userId')
    const UNIQUE_HANDLER_ID = uuidv4()

    useLayoutEffect(() => {
        sbRef.current = new SendBird({
            appId: process.env.REACT_APP_SB_APP_ID || REACT_APP_SB_APP_ID,
        })

        if (userId) {
            connect(userId)
        }

        channelHandler.current = new sbRef.current.ChannelHandler()
        userEventHandler.current = new sbRef.current.UserEventHandler()
        connectionHandler.current = new sbRef.current.ConnectionHandler()

        sbRef.current.addChannelHandler(
            UNIQUE_HANDLER_ID,
            channelHandler.current
        )
        sbRef.current.addUserEventHandler(
            UNIQUE_HANDLER_ID,
            userEventHandler.current
        )
        sbRef.current.addConnectionHandler(
            UNIQUE_HANDLER_ID,
            connectionHandler.current
        )

        return () => {
            sbRef.current.removeChannelHandler(UNIQUE_HANDLER_ID)
            sbRef.current.removeUserEventHandler(UNIQUE_HANDLER_ID)
            sbRef.current.removeConnectionHandler(UNIQUE_HANDLER_ID)
        }
    }, [UNIQUE_HANDLER_ID, userId])

    function connect(USER_ID = null) {
        return new Promise((resolve, reject) => {
            sbRef.current.connect(USER_ID, (user, error) => {
                if (error) reject(error)

                // console.log('connect', user)
                resolve(user)
            })
        })
    }

    function disconnect() {
        return new Promise((resolve, reject) => {
            sbRef.current.disconnect(() => {
                // console.log('disconnect')
                // A current user is discconected from Sendbird server.
                resolve(true)
            })
        })
    }

    function onTypingStatusUpdated() {
        return new Promise((resolve, reject) => {
            channelHandler.current.onTypingStatusUpdated = (groupChannel) => {
                resolve({ groupChannel })
            }
        })
    }

    function onDeliveryReceiptUpdated() {
        return new Promise((resolve, reject) => {
            channelHandler.current.onDeliveryReceiptUpdated = (
                groupChannel
            ) => {
                resolve({ groupChannel })
            }
        })
    }

    function onReadReceiptUpdated() {
        return new Promise((resolve, reject) => {
            channelHandler.current.onReadReceiptUpdated = (groupChannel) => {
                resolve({ groupChannel })
            }
        })
    }

    function onMessageReceived() {
        return new Promise((resolve, reject) => {
            channelHandler.current.onMessageReceived = (channel, message) => {
                resolve({ channel, message })
            }
        })
    }

    function onMessageUpdated() {
        return new Promise((resolve, reject) => {
            channelHandler.current.onMessageUpdated = (channel, message) => {
                resolve({ channel, message })
            }
        })
    }

    function onMessageDeleted() {
        return new Promise((resolve, reject) => {
            channelHandler.current.onMessageDeleted = (channel, message) => {
                resolve({ channel, message })
            }
        })
    }

    function onFriendsDiscovered() {
        return new Promise((resolve, reject) => {
            userEventHandler.current.onFriendsDiscovered = (users) => {
                resolve({ users })
            }
        })
    }

    function onTotalUnreadMessageCountUpdated() {
        return new Promise((resolve, reject) => {
            userEventHandler.current.onTotalUnreadMessageCountUpdated = (
                totalCount,
                countByCustomTypes
            ) => {
                resolve({ totalCount, countByCustomTypes })
            }
        })
    }

    function onReconnectStarted() {
        return new Promise((resolve, reject) => {
            connectionHandler.current.onReconnectStarted = () => {
                resolve()
            }
        })
    }

    function onReconnectSucceeded() {
        return new Promise((resolve, reject) => {
            connectionHandler.current.onReconnectSucceeded = () => {
                resolve()
            }
        })
    }

    function onReconnectFailed() {
        return new Promise((resolve, reject) => {
            connectionHandler.current.onReconnectFailed = () => {
                resolve()
            }
        })
    }

    function updateCurrentUserInfo(NICKNAME = null, PROFILE_URL = null) {
        return new Promise((resolve, reject) => {
            sbRef.current.updateCurrentUserInfo(
                NICKNAME,
                PROFILE_URL,
                (response, error) => {
                    if (error) reject(error)

                    // console.log('updateCurrentUserInfo', response)
                    resolve(response)
                }
            )
        })
    }

    function updateCurrentUserInfoWithProfileImage(
        NICKNAME = null,
        PROFILE_FILE = null
    ) {
        return new Promise((resolve, reject) => {
            sbRef.current.updateCurrentUserInfoWithProfileImage(
                NICKNAME,
                PROFILE_FILE,
                (response, error) => {
                    if (error) reject(error)

                    // console.log(
                    //     'updateCurrentUserInfoWithProfileImage',
                    //     response
                    // )
                    resolve(resolve)
                }
            )
        })
    }

    function userListQuery() {
        return new Promise((resolve, reject) => {
            // Retrieving all users
            var applicationUserListQueryByIds = sbRef.current.createApplicationUserListQuery()
            applicationUserListQueryByIds.next((users, error) => {
                if (error) {
                    reject(error)
                }

                resolve(users)
            })
        })
    }

    function blockedUserListQuery() {
        return new Promise((resolve, reject) => {
            // Retrieving all users
            var blockedUserListQuery = sbRef.current.createBlockedUserListQuery()
            blockedUserListQuery.next((users, error) => {
                if (error) {
                    reject(error)
                }

                resolve(users)
            })
        })
    }

    function connectionStatus(userIds) {
        return new Promise((resolve, reject) => {
            var applicationUserListQuery = sbRef.current.createApplicationUserListQuery()
            applicationUserListQuery.userIdsFilter = userIds
            applicationUserListQuery.next((users, error) => {
                if (error) {
                    reject(error)
                }

                if (users[0].connectionStatus === sbRef.current.User.ONLINE) {
                    // User.connectionStatus consists of NON_AVAILABLE, ONLINE, and OFFLINE.
                }
            })
        })
    }

    function inviteWithUserIds(groupChannel = null, userIds = []) {
        return new Promise((resolve, reject) => {
            groupChannel.inviteWithUserIds(userIds, (response, error) => {
                if (error) {
                    reject(error)
                }

                resolve(response)
            })
        })
    }

    function createChannelWithUserIds(
        userIds = [userId],
        NAME = null,
        COVER_IMAGE_OR_URL = null,
        DATA = null
    ) {
        // When 'distinct' is false
        sbRef.current.GroupChannel.createChannelWithUserIds(
            userIds.concat(userId),
            false,
            NAME,
            COVER_IMAGE_OR_URL,
            DATA,
            (groupChannel, error) => {
                if (error) return console.log(error)

                console.log('createChannelWithUserIds', groupChannel)
            }
        )
    }

    function channelListQuery() {
        return new Promise((resolve, reject) => {
            var channelListQuery = sbRef.current.GroupChannel.createMyGroupChannelListQuery()
            channelListQuery.includeEmpty = true
            channelListQuery.order = 'latest_last_message' // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
            channelListQuery.limit = 15 // The value of pagination limit could be set up to 100.

            if (channelListQuery.hasNext) {
                channelListQuery.next((channelList, error) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(channelList)
                })
            }
        })
    }

    function getChannel(CHANNEL_URL = null) {
        return new Promise((resolve, reject) => {
            sbRef.current.GroupChannel.getChannel(
                CHANNEL_URL,
                (groupChannel, error) => {
                    if (error) {
                        reject(error)
                    }

                    resolve(groupChannel)
                    // TODO: Implement what is needed with the contents of the response in the groupChannel parameter.
                }
            )
        })
    }

    function sendUserMessage(
        groupChannel = null,
        TEXT_MESSAGE = null,
        CUSTOM_TYPE = null,
        DATA = null
    ) {
        return new Promise((resolve, reject) => {
            const params = new sbRef.current.UserMessageParams()

            params.message = TEXT_MESSAGE
            // params.customType = CUSTOM_TYPE;
            // params.data = DATA;
            // params.mentionType = "users"; // Either 'users' or 'channel'
            // params.mentionedUserIds = ["Jeff", "Julia"]; // Or mentionedUsers = Array<User>;
            // params.metaArrayKeys = ["linkTo", "itemType"];
            // params.translationTargetLanguages = ["fe", "de"]; // French and German
            // params.pushNotificationDeliveryOption = "default"; // Either 'default' or 'suppress'

            groupChannel.sendUserMessage(params, (message, error) => {
                if (error) {
                    reject(error)
                }

                resolve(message)
            })
        })
    }

    function createPreviousMessageListQuery(
        groupChannel = null,
        LIMIT = 10,
        REVERSE = false
    ) {
        return new Promise((resolve, reject) => {
            var prevMessageListQuery = groupChannel.createPreviousMessageListQuery()
            prevMessageListQuery.limit = LIMIT
            prevMessageListQuery.reverse = REVERSE
            prevMessageListQuery.includeMetaArray = true // Retrieve a list of messages along with their metaarrays.
            prevMessageListQuery.includeReaction = true // Retrieve a list of messages along with their reactions.

            resolve(prevMessageListQuery)

            // Retrieving previous messages.
            // prevMessageListQuery.load(function (messages, error) {
            //   if (error) {
            //     reject(error);
            //   }
            //   resolve(messages);
            // });
        })
    }

    function refresh(groupChannel = null) {
        return new Promise((resolve, reject) => {
            groupChannel.refresh(function (response, error) {
                if (error) {
                    reject(error)
                }
                resolve(response)
            })
        })
    }

    function getPreviousMessagesByTimestamp(
        groupChannel = null,
        TIMESTAMP = null,
        IS_INCLUSIVE = null,
        PREV_RESULT_SIZE = null,
        REVERSE = null,
        MESSAGE_TYPE = null,
        CUSTOM_TYPE = null,
        SENDER_USER_IDS = null,
        INCLUDE_META_ARRAY = null,
        INCLUDE_REACTION = null
    ) {
        return new Promise((resolve, reject) => {
            groupChannel.getPreviousMessagesByTimestamp(
                TIMESTAMP,
                IS_INCLUSIVE,
                PREV_RESULT_SIZE,
                REVERSE,
                MESSAGE_TYPE,
                CUSTOM_TYPE,
                SENDER_USER_IDS,
                INCLUDE_META_ARRAY,
                INCLUDE_REACTION,
                (messages, error) => {
                    if (error) {
                        reject(error)
                    }

                    // A list of messages sent before the specified timestamp is successfully retrieved.
                    resolve(messages)
                }
            )
        })
    }

    function markAsDelivered(CHANNEL_URL = null) {
        sbRef.current.markAsDelivered(CHANNEL_URL)
        sbRef.current.GroupChannel.getChannel(CHANNEL_URL, (channel, err) => {
            channel.markAsDelivered()
        })
    }

    return {
        connect,
        disconnect,
        onTypingStatusUpdated,
        onReadReceiptUpdated,
        onMessageReceived,
        onMessageUpdated,
        onMessageDeleted,
        onDeliveryReceiptUpdated,
        onFriendsDiscovered,
        onTotalUnreadMessageCountUpdated,
        onReconnectStarted,
        onReconnectSucceeded,
        onReconnectFailed,
        updateCurrentUserInfo,
        updateCurrentUserInfoWithProfileImage,
        userListQuery,
        blockedUserListQuery,
        connectionStatus,
        inviteWithUserIds,
        createChannelWithUserIds,
        channelListQuery,
        getChannel,
        sendUserMessage,
        createPreviousMessageListQuery,
        refresh,
        getPreviousMessagesByTimestamp,
        markAsDelivered,
    }
}
