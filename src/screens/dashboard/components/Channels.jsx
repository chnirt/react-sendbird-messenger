import React, { Fragment } from 'react'
import { Row, Col, Dropdown, Button } from 'antd'
import { SettingOutlined, FormOutlined } from '@ant-design/icons'

import { MyMenu } from './components/MyMenu'
import { PRIMARY_COLOR, THIRD_COLOR } from '../../../constants'
import { MyAutoComplete, MySkeleton } from '../../../components'

export function ChannelsList({
    handleLogout = () => {},
    handleRefresh = () => {},
    searchRef = null,
    options = [],
    onSelectMyAutoComplete = () => {},
    onSearchMyAutoComplete = () => {},
    loadingChannels = false,
    renderChannelList = () => <div />,
    channels = [],
}) {
    return (
        <Fragment>
            <Row
                style={{
                    height: 60,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${THIRD_COLOR}`,
                    padding: '0 12px',
                }}
            >
                <Col>
                    <Dropdown
                        overlay={() => MyMenu({ logout: handleLogout })}
                        placement="bottomLeft"
                        trigger={['click']}
                    >
                        <Button
                            style={{ border: 0 }}
                            type="ghost"
                            icon={
                                <SettingOutlined
                                    style={{ color: PRIMARY_COLOR }}
                                />
                            }
                            size="large"
                        />
                    </Dropdown>
                </Col>
                <Col>
                    <Button onClick={handleRefresh} type="text">
                        SendBird Messenger
                    </Button>
                </Col>
                <Col>
                    <Button
                        style={{ border: 0 }}
                        type="ghost"
                        icon={<FormOutlined style={{ color: PRIMARY_COLOR }} />}
                        size="large"
                    />
                </Col>
            </Row>
            <Row
                style={{
                    height: 60,
                    borderBottom: `1px solid ${THIRD_COLOR}`,
                    padding: 12,
                }}
            >
                <MyAutoComplete
                    ref={searchRef}
                    style={{ width: '100%' }}
                    options={options}
                    onSelect={onSelectMyAutoComplete}
                    onSearch={onSearchMyAutoComplete}
                />
            </Row>

            <div
                style={{
                    height: 'calc(100vh - 120px',
                    overflowY: 'auto',
                    borderBottom: `1px solid ${THIRD_COLOR}`,
                    paddingBottom: 12,
                }}
            >
                <MySkeleton
                    loading={loadingChannels}
                    rows={13}
                    size="default"
                    avatar
                >
                    {renderChannelList(channels)}
                </MySkeleton>
            </div>
        </Fragment>
    )
}
