import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { blog } = location.state || {};


    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}  // starting state
            animate={{ opacity: 1, y: 0 }}   // ending state
            transition={{ duration: 0.5 }}   // how long animation takes

            className='px-7 sm:px-15 w-screen border-12 border-black h-auto min-h-screen  bg-[rgb(247,244,237)] flex flex-col justify-start items-center gap-5 py-10 border-y-1 border-black'>
            <div className='flex justify-center items-center gap-2 lg:gap-[30vw] flex-wrap'>
                <h1 className='text-3xl font-bold text-center '>{blog.Title}</h1>
                <img src={blog.Image} alt="" className=' bg-black rounded-2xl' />

            </div>
            <h2 className='text-xl text-center'>{blog.Description}</h2>
            <div>
                <span>Posted By </span>
                <span className='font-bold'>{blog.Author}</span>

            </div>
            <button
                className="text-white p-4 rounded-2xl bg-black text-xl hover:cursor-pointer hover:bg-gray-700 transition-all duration-75 active:scale-95"
                onClick={() => { navigate('/dashboard'); }}
            >
                Go Back
            </button>


        </motion.div>
    )
}

export default PostPage
