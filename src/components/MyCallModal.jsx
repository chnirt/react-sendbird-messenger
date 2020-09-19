import React from 'react'
import { Modal } from 'antd'

export function MyCallModal() {
    return (
        <Modal
            visible={true}
            footer={
                [
                    // <Button key="1">1</Button>,
                    // <Button key="2">2</Button>,
                    // <Button key="3" type="primary">
                    //     3
                    // </Button>,
                ]
            }
        >
            <p>Some contents...</p>
        </Modal>
    )
}
