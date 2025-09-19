import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {LoadingOverlay} from '../assets/components/LoadingOverlay'


const NewStory = () => {
    
    const navigate = useNavigate()
    const [userName, setuserName] = React.useState<string | null>(null)
    const [isTokenValid, setIsTokenValid] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [errorName, setErrorName] = React.useState('')
    const handleClick = () => {
        setLoading(true);
        //cross check to publish yes/no popup
        if (!title || !content) {
            setErrorName('Title and content cannot be empty')
            setLoading(false);
            return
        }

        const token = localStorage.getItem('token')
        if (token) {
            axios.post(`${import.meta.env.VITE_API_URL}/api/v1/blog/create`, {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                console.log('Story published:', response.data)
                navigate('/')
            }).catch((error) => {
                console.error('Error publishing story:', error)
            }).finally(()=>{setLoading(false);})
        }
    }
    // Check if the token is valid
    // If the token is not valid/present, show the normal new-story page
    // If the token is valid, show the welcome page
    useEffect(() => {

        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            const res = axios.post(`${import.meta.env.VITE_API_URL}/api/v1/verify`, { token: token })
            res.then((response) => {
                if (response.data.message === 'Token is valid') {
                    setuserName(response.data.userName)
                    setLoading(false)
                    setIsTokenValid(true)
                } else {
                    setLoading(false)
                }
            }).catch((error) => {
                console.error('Error verifying token:', error)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])
    if (loading) {
        return <LoadingOverlay />;
    }
    if (isTokenValid) {

        return (
            <>
                {errorName && (
                    <div className='absolute inset-0 m-auto w-full h-full flex flex-col items-center justify-center backdrop-blur-sm bg-transparent py-50'>
                        <div className='border-1 border-red-500 p-6 text-center'>
                            <h1 className='text-3xl font-bold mb-4 text-red-500'>{errorName}</h1>
                            <button onClick={() => { setErrorName('') }} className='bg-green-500 text-white px-4 py-2 rounded-2xl hover:cursor-pointer active:scale-90 transform-3d transition-3s '>Continue Writing</button>

                        </div>
                    </div>
                )}
                <div>
                    <nav className='flex items-center justify-between border-1 border-gray-200 sm:px-20 px-0'>
                        <div className='flex gap-2 p-2 px-6 items-baseline justify-center'>
                            <h1 onClick={() => navigate('/')} className='text-3xl font-bold hover:cursor-pointer'>Medium</h1>
                            <h1 className='hidden lg:block text-sm font-semibold text-gray-600'>Draft in {userName}</h1>
                        </div>
                        <div className='p-2 flex gap-4 items-center'>
                            <button onClick={handleClick} className='bg-green-400 rounded-2xl text-sm px-2 h-8 hover:cursor-pointer hover:bg-green-600' disabled={loading} >Publish</button>
                            <button className=' hover:cursor-pointer hover:bg-gray-600  border-black border-1 p-2 rounded-4xl text-xl font-semibold text-white bg-gray-400'>
                                {userName && typeof userName === 'string'
                                    ? `${userName.charAt(0)}${userName.split(' ')[1] ? userName.split(' ')[1].charAt(0) : ''}`
                                    : ''}
                            </button>
                        </div>
                    </nav>

                    <div className='px-10 py-5 sm:px-20 sm:py-10'>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-4 rounded-lg focus:outline-none placeholder:text-3xl text-3xl' placeholder='Title'></input>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} className='w-full h-60 p-4 rounded-lg focus:outline-none text-xl placeholder:text-xl' placeholder='Write your story here...'></textarea>
                    </div>

                </div></>
        )

    } else {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-gray-100 py-50'>
                <h1 className='text-3xl font-bold mb-4'>Please Sign In to Write a Story</h1>
                <button onClick={() => navigate('/signin')} className='bg-blue-500 text-white px-4 py-2 rounded'>Sign In</button>
            </div>
        )
    }
}

export default NewStory;
