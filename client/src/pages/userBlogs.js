import React, { useEffect, useState } from 'react'
import BlogCard from "./Card"
import { baseUrl } from '../URL'

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId')
      const response = await fetch(`${baseUrl}/api/v1/blogs/user-blog/${id}`, {
        method: "GET",
      })
      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          setBlogs(data?.userBlog.blogs)
          // console.log(data?.userBlog.blogs);               
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserBlogs()
  }, [])


  return (
    <div>
      {blogs && blogs.length > 0 ? (blogs.map((blog) => (
       
        <BlogCard
          id={blog._id}
          userId={true}
          title={blog.title}
          description={blog.description}
          image={require(`../uploads/${blog?.image}`)}
          username={blog.user.username}
          time={blog.createdAt}
        />))) : (
        <h1>You Haven't Created any blog</h1>
      )
      }
    </div>
  )
}

export default UserBlogs