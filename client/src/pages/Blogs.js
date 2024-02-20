import React, { useEffect, useState } from 'react';
import BlogCard from './Card';
import {formatISO9075} from "date-fns"
import { baseUrl } from '../URL';


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBLogs = async ()=>{
    try{const response = await fetch(`${baseUrl}/api/v1/blogs/all-blogs`)
    const data = await response.json();
    if (data?.success) {
      setBlogs(data?.blogs);
    }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllBLogs()
  },[])


  return (
    <div>
      {blogs && blogs.map((blog)=>(
        <BlogCard 
        id={blog._id}
        title={blog?.title}
        image={require(`../uploads/${blog?.image}`)}
        username={blog?.user?.username}
        time={formatISO9075(new Date(blog?.createdAt))}
        />
      ))}
    </div>
  )
}

export default Blogs