import React from 'react'
import './App.css'
import { BrowserRouter,Route,Routes  } from 'react-router-dom'
import LandingPage from  './pages/LandingPage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import NewStory from './pages/NewStory'
import PostPage from './pages/PostPage'
import Mainpage from './pages/Mainpage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/new-story" element={<NewStory />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path='/dashboard' element={<Mainpage />} />
          <Route path="*" element={<div className='flex justify-center items-center h-screen text-3xl font-bold'>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
