import React, { useEffect, useState } from 'react'
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import Map from '../Map/Map';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    const [Write, setWrite] = useState([])

    useEffect(() => {
        Axios.get('/api/write/getwrites')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setWrite(response.data.writes)
                } else {
                    alert('글 목록 가져오기를 실패했습니다.')
                }
            })

    }, [])

    const renderCards = Write.map((write, index) => {

        return <Col lg={6} md={8} xs={24}>
            <div style={{ border: '0.1em solid ', color: 'gray' }}>
                <a href={`/write/${write._id}`}>
                    <div style = {{heigth: 200}}>
                    <Map id={write._id} address={write.address} />
                    </div>
                </a>

                <div style={{ padding: '1rem 0.7rem' }}>
                    <Meta
                        avatar={<Avatar src={write.writer.image} />}
                        title={write.title}
                    />
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <small>{write.address}</small>
                    </div>
                    <span style={{ marginLeft: '3rem', fontSize: '10px' }}>{moment(write.createdAt).format("MMM Do YY")}</span> - <span style={{ fontSize: '10px' }}>{write.writer.name}</span><br />
                </div>
            </div>
        </Col>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Find the people!</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
