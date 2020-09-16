import React, { Fragment, useState } from 'react'
import { Row, Col, Button, Menu, Switch, Drawer, Divider, Select } from 'antd'
import { SettingOutlined, FormOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { PRIMARY_COLOR, THIRD_COLOR } from '@constants'
import { MyAutoComplete, MySkeleton } from '@components'
import { useDark, useI18n } from '@context'

const { Option } = Select

export function Channels({
    handleLogout = () => {},
    handleRefresh = () => {},
    options = [],
    onSelectMyAutoComplete = () => {},
    onSearchMyAutoComplete = () => {},
    loadingChannels = false,
    renderChannelList = () => <div />,
    channels = [],
}) {
    const { isDark, toggleDark } = useDark()
    const { language, changeLanguage } = useI18n()
    const { t } = useTranslation()

    const [showSettingDrawer, setShowSettingDrawer] = useState(false)

    function handleLanguageChange(value) {
        changeLanguage(value)
    }

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
                <Col
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                    span={3}
                >
                    <Button
                        style={{ border: 0 }}
                        type="ghost"
                        icon={
                            <SettingOutlined style={{ color: PRIMARY_COLOR }} />
                        }
                        size="large"
                        onClick={() => setShowSettingDrawer(true)}
                    />
                </Col>
                <Col
                    style={{ display: 'flex', justifyContent: 'center' }}
                    span={18}
                >
                    <Button onClick={handleRefresh} type="link">
                        SendBird Messenger
                    </Button>
                </Col>
                <Col
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    span={3}
                >
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
                    style={{ width: '100%' }}
                    options={options}
                    onSelect={onSelectMyAutoComplete}
                    onSearch={onSearchMyAutoComplete}
                />
            </Row>
            <div
                style={{
                    height: 'calc(100vh - 122px)',
                    overflowY: 'auto',
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

            {/* Menu Drawer */}
            <Drawer
                title={t('src.screens.dashboard.Settings')}
                placement="left"
                closable={false}
                onClose={() => setShowSettingDrawer(false)}
                visible={showSettingDrawer}
            >
                <Menu
                    style={{
                        borderRight: 'none',
                    }}
                >
                    <Menu.Item
                        style={{
                            backgroundColor: 'transparent',
                        }}
                    >
                        {t('src.screens.dashboard.Profile')}
                    </Menu.Item>
                    <Menu.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                    >
                        {t('src.screens.dashboard.Language')}
                        <div id="my-language">
                            <Select
                                defaultValue={language}
                                style={{
                                    width: 60,
                                    textAlign: 'right',
                                }}
                                bordered={false}
                                showArrow={false}
                                onChange={handleLanguageChange}
                            >
                                <Option value="en">EN</Option>
                                <Option value="vi">VI</Option>
                            </Select>
                        </div>
                    </Menu.Item>
                    <Menu.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                    >
                        {t('src.screens.dashboard.DM')}
                        <Switch
                            size="small"
                            checked={isDark}
                            onClick={toggleDark}
                        />
                    </Menu.Item>
                    <Divider />
                    <Menu.Item
                        style={{
                            backgroundColor: 'transparent',
                        }}
                        onClick={() => {
                            setShowSettingDrawer(false)
                            handleLogout()
                        }}
                    >
                        {t('src.screens.dashboard.LO')}
                    </Menu.Item>
                </Menu>
            </Drawer>
        </Fragment>
    )
}
