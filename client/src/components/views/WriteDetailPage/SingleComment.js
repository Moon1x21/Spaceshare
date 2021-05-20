import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false)
    
    const [CommentValue, setCommentValue] = useState("")
    
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    const onHandleChange= (event) => {
        setCommentValue(event.currentTarget.CommentValue)
    }

    const onSubmit = (event)=>{
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.commentw._id
        }

        Axios.post('/api/comment/saveComment',variables)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.result)
                setCommentValue("")
                props.refresh(response.data.result)
            }else{
                alert('댓글 저장을 실패했습니다')
            }
        })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"></span>
    ]
    return (
        <div>
            <Comment
                actions={actions}
                author={props.commentw.writer.name}
                avatar={<Avatar src={props.commentw.writer.image} />}
                content={<p> {props.commentw.content} </p>}
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="댓글 달기!"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px', borderRadius: '5px'  }} onClick={onSubmit}>submit</button>
                </form>
            }
        </div>
    );
}

export default SingleComment