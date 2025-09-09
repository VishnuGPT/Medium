import React, { useEffect } from 'react'
import PostPage from '../../pages/PostPage';
import { useNavigate } from 'react-router-dom';

const PostCard = (props) => {
    console.log(props)
    const navigate = useNavigate();
    const handleclick = ()=>{
        navigate(`/post/${props.id}`,{ state: { blog: props } });
    }
    return (
            <div onClick={handleclick} className='  p-2 m-2 lg:max-h-[30vh] sm:px-10 sm:py-4 my-4 sm:mx-10 bg-white rounded-lg border-1 border-gray-400 duration-300 lg:w-[80vw] hover:shadow-lg hover:cursor-pointer'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col gap-2'>
                        <div className='text-sm text-gray-500'>By {props.Author}</div>
                        <h1 className='text-2xl font-bold'>{props.Title}</h1>
                        <p className='text-lg text-gray-600'>{props.Description.split(" ").slice(0, 15).join(" ")}</p>
                    </div>
                    <img className='w-[20vh] h-[20vh] object-cover rounded-lg ' src={props.Image} alt="Loading image..." />
                </div>
            </div>
    )
}

export default PostCard
