import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import Map from '../Map/Map';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { Meta } = Card;

function MyWritePage() {

    const [Write, setWrite] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {

        if (Object.keys(user).length !== 0) {
            Axios.get('/api/write/getwrites?id=' + user.userData._id)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data)
                        setWrite(response.data.writes)
                    } else {
                        alert('글 목록 가져오기를 실패했습니다.')
                    }
                })
        }

    }, [user]);

    const renderCards = Write.map((write, index) => {
        console.log(Write)
        return <Col lg={6} md={8} xs={24}>
            <div style={{ border: '0.1em solid ', color: 'gray' }}>
                <a href={`/write/${write._id}`}>
                    <Map id={write._id} address={write.address} />
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
            <Title level={2}>My Write!</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default MyWritePage