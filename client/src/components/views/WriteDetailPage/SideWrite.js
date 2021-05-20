import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function SideWrite() {

    const [sideWrites,setsideWrites]=useState([])
    
    useEffect(()=>{
        Axios.get('/api/write/getwrites')
            .then(response => {
                if(response.data.success){
                    console.log(response.data.writes)
                    setsideWrites(response.data.writes)
                }else{
                    alert('글 목록 가져오기를 실패했습니다.')
            }
        })
    },[])

    const renderSideWrite = sideWrites.map((write,index)=> {
        return <div key={index} style={{display: 'flex', width: '80%', marginTop:'1.5rem', marginLeft: '2.5rem',padding:'1.5rem 1rem',border:'0.1em solid ',color:'gray'}}>     
        <div style={{width:'60%'}}>
            <a href={`/write/${write._id}`} style={{color: 'gray'}}>
                <span style={{fontSize: '1rem', color:'black'}}>Title: {write.title}</span><br />
                <span>Writer: {write.writer.name}</span><br />
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <span>Place: {write.address}</span>
                </div>
                <br />
                <span>Date: {write.date}</span>
            </a>
        </div>
    </div>

    })

    return (

        <React.Fragment>
            {renderSideWrite}
        </React.Fragment>

        
    )

}

export default SideWrite