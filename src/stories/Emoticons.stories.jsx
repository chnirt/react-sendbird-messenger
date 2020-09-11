import React from 'react'

import { Emoticons } from '../components/Emoticons'

export default {
    title: 'Example/Emoticons',
    component: Emoticons,
}

const Template = (args) => <Emoticons {...args} />

export const Angry = Template.bind({})
Angry.args = {
    handleEmoji: () => {},
}
