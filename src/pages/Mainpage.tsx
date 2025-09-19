import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import PostCard from '../assets/components/PostCard'
import axios from 'axios'
import { motion } from 'framer-motion';
import { LoadingOverlay } from '../assets/components/LoadingOverlay'

const Mainpage = () => {
    const navigate = useNavigate();
    interface Blog {
        id: string;
        title: string;
        content: string;
        author: { name: string };
        image: string;
        createdAt: string;
        // add other fields if needed
    }

    const [userName, setUserName] = useState('User');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSetting, setShowSetting] = useState(false);
    const [input, setInput] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const postsPerPage = 10; // show 10 posts per page

    useEffect(() => {
        if (input === '') {
            console.log(filteredBlogs)
            // if search is empty, show all blogs (first page)
            setFilteredBlogs(blogs);
            setVisibleBlogs(blogs.slice(0, postsPerPage));
            setCurrentPage(1);
        } else {
            const filtered = blogs.filter(blog =>
                blog.title.toLowerCase().includes(input.toLowerCase()) ||
                blog.content.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredBlogs(filtered);
            setVisibleBlogs(filtered.slice(0, postsPerPage));
            setCurrentPage(1);
        }
    }, [input, blogs]);


    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/blog/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const fetchedBlogs = response.data.data;
            setLoading(false);

            // assign unique images
            interface Author {
                name: string;
            }

            interface Blog {
                id: string;
                title: string;
                content: string;
                author: Author;
                image: string;
                createdAt: string;
                // add other fields if needed
            }

            const blogsWithImages: Blog[] = fetchedBlogs.map((blog: Blog, i: number): Blog => ({
                ...blog,
                image: `https://picsum.photos/200?random=${Date.now() + i}`
            }));

            // sort most recent first
            blogsWithImages.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setBlogs(blogsWithImages);
            setVisibleBlogs(blogsWithImages.slice(0, postsPerPage));
        }

        setLoading(true);

        const token = localStorage.getItem('token');
        const fetchInfo = async () => {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/verify`, { token: token });
            if (response.data.message === 'Token is valid') {
                setUserName(response.data.userName);
                fetchBlogs();
            } else {
                setLoading(false);
                navigate('/signin');

            }
        }
        fetchInfo();
    }, []);



    // handle page change
    interface HandlePageChangeProps {
        (pageNumber: number): void;
    }

    const handlePageChange: HandlePageChangeProps = (pageNumber) => {
        const startIndex = (pageNumber - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        setVisibleBlogs(blogs.slice(startIndex, endIndex));
        setCurrentPage(pageNumber);
    }

    // calculate total pages
    const totalPages = Math.ceil(blogs.length / postsPerPage);
    if (loading) {
        return <LoadingOverlay />;
    }
    return (
        <div>
            {showSetting && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className=' absolute w-full h-[30vh] lg:w-[20vw] lg:h-[35vh] top-16 lg:right-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col justify-between '>
                        <div className=' m-5 gap-4 flex flex-col mt-2 items-start justify-start'>
                            <button className='text-lg hover:text-gray-700 hover:cursor-pointer text-gray-400'>Profile</button>
                            <button className='text-lg hover:text-gray-700 hover:cursor-pointer text-gray-400'>My Stories</button>
                        </div>
                        <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className='text-lg hover:bg-red-400 p-2 rounded-2xl hover:cursor-pointer hover:font-semibold hover:text-white text-gray-400'>Logout</button>
                    </div>
                </motion.div>
            )}

            <nav className='flex items-center justify-between border-1 border-gray-200 px-2'>
                <div className='flex gap-6 p-2'>
                    <h1 className='text-3xl font-bold'>Medium</h1>
                    <input className='w-[20vw] hidden sm:block bg-gray-100 text-gray-800 rounded-2xl p-2 focus:outline-none ' placeholder='Search' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className='p-2 flex gap-4 '>
                    <button onClick={() => { navigate('/new-story') }} className='text-gray-600 hover:text-gray-700 cursor-pointer text-xl font-semibold'>Write</button>
                    <button onClick={() => {
                        if (showSetting) {
                            setShowSetting(false)
                        } else {
                            setShowSetting(true)
                        }
                    }} className='hover:cursor-pointer bg-gray-600 border-black border-1 p-2 rounded-4xl text-xl font-semibold text-white hover:bg-gray-500'>
                        {userName.charAt(0)}{userName.split(' ')[1]?.charAt(0)}
                    </button>
                </div>
            </nav>

            <div className={showSetting ? `hidden lg:block` : ``}>
                <h2 className='text-2xl font-bold text-center mt-4'>Recent Posts</h2>
                <div className='flex flex-col gap-4 justify-center items-center mt-4'>
                    {visibleBlogs.map(blog => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <PostCard
                                key={blog.id}
                                id={blog.id}
                                Author={blog.author.name}
                                Title={blog.title}
                                Description={blog.content}
                                Image={blog.image}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Footer */}
                <div className='flex justify-center gap-2 mt-6'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 border rounded hover:cursor-pointer ${page === currentPage ? 'bg-gray-600 text-white' : 'bg-white text-gray-600'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Mainpage
