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
	Badge,
	Dropdown,
	Menu,
	Skeleton,
	Divider,
	Upload,
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

import { useAuth } from '../context/authContext'
import { Loading } from '../components'

const { Text } = Typography

export function Dashboard() {
	const { logout } = useAuth()

	const [loadingLogOut, setLoadingLogOut] = useState(false)
	const [users, setUsers] = useState([])
	const [loadingListUsers, setLoadingListUsers] = useState(false)
	const [messages, setMessages] = useState([])
	const [loadingListMessages, setLoadingListMessages] = useState(false)
	const messagesEndRef = useRef(null)
	const [fileList, setFileList] = useState([])

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

	// const scrollToBottom = () => {
	// 	messagesEndRef.current &&
	// 		messagesEndRef.current.scrollIntoView({
	// 			behavior: 'smooth',
	// 		})
	// }

	// useEffect(() => {
	// 	if (messages) {
	// 		scrollToBottom()
	// 	}
	// }, [messages])
	useEffect(() => {
		messagesEndRef.current &&
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
	})

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
								<Text>{user.name}</Text>
							</Row>
							<Row>
								<Text type='secondary' ellipsis={true}>
									{user.lastMessage}
								</Text>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col span={6}>
					{moment(user.createdAt).format('HH:mma')}
					<Badge status={user.isOnline ? 'success' : 'error'} />
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
				<Text
					style={{
						color: message.isAuthor ? '#fff' : '#000',
					}}
				>
					{message.content}
				</Text>
			</div>
		)
	}

	return (
		<Fragment>
			<Loading spinning={loadingLogOut}>
				<Row style={{ height: '100vh', border: '1px solid #d9d9d9' }}>
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

						<Row style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
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
							<Col>
								<Avatar
									style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
								>
									U
								</Avatar>
							</Col>
							<Col>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<PhoneOutlined />}
									size='large'
								/>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<VideoCameraOutlined />}
									size='large'
								/>
								<Button
									style={{ border: 0 }}
									type='ghost'
									icon={<InfoCircleOutlined />}
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
									}}
								>
									<Skeleton
										loading={loadingListMessages}
										paragraph={{ rows: 25 }}
									>
										<Divider />
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
									}}
								>
									<Col style={{ padding: 12, width: 'calc(100% - 120px)' }}>
										<Input placeholder='Type a message...' />
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
								}}
								xs={0}
								sm={8}
								md={8}
								lg={8}
								xl={8}
							>
								3 col-order-responsive
							</Col>
						</Row>
					</Col>
				</Row>
			</Loading>
		</Fragment>
	)
}
