import React, { useState } from 'react'
import { Button, Drawer } from 'antd'

import { ReactComponent as Decline } from '@assets/svg/call/call-decline-white.svg'
import { ReactComponent as Mic } from '@assets/svg/mic/mic-white.svg'
import { ReactComponent as NoMic } from '@assets/svg/mic/mic-no-white.svg'
import { ReactComponent as Video } from '@assets/svg/video/video-white.svg'
import { ReactComponent as NoVideo } from '@assets/svg/video/video-no-white.svg'

import { REJECT, LOCAL_VIDEO, REMOTE_VIDEO, THIRD_COLOR } from '@constants'

export function Calling({ visible = false, onCancel = () => {} }) {
    const [audio, setAudio] = useState(true)
    const [video, setVideo] = useState(true)

    const handleToggleAudio = () => setAudio((prevState) => !prevState)

    const handleToggleVideo = () => setVideo((prevState) => !prevState)

    return (
        <Drawer
            placement="bottom"
            closable={false}
            visible={visible}
            height="100%"
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 0,
            }}
        >
            <video
                style={{
                    width: 720 * 0.2,
                    height: 1280 * 0.2,
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
                    width: '100vw',
                    height: '100vh',
                    background: REMOTE_VIDEO,
                }}
                id="remote_video_element_id"
                autoPlay
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 95,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
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
                        <Decline style={{ position: 'absolute', height: 25 }} />
                    }
                    type="ghost"
                    onClick={onCancel}
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
        </Drawer>
    )
}
