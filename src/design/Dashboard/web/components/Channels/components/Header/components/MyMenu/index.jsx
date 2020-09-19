import React, { Fragment } from 'react'
import { Divider, Drawer, Menu, Select, Switch } from 'antd'
import { useTranslation } from 'react-i18next'

import { useDark, useI18n } from '@context'

const { Option } = Select

export function MyMenu({
    closable = false,
    visible = false,
    onClose = () => {},
}) {
    const { isDark, toggleDark } = useDark()
    const { language, changeLanguage } = useI18n()
    const { t } = useTranslation()

    function handleLanguageChange(value) {
        changeLanguage(value)
    }

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
                        onClick={() => {}}
                    >
                        {t('src.screens.dashboard.LO')}
                    </Menu.Item>
                </Menu>
            </Drawer>
        </Fragment>
    )
}
