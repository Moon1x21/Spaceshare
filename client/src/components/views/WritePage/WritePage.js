import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon, Descriptions } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import DaumPostcode from 'react-daum-postcode';
import Map from "../Map/Map";

const { TextArea } = Input;
const { Title } = Typography;

const SelectPeople = [
    { value: 0, label: "" },
    { value: 1, label: "1명" },
    { value: 2, label: "2명" },
    { value: 3, label: "3명" },
    { value: 4, label: "4명" },
    { value: 5, label: "5명" },
    { value: 6, label: "6명" },
    { value: 7, label: "7명" },
    { value: 8, label: "8명" },
    { value: 9, label: "9명" },
    { value: 10, label: "10명" }
]

function WritePage(props) {
    const [show,setShow] = useState(false)
    const user = useSelector(state => state.user);
    const [MTitle, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [people, setPeople] = useState("")
    const [address, setAddress] = useState("")
    const [date,setDate] = useState("")

    const onTitleChange = (e) => {
        setTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onSumit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: MTitle,
            description: Description,
            address,
            people: people,
            date: date,
        }
        Axios.post('/api/write/uploadwrite', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('성공적으로 업로드를 했습니다.')
                    setTimeout(() => {
                        props.history.push('/')
                    }, 2000)

                } else {
                    alert('업로드에 실패했습니다')
                }
            })
    }

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        console.log(fullAddress);
        
        setAddress(fullAddress);
        setShow(false);
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload</Title>
            </div>

            <Form onSubmit={onSumit}>

                <label>제목</label>
                <Input
                    onChange={onTitleChange}
                    value={MTitle}
                    required
                />
                <br />
                <br />

                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                    required
                />

                <br />
                <br />
                <Input
                    value={address}
                    placeholder="연습실을 입력하시오"
                    readOnly
                />

                <Button  onClick={e=>setShow(true)} >검색하기</Button>
                {show && <div><DaumPostcode 
                    onComplete={handleComplete}
                /></div>}
                

                <br />
                <br />

                {address!=="" && 
                <Map address={address}/>}

                <br />
                <br />
                <label>최대인원수  </label>
                <select onChange={(e) => setPeople(e.currentTarget.value)}>
                    {SelectPeople.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />

                <input type="date" onChange={(e)=>{setDate(e.target.value)}}/>

                <br />
                <br />

                <Button type="primary" size="large" onClick={onSumit}>
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default WritePage