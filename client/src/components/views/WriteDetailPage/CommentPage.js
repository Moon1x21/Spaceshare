import React, { useState } from 'react';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
function CommentWrite(props) {

    const writeId = props.postId;
    const user = useSelector(state => state.user);

    const [commentValue,setcommentValue] = useState("")

    const handleClick = (event)=>{
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit= (event)=>{
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: writeId
        }

        Axios.post('/api/comment/saveComment',variables)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.result)
                setcommentValue("")
                props.refresh(response.data.result)
            }else{
                alert('댓글 저장을 실패했습니다')
            }
        })
    }
    
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {props.commentLists && props.commentLists.map((commentw, index)=>(
                (!commentw.responseTo&& 
                <div>
                <SingleComment refresh={props.refresh} commentw={commentw} postId={props.writeId}/>
                            
                </div>

                )
               
            ))}
           
            <form style={{display:'flex'}} onSubmit={onSubmit} >
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="같이 춤연습 할 사람!"
                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>submit</button>
                </form>
        </div>
    )
} 

export default CommentWrite