import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {formatISO9075} from "date-fns";
import { baseUrl } from '../URL';


const Single_Post = () => {
const [postInfo , setPostInfo] = useState(null);
const {id} = useParams();
useEffect(()=>{
  try{

    fetch(`${baseUrl}/api/v1/blogs/get-blog/${id}`)
    .then((response)=>{
      response.json().then(postInfo=>{
        setPostInfo(postInfo?.blog)
      })
    })
  }catch(err){
    console.log(err);
  }
},[])


  if(!postInfo)
  return ''

  return (
    <div className='post-page'>
      <div className='image' >
        <img src={'http://localhost:4000/uploads/'+ postInfo?.image}/>
        {/* <img src={require(`../uploads/${postInfo?.image}`)}/> */}
      </div>
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo?.createdAt))}</time>
        <div className='author'>by {postInfo?.user?.username}</div>
        <div className='text_description ' dangerouslySetInnerHTML={{__html:postInfo?.description}}/>
    </div>
  )
}

export default Single_Post