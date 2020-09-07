import React from 'react'

import { Emoji } from '../components/Emoji'

export default {
    title: 'Example/Emoji',
    component: Emoji,
    parameters: {
        docs: {
            description: {
                component: 'Wapper Emoji',
            },
        },
    },
}

const Template = (args) => <Emoji {...args} />

export const Angry = Template.bind({})
Angry.args = {
    label: 'Angry',
    symbol: '🤬',
}
