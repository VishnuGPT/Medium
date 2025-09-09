import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState(false);
  const [errorName,setErrorName] = useState('');
  const [formDataError, setFormDataError] = useState({
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    //regex for email validation(gmail.com only)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      setFormDataError(prev => ({ ...prev, email: true }));
    }

    if (formDataError.email) {
      setLoading(false);
      alert('Please enter valid email');
      
      return;
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`, {
        email: formData.email,
        password: formData.password,
      })
        .then(response => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          setLoading(false);
          Navigate('/');
        })
        .catch(error => {
          setLoading(false);
          setError(true);
          setErrorName(error.response.data.message);
        });

      // If using Create React App, use this instead:
      // axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/signup`, { ... })
    }
  }


  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 py-50'>
      <form onSubmit={handleSubmit} className="grid gap-6 mb-6 md:grid-cols-1 bg-black rounded-lg shadow-lg lg:w-1/3 p-5 m-3">

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Sign In</h2>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formDataError.email
              ? "bg-red-50 border-2 border-red-500 text-sm rounded-lg block w-full p-2.5  focus:ring-red-500 hover:border-red-500 focus:ring-2 "
              : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            }
            placeholder="john.doe@gmail.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={formDataError.password
              ? "bg-red-50 border-2 border-red-500 text-sm rounded-lg block w-full p-2.5  focus:ring-red-500 hover:border-red-500 focus:ring-2 "
              : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            } placeholder="•••••••••"
            required
          />
        </div>
        <button type="submit"  className="bg-blue-700 p-2 rounded-2xl text-center cursor-pointer text-white hover:bg-blue-800 w-full">
          Sign In
        </button>
        <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
          Create account now!! <a href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign Up</a>
        </p>
        {error && <p className="text-red-500 text-sm text-center animate-pulse">{errorName}</p>}
      </form>
    </div>
  );
};

export default SignIn;
