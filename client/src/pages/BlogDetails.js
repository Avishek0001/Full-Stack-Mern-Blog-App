import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Editor from './Editor'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import toast from 'react-hot-toast'
import { baseUrl } from '../URL';

const BlogDetails = () => {

    // const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate()
    const [blog, setBlog] = useState({})
    const [inputs, setInputs] = useState({});
    const id = useParams().id
    const getBlogDetails= async ()=>{
        try{
            const response = await fetch(`${baseUrl}/api/v1/blogs/get-blog/${id}`)
            if (response.ok) {
                const data = await response.json();
                if (data?.success) {
                  setBlog(data?.blog);  
                  setInputs({
                    title: data?.blog.title, 
                  });  
                setDescription(data?.blog.description)  
                }
              } else {
                console.log(response.statusText);  
              }  
        }catch(err){  
            console.log(err);
        }    
        
    }
        useEffect(()=>{
            getBlogDetails()
        },[id]);    
        

        const handleChange = (e) => {
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }));
        };


 async function handleSubmit(e) {
     e.preventDefault()   
    const response = await fetch(`${baseUrl}/api/v1/blogs/update-blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: inputs.title,
        description: description,
    
        user: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',

    })
    if(response.status === 200){
      toast.success('Blog Updated')
      const data = await response.json();
      navigate('/my-blogs')
      return data;
  
    }

  }
 



  return (
    <div>
      <form onSubmit={handleSubmit}>
    <Box
      width={"70%"}
      height={"auto"}
      border={3}
      borderRadius={10}
      padding={3}
      margin="auto"
      boxShadow={"10px 10px 20px #ccc"}
      display="flex"
      flexDirection={"column"}
      marginTop="30px"
    >
      <h1 style={{ "padding": "30px" }}>
        Edit Post
      </h1>

      <input type="title"
        name='title'
        placeholder={'Title'}
        value={inputs.title}
        onChange={handleChange}
      required
      />

      
      <Editor  value={description}
        onChange={setDescription} />
      <button type='submit' style={{ marginTop: '5px' }}>Edit post</button>
    </Box>
  </form>
  </div>
  )
}

export default BlogDetails