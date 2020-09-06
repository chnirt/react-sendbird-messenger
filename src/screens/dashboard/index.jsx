import React, { useLayoutEffect, useState, Fragment } from 'react'
import {
	Row,
	Col,
	Button,
	Avatar,
	Typography,
	Dropdown,
	Menu,
	Skeleton,
	Upload,
	Divider,
	Tooltip,
	Mentions,
} from 'antd'
import {
	SettingOutlined,
	FormOutlined,
	PhoneOutlined,
	VideoCameraOutlined,
	InfoCircleOutlined,
	PictureOutlined,
	SmileOutlined,
	LikeOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import { Picker } from 'emoji-mart'

import {
	Loading,
	MyAutoComplete,
	Emoticons,
	MessageBubble,
} from '../../components'
import { PRIMARY_COLOR } from '../../constants'
import { useAuth, useFirebase } from '../../context'

const { Title, Text } = Typography
const { Option } = Mentions

export default function Dashboard() {
	// console.log(process.env)
	const { logout } = useAuth()
	const { logoutFB, authRef, getUsers } = useFirebase()

	const [loadingLogOut, setLoadingLogOut] = useState(false)
	const [users, setUsers] = useState([])
	const [loadingListUsers, setLoadingListUsers] = useState(false)
	const [messages, setMessages] = useState([])
	const [loadingListMessages, setLoadingListMessages] = useState(false)
	const [fileList] = useState([])

	/**
	 * MyAutoComplete - State
	 */
	const [options, setOptions] = useState([])

	/**
	 * Firebase - Effect
	 */
	useLayoutEffect(() => {
		authRef.current.onAuthStateChanged(async (user) => {
			if (user !== null) {
				// User is signed in.
				user.providerData.forEach((profile) => {
					// console.log('Sign-in provider: ' + profile.providerId)
					// console.log('  Provider-specific UID: ' + profile.uid)
					// console.log('  Name: ' + profile.displayName)
					// console.log('  Email: ' + profile.email)
					// console.log('  Photo URL: ' + profile.photoURL)
				})
				// const snapshot = await getUsers({ email: value })
				// console.log(snapshot.docs)
				// setOptions(snapshot.docs.map((doc) => ({ ...doc, value: doc.id })))
			} else {
				// No user is signed in.
				logout()
			}
		})
	}, [authRef, logout])

	useLayoutEffect(() => {
		fetchUsers()
		fetchMessages()

		async function fetchUsers() {
			setLoadingListUsers(true)
			const response = await fetch(
				'https://5f0ea5f8faef3500160b8663.mockapi.io/users'
			)
			const data = await response.json()
			setUsers(data)
			setLoadingListUsers(false)
		}

		async function fetchMessages() {
			setLoadingListMessages(true)
			const response = await fetch(
				'https://5f0ea5f8faef3500160b8663.mockapi.io/messages'
			)
			const data = await response.json()
			setMessages(data)
			setLoadingListMessages(false)
		}
	}, [])

	/**
	 * NOTE: MyAutoComplete - Function
	 */

	const onSearchMyAutoComplete = async (searchText) => {
		if (!!searchText) {
			const snapshot = await getUsers({ email: searchText })
			if (snapshot.empty) {
				console.log('No matching documents.')
				return
			}

			snapshot.forEach((doc) => {
				console.log(doc.id, '=>', doc.data())
			})
			setOptions(snapshot.docs.map((doc) => ({ ...doc, value: doc.id })))
		} else {
			setOptions([])
		}
	}
	const onSelectMyAutoComplete = (data) => {
		console.log('onSelect', data)
	}

	/**
	 * NOTE: Mentions = Function
	 */

	function onChangeMentions(value) {
		console.log('Change:', value)
	}

	function onSelectMentions(option) {
		console.log('select', option)
	}

	const props = {
		onRemove: (file) => {
			// this.setState((state) => {
			// 	const index = state.fileList.indexOf(file)
			// 	const newFileList = state.fileList.slice()
			// 	newFileList.splice(index, 1)
			// 	return {
			// 		fileList: newFileList,
			// 	}
			// })
		},
		beforeUpload: (file) => {
			// this.setState((state) => ({
			// 	fileList: [...state.fileList, file],
			// }))
			return false
		},
		fileList,
	}

	function onLogout() {
		setLoadingLogOut(true)
		setTimeout(() => {
			logoutFB()
			logout()

			setLoadingLogOut(false)
		}, 1000)
	}

	const menu = (
		<Menu>
			<Menu.Item>
				<Button onClick={() => {}} type='text'>
					Settings
				</Button>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item>
				<Button onClick={onLogout} type='text'>
					Log out
				</Button>
			</Menu.Item>
		</Menu>
	)

	const renderListUsers = (users) => {
		return users.map((user) => renderUser(user))
	}

	const renderUser = (user) => {
		return (
			<Row
				style={{
					height: 60,
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottom: '1px solid #d9d9d9',
					padding: '0 12px',
				}}
				key={user.id}
			>
				<Col span={18}>
					<Row>
						<Col span={4}>
							<Avatar src={user.avatar} size='large'>
								{user.name}
							</Avatar>
						</Col>
						<Col span={18}>
							<Row>
								<Title style={{ margin: 0 }} level={5}>
									{user.name}
								</Title>
							</Row>
							<Row>
								<Text type='secondary' ellipsis={true}>
									{user.lastMessage}
								</Text>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={6}>
					{moment(user.createdAt).format('HH:mma')}
				</Col>
			</Row>
		)
	}

	const renderListMessages = (messages) => {
		return messages.map((message) => renderMessage(message))
	}

	const renderMessage = (message) => {
		const { isAuthor } = message

		return (
			<Row
				style={{
					padding: '0 12px',
					display: 'flex',
					width: '100%',
					// margin: '15px 0',
				}}
				key={message.id}
			>
				<Row
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Divider plain>
						{moment(message.createdAt).format('HH:mm, DD MMM, YYYY')}
					</Divider>
				</Row>
				<Row
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: isAuthor ? 'flex-end' : 'flex-start',
					}}
				>
					{renderMessageBubble(message)}
				</Row>
			</Row>
		)
	}

	const renderMessageBubble = (message) => {
		return (
			<Tooltip
				placement='topLeft'
				title={
					<Emoticons handleEmoji={(value) => handleEmoji(message.id, value)} />
				}
				color='#fff'
				trigger='click'
			>
				<div>
					<MessageBubble
						w={300}
						// h={200}
						backgroundColor={message.isAuthor ? PRIMARY_COLOR : '#d9d9d9'}
						color={message.isAuthor ? '#fff' : '#000'}
						content={message.content}
					/>
				</div>
			</Tooltip>
		)
	}

	function handleEmoji(id, emoji) {
		console.log('handleEmoji --> id:', id, ', emoji:', emoji)
	}

	return (
		<Fragment>
			<Loading spinning={loadingLogOut}>
				<Row
					style={{
						height: '100vh',
						borderTop: '1px solid #d9d9d9',
						borderLeft: '1px solid #d9d9d9',
						borderRight: '1px solid #d9d9d9',
					}}
				>
					<Col
						style={{ borderRight: '1px solid #d9d9d9' }}
						xs={24}
						sm={6}
						md={6}
						lg={6}
						xl={6}
					>
						<Row
							style={{
								height: 60,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderBottom: '1px solid #d9d9d9',
								padding: '0 12px',
							}}
						>
							<Col>
								<Dropdown
									overlay={menu}
									placement='bottomLeft'
									trigger={['click']}
								>
									<Button
										style={{ border: 0 }}
										type='ghost'
										icon={<SettingOutlined style={{ color: PRIMARY_COLOR }} />}
										size='large'
									/>
								</Dropdown>
							</Col>
							<Col>SendBird Messenger</Col>
							<Col>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<FormOutlined style={{ color: PRIMARY_COLOR }} />}
									size='large'
								/>
							</Col>
						</Row>
						<Row
							style={{
								height: 60,
								borderBottom: '1px solid #d9d9d9',
								padding: 12,
							}}
						>
							<MyAutoComplete
								style={{ width: '100%' }}
								options={options}
								onSelect={onSelectMyAutoComplete}
								onSearch={onSearchMyAutoComplete}
							/>
						</Row>

						<Row
							style={{
								height: 'calc(100vh - 120px)',
								overflowY: 'auto',
								borderBottom: '1px solid #d9d9d9',
								paddingBottom: 12,
							}}
						>
							<Skeleton loading={loadingListUsers} paragraph={{ rows: 25 }}>
								{renderListUsers(users)}
							</Skeleton>
						</Row>
					</Col>
					<Col xs={0} sm={18} md={18} lg={18} xl={18}>
						<Row
							style={{
								height: 60,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '0 12px',
								borderBottom: '1px solid #d9d9d9',
							}}
						>
							<Col style={{ display: 'flex', alignItems: 'center' }}>
								<Avatar
									style={{
										color: '#f56a00',
										backgroundColor: '#fde3cf',
										marginRight: 12,
									}}
								>
									chnirt
								</Avatar>
								<Title style={{ margin: 0 }} level={4}>
									chnirt
								</Title>
							</Col>
							<Col>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<PhoneOutlined style={{ color: PRIMARY_COLOR }} />}
									size='large'
								/>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={
										<VideoCameraOutlined style={{ color: PRIMARY_COLOR }} />
									}
									size='large'
								/>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<InfoCircleOutlined style={{ color: PRIMARY_COLOR }} />}
									size='large'
								/>
							</Col>
						</Row>

						<Row>
							<Col
								style={{ height: 'calc(100vh - 60px)' }}
								xs={0}
								sm={16}
								md={16}
								lg={16}
								xl={16}
							>
								<Row
									style={{
										height: 'calc(100vh - 120px)',
										borderBottom: '1px solid #d9d9d9',
										overflowY: 'auto',
										paddingTop: 12,
									}}
								>
									<Skeleton
										loading={loadingListMessages}
										paragraph={{ rows: 25 }}
									>
										{renderListMessages(messages)}
									</Skeleton>
								</Row>
								<Row
									style={{
										height: 60,
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										borderBottom: '1px solid #d9d9d9',
									}}
								>
									<Col style={{ padding: 12, width: 'calc(100% - 120px)' }}>
										<Mentions
											// rows='3'
											placeholder='Type a message...'
											placement='top'
											onChange={onChangeMentions}
											onSelect={onSelectMentions}
										>
											<Option value='afc163'>afc163</Option>
											<Option value='zombieJ'>zombieJ</Option>
											<Option value='yesmeck'>yesmeck</Option>
										</Mentions>
									</Col>
									<Col
										style={{
											float: 'right',
											display: 'flex',
										}}
									>
										<Upload {...props}>
											<Button
												style={{
													border: 0,
													display: 'inline-block',
													cursor: 'pointer',
												}}
												type='ghost'
												icon={<PictureOutlined />}
												size='large'
											/>
										</Upload>

										<Tooltip
											id='emoji-mart'
											placement='topRight'
											title={
												<Picker
													title='Pick your emoji…'
													emoji='point_up'
													size={20}
													emojiSize={20}
													color={PRIMARY_COLOR}
													showPreview={false}
													showSkinTones={false}
												/>
											}
											color='transparent'
											overlayStyle={{ boxShadow: '0 0 black', color: 'blue' }}
											style={{ color: 'blue' }}
											trigger='click'
										>
											<Button
												style={{ border: 0 }}
												type='ghost'
												icon={<SmileOutlined />}
												size='large'
											/>
										</Tooltip>
										<Button
											style={{ border: 0 }}
											type='ghost'
											icon={<LikeOutlined style={{ color: PRIMARY_COLOR }} />}
											size='large'
										/>
									</Col>
								</Row>
							</Col>
							<Col
								style={{
									height: 'calc(100vh - 60px)',
									borderLeft: '1px solid #d9d9d9',
									borderBottom: '1px solid #d9d9d9',
								}}
								xs={0}
								sm={8}
								md={8}
								lg={8}
								xl={8}
							>
								<Row
									style={{
										height: 100,
										padding: '0 12px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Avatar
										style={{
											color: '#f56a00',
											backgroundColor: '#fde3cf',
											marginRight: 12,
										}}
										size={64}
									>
										chnirt
									</Avatar>
								</Row>
								<Row
									style={{
										height: 20,
										padding: '0 12px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Title style={{ margin: 0 }} level={3}>
										chnirt
									</Title>
								</Row>
								<Divider />
								<Row
									style={{
										height: 20,
										padding: '0 12px',
									}}
								>
									<Col>
										<Title level={5}>Facebook Profile</Title>
										<Button style={{ padding: 0 }} type='link'>
											m.me/xxxxxxxx
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Loading>
		</Fragment>
	)
}
