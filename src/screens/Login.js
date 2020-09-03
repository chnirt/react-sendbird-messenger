import React, { Fragment } from 'react'
import { Row, Col, Form, Input, Button, Checkbox, Typography } from 'antd'

import { ReactComponent as Logo } from '../assets/ic-main-sendbird-logo-white.svg'
import { useAuth } from '../context/authContext'
import { Loading } from '../components'
import { useState } from 'react'

const { Title, Text } = Typography

export function Login() {
	const { login } = useAuth()

	const [loading, setLoading] = useState(false)

	function onFinish(values) {
		// console.log('Success:', values)
		const { emailOrYourPhoneNumber, password } = values

		setLoading(true)
		setTimeout(() => {
			login(emailOrYourPhoneNumber, emailOrYourPhoneNumber + password)
			setLoading(false)
		}, 1000)
	}

	const onFinishFailed = (errorInfo) => {
		// console.log('Failed:', errorInfo)
	}

	return (
		<Fragment>
			<Loading spinning={loading}>
				<Row>
					<Col
						style={{
							height: '100vh',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
						xs={24}
						sm={{ span: 8, offset: 8 }}
						md={{ span: 12, offset: 6 }}
						lg={{ span: 8, offset: 8 }}
						xl={{ span: 6, offset: 9 }}
					>
						<Row
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								height: '10vh',
							}}
						>
							<Logo fill='#762FDD' />
						</Row>
						<Row style={{ justifyContent: 'center' }}>
							<Title level={2}>SendBird Messenger</Title>
						</Row>
						<Row style={{ justifyContent: 'center', height: '5vh' }}>
							<Text>Sign in with SendBird to get started.</Text>
						</Row>
						<Form
							style={{ padding: '0 5vw' }}
							name='normal_login'
							className='login-form'
							initialValues={{
								emailOrYourPhoneNumber: 'chnirt@gmail.com',
								password: '123',
								remember: true,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<Form.Item
								name='emailOrYourPhoneNumber'
								rules={[
									{
										required: true,
										message: 'Please input Email or Your phone number!',
									},
								]}
							>
								<Input placeholder='Email or your phone number' />
							</Form.Item>
							<Form.Item
								name='password'
								rules={[
									{ required: true, message: 'Please input your Password!' },
								]}
							>
								<Input type='password' placeholder='Password' />
							</Form.Item>

							<Form.Item>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Button type='link' htmlType='submit'>
										Continue
									</Button>
								</div>
							</Form.Item>

							<Form.Item name='remember' valuePropName='checked' noStyle>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Checkbox>Keep me signed in</Checkbox>
								</div>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Loading>
		</Fragment>
	)
}
