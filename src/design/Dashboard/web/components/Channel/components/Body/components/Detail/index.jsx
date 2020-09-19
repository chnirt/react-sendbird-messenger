import React, { Fragment } from 'react'
import { Avatar, Button, Col, Collapse, Divider, Row, Typography } from 'antd'

import { PRIMARY_COLOR, SECONDARY_COLOR, THIRD_COLOR } from '@constants'

const { Title } = Typography
const { Panel } = Collapse

export function Detail() {
    const nickname = 'Chnirt'
    return (
        <Fragment>
            <Col
                style={{
                    height: 'calc(100vh - 62px)',
                    borderLeft: `1px solid ${THIRD_COLOR}`,
                }}
                xs={0}
                sm={8}
                md={8}
                lg={8}
                xl={8}
            >
                <Row
                    style={{
                        height: 100,
                        padding: '0 12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        style={{
                            color: PRIMARY_COLOR,
                            backgroundColor: SECONDARY_COLOR,
                            marginRight: 12,
                        }}
                        size={64}
                        src={
                            // channel?.members.filter(
                            //     (member) =>
                            //         member.userId !==
                            //         localStorage.getItem('userId')
                            // )[0].profileUrl
                            nickname
                        }
                    >
                        {/* {capitalizeFirstLetter(
                            firstCharacterOfEachString(
                                channel?.members.filter(
                                    (member) =>
                                        member.userId !==
                                        localStorage.getItem('userId')
                                )[0].nickname
                            )
                        )} */}
                        {nickname}
                    </Avatar>
                </Row>
                <Row
                    style={{
                        height: 20,
                        padding: '0 12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Title style={{ margin: 0 }} level={3}>
                        {/* {
                            channel?.members.filter(
                                (member) =>
                                    member.userId !==
                                    localStorage.getItem('userId')
                            )[0].nickname
                        } */}
                        {nickname}
                    </Title>
                </Row>
                <Divider />
                <Collapse
                    defaultActiveKey={['0']}
                    //   onChange={callback}
                    //   expandIconPosition={expandIconPosition}
                    ghost
                    expandIconPosition="right"
                >
                    <Panel
                        header="Members"
                        key={0}
                        // showArrow={false}
                    >
                        {/* {renderMembers(channel?.members)} */}
                    </Panel>
                </Collapse>
                <Divider />
                <Row>
                    <Button onClick={() => {}} danger type="link">
                        Leave Room
                    </Button>
                </Row>
            </Col>
        </Fragment>
    )
}
