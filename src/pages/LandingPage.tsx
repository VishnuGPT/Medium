import React, { useEffect, useState } from 'react';
import Navbar from '../assets/components/navbar';
import image from '../assets/4_SdjkdS98aKH76I8eD0_qjw.webp';
import Bottom from '../assets/components/Bottom';
import { useNavigate } from 'react-router-dom';
import Mainpage from './Mainpage';
import { LoadingOverlay } from '../assets/components/LoadingOverlay';
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/verify`, { token });
        if (response.data.message === 'Token is valid') {
          setuserName(response.data.userName);
          setIsTokenValid(true);
        } else {
          console.log('Token is invalid');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      } finally {
        console.log('Finished token verification');
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return <LoadingOverlay />;

  if (isTokenValid) {
    navigate('/dashboard');
  }

  return (
    <div className='relative bg-[rgb(247,244,237)] h-screen w-screen'>
      <Navbar />
      <div className='w-full flex items-center'>
        <div className='flex flex-col justify-center gap-10 py-20 px-6 lg:px-16'>
          <div>
            <h1 className='text-7xl md:text-8xl font-semibold'>Human</h1>
            <h1 className='text-7xl md:text-8xl font-semibold'>stories & ideas</h1>
          </div>
          <h2>A place to read, write, and deepen your understanding</h2>
          <button
            onClick={() => navigate('/signup')}
            className='bg-emerald-600 lg:bg-black text-white text-lg font-semibold px-4 py-2 rounded-2xl w-40'
          >
            Start Reading
          </button>
        </div>
        <div className='hidden lg:block h-[85vh] w-full absolute z-10 right-0'>
          <img className='h-full w-full object-cover object-center' src={image} alt="Landing" />
        </div>
      </div>
      <Bottom />
    </div>
  );
};

export default LandingPage;
