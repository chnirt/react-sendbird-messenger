import React, {
	useContext,
	createContext,
	useRef,
	useLayoutEffect,
} from 'react'
import SendBird from 'sendbird'
import { nanoid } from 'nanoid'

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
	const UNIQUE_HANDLER_ID = nanoid()

	const sbRef = useRef(null)
	const channelHandler = useRef(null)
	const userEventHandler = useRef(null)
	const connectionHandler = useRef(null)
	const userId = localStorage.getItem('userId')

	useLayoutEffect(() => {
		sbRef.current = new SendBird({
			appId: process.env.REACT_APP_SB_APP_ID,
		})

		if (userId) {
			sbRef.current.connect(userId, function (user, error) {
				if (error) console.log(error)

				// console.log("connect", user);
			})
		}

		channelHandler.current = new sbRef.current.ChannelHandler()
		userEventHandler.current = new sbRef.current.UserEventHandler()
		connectionHandler.current = new sbRef.current.ConnectionHandler()

		sbRef.current.addChannelHandler(UNIQUE_HANDLER_ID, channelHandler.current)
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
	}, [userId, UNIQUE_HANDLER_ID])

	function connect(USER_ID = null) {
		sbRef.current.connect(USER_ID, (user, error) => {
			if (error) return console.log(error)

			console.log('connect', user)
		})
	}

	function disconnect() {
		sbRef.current.disconnect(function () {
			console.log('disconnect')
			// A current user is discconected from Sendbird server.
		})
	}

	function onTypingStatusUpdated() {
		return new Promise((resolve, reject) => {
			channelHandler.current.onTypingStatusUpdated = function (groupChannel) {
				resolve({ groupChannel })
			}
		})
	}

	function onDeliveryReceiptUpdated() {
		return new Promise((resolve, reject) => {
			channelHandler.current.onDeliveryReceiptUpdated = (channel) => {
				console.log('asd', channel)
				resolve({ channel })
			}
		})
	}

	function onReadReceiptUpdated() {
		return new Promise((resolve, reject) => {
			channelHandler.current.onReadReceiptUpdated = function (groupChannel) {
				resolve({ groupChannel })
			}
		})
	}

	function onMessageReceived() {
		return new Promise((resolve, reject) => {
			channelHandler.current.onMessageReceived = function (channel, message) {
				resolve({ channel, message })
			}
		})
	}

	function onMessageUpdated() {
		return new Promise((resolve, reject) => {
			channelHandler.current.onMessageUpdated = function (channel, message) {
				resolve({ channel, message })
			}
		})
	}

	function onMessageDeleted() {
		return new Promise((resolve, reject) => {
			channelHandler.current.onMessageDeleted = function (channel, message) {
				resolve({ channel, message })
			}
		})
	}

	function onFriendsDiscovered() {
		return new Promise((resolve, reject) => {
			userEventHandler.current.onFriendsDiscovered = function (users) {
				resolve({ users })
			}
		})
	}

	function onTotalUnreadMessageCountUpdated() {
		return new Promise((resolve, reject) => {
			userEventHandler.current.onTotalUnreadMessageCountUpdated = function (
				totalCount,
				countByCustomTypes
			) {
				resolve({ totalCount, countByCustomTypes })
			}
		})
	}

	function onReconnectStarted() {
		return new Promise((resolve, reject) => {
			connectionHandler.current.onReconnectStarted = function () {
				resolve()
			}
		})
	}

	function onReconnectSucceeded() {
		return new Promise((resolve, reject) => {
			connectionHandler.current.onReconnectSucceeded = function () {
				resolve()
			}
		})
	}

	function onReconnectFailed() {
		return new Promise((resolve, reject) => {
			connectionHandler.current.onReconnectFailed = function () {
				resolve()
			}
		})
	}

	function updateCurrentUserInfo(NICKNAME = null, PROFILE_URL = null) {
		sbRef.current.updateCurrentUserInfo(NICKNAME, PROFILE_URL, function (
			response,
			error
		) {
			if (error) return console.log(error)

			console.log('updateCurrentUserInfo', response)
		})
	}

	function updateCurrentUserInfoWithProfileImage(
		NICKNAME = null,
		PROFILE_FILE = null
	) {
		sbRef.current.updateCurrentUserInfoWithProfileImage(
			NICKNAME,
			PROFILE_FILE,
			function (response, error) {
				if (error) return console.log(error)

				console.log('updateCurrentUserInfoWithProfileImage', response)
			}
		)
	}

	function inviteWithUserIds(groupChannel = null, userIds = []) {
		return new Promise((resolve, reject) => {
			groupChannel.inviteWithUserIds(userIds, function (response, error) {
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
			function (groupChannel, error) {
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
				channelListQuery.next(async function (channelList, error) {
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
			sbRef.current.GroupChannel.getChannel(CHANNEL_URL, function (
				groupChannel,
				error
			) {
				if (error) {
					reject(error)
				}

				resolve(groupChannel)
				// TODO: Implement what is needed with the contents of the response in the groupChannel parameter.
			})
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

			groupChannel.sendUserMessage(params, function (message, error) {
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
				function (messages, error) {
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
		console.log('delivered', CHANNEL_URL)
		sbRef.current.markAsDelivered(CHANNEL_URL)
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
		inviteWithUserIds,
		createChannelWithUserIds,
		channelListQuery,
		getChannel,
		sendUserMessage,
		createPreviousMessageListQuery,
		getPreviousMessagesByTimestamp,
		markAsDelivered,
	}
}
