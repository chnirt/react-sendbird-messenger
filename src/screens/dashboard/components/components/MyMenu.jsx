import React from 'react'
import { Menu, Button } from 'antd'

export function MyMenu({ setting = () => {}, logout = () => {} }) {
    return (
        <Menu>
            <Menu.Item>
                <Button onClick={setting} type="text">
                    Settings
                </Button>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <Button onClick={logout} type="text">
                    Log out
                </Button>
            </Menu.Item>
        </Menu>
    )
}
