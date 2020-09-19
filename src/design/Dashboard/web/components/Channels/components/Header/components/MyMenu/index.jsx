import React, { Fragment } from 'react'
import { Divider, Drawer, Menu, Select, Switch } from 'antd'
import { useTranslation } from 'react-i18next'

const { Option } = Select

export function MyMenu({
    closable = false,
    visible = false,
    onClose = () => {},
}) {
    const { t } = useTranslation()

    return (
        <Fragment>
            <Drawer
                title={t('src.screens.dashboard.Settings')}
                placement="left"
                closable={closable}
                onClose={onClose}
                visible={visible}
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
                                defaultValue={'en'}
                                style={{
                                    width: 60,
                                    textAlign: 'right',
                                }}
                                bordered={false}
                                showArrow={false}
                                onChange={() => {}}
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
                            checked={false}
                            onClick={() => {}}
                        />
                    </Menu.Item>
                    <Divider />
                    <Menu.Item
                        style={{
                            backgroundColor: 'transparent',
                        }}
                        onClick={() => {}}
                    >
                        {t('src.screens.dashboard.LO')}
                    </Menu.Item>
                </Menu>
            </Drawer>
        </Fragment>
    )
}
