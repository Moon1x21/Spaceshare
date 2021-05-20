import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideWrite from './SideWrite';
import Map from "../Map/Map";
import CommentWrite from "./CommentPage";

function WriteDetailPage(props) {

    const writeId = props.match.params.writeId
    const variable = { writeId: writeId }

    const [WriteDetail, setWriteDetail] = useState([])
    const [Commentws,setCommnets] = useState([])
    useEffect(() => {
        
        Axios.post('/api/write/getwriteDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setWriteDetail(response.data.writeDetail)
                } else {
                    alert('정보를 가져오기 실패했습니다. ')
                }
            })

        Axios.post('/api/comment/getComments',variable)
        .then(response=> {
            if(response.data.success){
                setCommnets(response.data.commentws)
                console.log(response.data.commentws)
            }else{
                alert('정보를 가져오기 실패했습니다. ')
            }
        })
    }, [])

    const refresh=(newComment) => {
        setCommnets(Commentws.concat(newComment))
    }

    if (WriteDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '4rem 4rem' }}>
                        <List style={{ textAlign: 'center', marginBottom: '1rem',fontSize:'30px' }} > {WriteDetail.title} </List>

                        <Map id={WriteDetail._id} address={WriteDetail.address} style ={{height: 400}}/>

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>{WriteDetail.description}</div>
                        <br />
                        <div >장소: {WriteDetail.address}</div>
                        <List>최대 인원: {WriteDetail.people}명</List>
                        <List>날짜: {WriteDetail.date}</List>
                        <br />

                        <List.Item.Meta
                            avatar={<Avatar src={WriteDetail.writer.image} />}
                            title={WriteDetail.writer.name}
                        />

                        <CommentWrite refresh={refresh} commentLists={Commentws} postId= {writeId}/>

                    </div>
                </Col>

                <Col lg={6} xs={24}>

                    <SideWrite />

                </Col>

            </Row>

        )
    } else {
        return (
            <div style={{ textAlign: 'center', marginTop: '10rem' }}>loading...</div>
        )
    }
}

export default WriteDetailPage