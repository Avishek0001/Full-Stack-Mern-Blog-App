import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate } from 'react-router-dom';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import toast from 'react-hot-toast';

const BlogCard = ({
  title,
  description,
  image,
  username,
  time,
  id,
  userId
}) => {
  const navigate = useNavigate()
  const handleEdit = () =>{
    navigate(`/blog-details/${id}`)
  }

const handleDelete = async()=>{
  try{
    const response = await fetch(`http://localhost:4000/api/v1/blogs/delete-blog/${id}`,{

      method:'DELETE'
    }
    )
    if (response.status === 200) {
      toast.success('Blog deleted');
      window.location.reload();
      navigate('/my-blogs')
    } else {
      console.log(response.statusText);
    }

  }catch(err){
    console.log(err);
  }
}


  return (
// {/* <Link to={`/get-blog/${id}`}> */}
    <div className='entry container'>

      <div className='post'>
      {userId && (
        <div className='box'>
        <EditNoteRoundedIcon onClick={handleEdit}/>
        <DeleteOutlineIcon onClick={handleDelete}/>
        </div>
      
      )}
        <Link to={`/get-blog/${id}`}>
        <img src={image} alt='' />

        </Link>
        <div className='text'>
        <Link to={`/get-blog/${id}`}>
          <h2 style={{ color:"#000"}}> {title}</h2>
        </Link>
        <div className='info'>

          <h4> {username}</h4>
          <time>{time}</time>
        </div>
          {/* <p dangerouslySetInnerHTML={{__html:description}}/> */}
        </div>
      </div>



    </div>
        // {/* </Link> */}

  )
}
export default BlogCard;