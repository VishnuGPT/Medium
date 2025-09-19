import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoadingOverlay } from '../assets/components/LoadingOverlay';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState('');
  const Navigate = useNavigate();
  const [formDataError, setFormDataError] = useState({
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      setFormDataError(prev => ({ ...prev, email: true }));
      setError(true);
      setErrorName('Invalid email format');
    }
    if (formData.password !== formData.confirmPassword) {
      setFormDataError(prev => ({ ...prev, password: true }));
      setError(true);
      setErrorName('Passwords do not match');
    }
    if (formDataError.email || formDataError.password) {
      setLoading(false);
      return;
    }
    axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signup`, {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    })
      .then(response => {
        setLoading(false);
        const token = response.data.token;
        localStorage.setItem('token', token);
        Navigate('/');
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        setErrorName(error.response?.data?.message || 'Something went wrong');
      });
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 py-50">
      <form onSubmit={handleSubmit} className="grid gap-6 mb-6 md:grid-cols-1 bg-white rounded-lg shadow-lg lg:w-1/3 p-5 m-3">

        <div>
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">Sign Up</h2>

          <label className="block mb-2 text-sm text-black">Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formDataError.email
              ? "bg-red-50 border-2 border-red-500 text-sm rounded-lg block w-full p-2.5 focus:ring-red-500 hover:border-red-500 focus:ring-2"
              : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            }
            placeholder="john.doe@gmail.com"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={formDataError.password
              ? "bg-red-50 border-2 border-red-500 text-sm rounded-lg block w-full p-2.5 focus:ring-red-500 hover:border-red-500 focus:ring-2"
              : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            }
            placeholder="•••••••••"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={formDataError.password
              ? "bg-red-50 border-2 border-red-500 text-sm rounded-lg block w-full p-2.5 focus:ring-red-500 hover:border-red-500 focus:ring-2"
              : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            }
            placeholder="•••••••••"
            required
          />
        </div>

        <div className="flex items-start mb-6">
          <input id="remember" type="checkbox" className="w-4 h-4 mr-2 cursor-pointer" required />
          <label className="text-sm font-medium text-black">
            I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
          </label>
        </div>

        <button type="submit" className="bg-blue-700 p-2 rounded-2xl text-center cursor-pointer text-white hover:bg-blue-800 w-full">
          Sign Up
        </button>

        <p className="text-sm font-light text-center text-black">
          Already have an account? <a href="/signin" className="font-medium text-blue-600 hover:underline">Sign In</a>
        </p>

        {error && <p className="text-sm font-light text-center text-red-500 animate-pulse">{errorName === 'Invalid input' ? 'Password should be at least 6 characters long' : errorName}</p>}
      </form>
    </div>
  );
};

export default SignUp;
