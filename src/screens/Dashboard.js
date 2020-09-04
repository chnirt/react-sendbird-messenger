import React, {
	useLayoutEffect,
	useState,
	Fragment,
	useRef,
	useEffect,
} from 'react'
import {
	Row,
	Col,
	Input,
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
	SearchOutlined,
} from '@ant-design/icons'
import moment from 'moment'

import { useAuth, useFirebase } from '../context'
import { Loading, Emoji } from '../components'

const { Title, Text } = Typography
const { Option } = Mentions

export function Dashboard() {
	const { logout } = useAuth()
	const { logoutFB } = useFirebase()

	const [loadingLogOut, setLoadingLogOut] = useState(false)
	const [users, setUsers] = useState([])
	const [loadingListUsers, setLoadingListUsers] = useState(false)
	const [messages, setMessages] = useState([])
	const [loadingListMessages, setLoadingListMessages] = useState(false)
	const messagesEndRef = useRef(null)
	const [fileList] = useState([])

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

	useEffect(() => {
		if (messages) {
			messagesEndRef.current &&
				messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

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
					marginBottom: 15,
				}}
				key={message.id}
			>
				<Row
					style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
				>
					{moment(message.createdAt).format('HH:mm, DD MMM, YYYY')}
				</Row>
				<Row
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: isAuthor ? 'flex-end' : 'flex-start',
					}}
				>
					<RenderMessageBubble message={message} />
				</Row>
			</Row>
		)
	}

	const RenderMessageBubble = ({ message }) => {
		return (
			<div
				style={{
					backgroundColor: message.isAuthor ? '#762FDD' : '#d9d9d9',
					borderRadius: 18,
					padding: '6px 12px 6px',
					width: 200,
				}}
			>
				<Tooltip
					placement='topLeft'
					title={renderTitle(message.id)}
					color='#fff'
					trigger='click'
				>
					<Text
						style={{
							color: message.isAuthor ? '#fff' : '#000',
						}}
					>
						{message.content}
					</Text>
				</Tooltip>
			</div>
		)
	}

	function handleEmoji(id, emoji) {
		console.log(id, emoji)
	}

	const renderTitle = (id) => {
		return (
			<Fragment>
				<Button
					onClick={() => handleEmoji(id, 'love')}
					type='text'
					size='small'
				>
					<Emoji label='love' symbol='❤️' />
				</Button>
				<Button
					onClick={() => handleEmoji(id, 'smile')}
					type='text'
					size='small'
				>
					<Emoji label='smile' symbol='😆' />
				</Button>
				<Button
					onClick={() => handleEmoji(id, 'subscribe')}
					type='text'
					size='small'
				>
					<Emoji label='subscribe' symbol='😮' />
				</Button>
				<Button onClick={() => handleEmoji(id, 'cry')} type='text' size='small'>
					<Emoji label='cry' symbol='😢' />
				</Button>
				<Button
					onClick={() => handleEmoji(id, 'angry')}
					type='text'
					size='small'
				>
					<Emoji label='angry' symbol='😠' />
				</Button>
				<Button
					onClick={() => handleEmoji(id, 'like')}
					type='text'
					size='small'
				>
					<Emoji label='like' symbol='👍' />
				</Button>
				<Button
					onClick={() => handleEmoji(id, 'dislike')}
					type='text'
					size='small'
				>
					<Emoji label='dislike' symbol='👎' />
				</Button>
			</Fragment>
		)
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
										icon={<SettingOutlined style={{ color: '#762FDD' }} />}
										size='large'
									/>
								</Dropdown>
							</Col>
							<Col>SendBird Messenger</Col>
							<Col>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<FormOutlined style={{ color: '#762FDD' }} />}
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
							<div style={{ width: '100%' }}>
								<Input
									placeholder='Search for people'
									prefix={
										<SearchOutlined
											style={{
												fontSize: 16,
												color: '#d9d9d9',
											}}
										/>
									}
								/>
							</div>
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
									icon={<PhoneOutlined style={{ color: '#762FDD' }} />}
									size='large'
								/>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<VideoCameraOutlined style={{ color: '#762FDD' }} />}
									size='large'
								/>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<InfoCircleOutlined style={{ color: '#762FDD' }} />}
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
										<div ref={messagesEndRef} />
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
										{/* <Input placeholder='Type a message...'></Input> */}
										<Mentions
											// rows='3'
											placeholder='Type a message...'
											placement='top'
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

										<Button
											style={{ border: 0 }}
											type='ghost'
											icon={<SmileOutlined />}
											size='large'
										/>
										<Button
											style={{ border: 0 }}
											type='ghost'
											icon={<LikeOutlined style={{ color: '#762FDD' }} />}
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
									<Title style={{ margin: 0 }} level={4}>
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
