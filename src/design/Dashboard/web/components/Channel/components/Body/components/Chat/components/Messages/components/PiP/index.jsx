import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { Button } from 'antd'

import { LOCAL_VIDEO, REJECT, REMOTE_VIDEO, THIRD_COLOR } from '@constants'
import { useDashboard } from '@context'
import { ReactComponent as Decline } from '@assets/svg/call/call-decline-white.svg'
import { ReactComponent as Mic } from '@assets/svg/mic/mic-white.svg'
import { ReactComponent as NoMic } from '@assets/svg/mic/mic-no-white.svg'
import { ReactComponent as Video } from '@assets/svg/video/video-white.svg'
import { ReactComponent as NoVideo } from '@assets/svg/video/video-no-white.svg'

export function PiP({ visible = false }) {
    const { setShowVideoCall } = useDashboard()

    const [activeDrags, setActiveDrags] = useState(0)
    const [audio, setAudio] = useState(true)
    const [video, setVideo] = useState(true)

    const onStart = () => {
        setActiveDrags(+activeDrags)
    }

    const onStop = () => {
        setActiveDrags(-activeDrags)
    }

    const dragHandlers = { onStart, onStop }

    const handleEndCall = () => {
        setShowVideoCall(false)
    }

    const handleToggleAudio = () => setAudio((prevState) => !prevState)

    const handleToggleVideo = () => setVideo((prevState) => !prevState)

    return (
        visible && (
            <Draggable bounds="parent" {...dragHandlers}>
                <div
                    style={{
                        borderRadius: 12,
                        width: 720 * 0.3,
                        height: 1280 * 0.3,
                        margin: 10,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <video
                        style={{
                            width: 720 * 0.1,
                            height: 1280 * 0.1,
                            background: LOCAL_VIDEO,
                            borderRadius: 12,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            margin: 12,
                        }}
                        id="local_video_element_id"
                        autoPlay
                    />
                    <video
                        style={{
                            width: 720 * 0.3,
                            height: 1280 * 0.3,
                            background: REMOTE_VIDEO,
                            borderRadius: 12,
                        }}
                        id="remote_video_element_id"
                        autoPlay
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '100%',
                        }}
                    >
                        <Button
                            style={{
                                border: 0,
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: THIRD_COLOR,
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                            }}
                            icon={
                                audio ? (
                                    <Mic
                                        style={{
                                            position: 'absolute',
                                            height: 25,
                                        }}
                                    />
                                ) : (
                                    <NoMic
                                        style={{
                                            position: 'absolute',
                                            height: 25,
                                        }}
                                    />
                                )
                            }
                            type="ghost"
                            size="large"
                            onClick={handleToggleAudio}
                        />
                        <Button
                            style={{
                                border: 0,
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: REJECT,
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                            }}
                            icon={
                                <Decline
                                    style={{
                                        position: 'absolute',
                                        height: 25,
                                    }}
                                />
                            }
                            type="ghost"
                            size="large"
                            onClick={handleEndCall}
                        />
                        <Button
                            style={{
                                border: 0,
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: THIRD_COLOR,
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                            }}
                            icon={
                                video ? (
                                    <Video
                                        style={{
                                            position: 'absolute',
                                            height: 25,
                                        }}
                                    />
                                ) : (
                                    <NoVideo
                                        style={{
                                            position: 'absolute',
                                            height: 25,
                                        }}
                                    />
                                )
                            }
                            type="ghost"
                            size="large"
                            onClick={handleToggleVideo}
                        />
                    </div>
                </div>
            </Draggable>
        )
    )
}
