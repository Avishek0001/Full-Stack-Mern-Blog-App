import { Box } from '@mui/material'
import React, { useState } from 'react'
import Editor from './Editor'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBlogs = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFiles] = useState('');


  const data = new FormData();

  async function handleSubmit(e) {
    e.preventDefault()
    data.set('user', id);
    data.set('title', title);
    data.set('description', description);
    data.append('image', file.name)
    data.append('image', file)
    
    const response = await fetch('http://localhost:4000/api/v1/blogs/create-blog', {
      method: 'POST',
      body: data
    })
    if (response.status === 200) {
      toast.success('Blog Created')
      navigate('/my-blogs')
      window.location.reload();
      console.log(await response.json());
    }

  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="create-box"
          style={{

            width: "80%",
            height: "auto",
            border: 3,
            borderRadius: 10,
            padding: 3,
            margin: "auto",
            boxShadow: "10px 10px 20px #ccc",
            display: "flex",
            flexDirection: "column",
            marginTop: "30px"
          }}
        >
          <h1 style={{ "padding": "30px" }}>
            Create A New Post
          </h1>

          <input type="title"
            name='title'
            placeholder={'Title'}
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            required
          />

          <input type="file"
            name='images'
            onChange={ev => setFiles(ev.target.files[0])}
            required
          />
          <Editor value={description}
            onChange={setDescription} />
          <button type='submit' style={{ marginTop: '5px', backgroundColor: "#000" }}>Create post</button>
        </div>
      </form>

    </>
  )
}

export default CreateBlogs