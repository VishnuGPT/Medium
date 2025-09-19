import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='px-7 sm:px-15 w-screen h-20 relative z-20 bg-[rgb(247,244,237)] flex justify-between items-center  border-y-1 border-black'>
            <div>
                <h1 className='text-3xl font-bold'>Medium</h1>
            </div>
            <div className='flex justify-between items-center gap-7'>
                <div>
                    <div className='hidden lg:block lg:flex gap-7'>
                        <h2 className='text-sm cursor-pointer' onClick={()=>{navigate('/about')}}>Our Story</h2>
                        <h2 className='text-sm cursor-pointer' onClick={()=>{navigate('/membership')}}>Membership</h2>
                        <h2 className='text-sm cursor-pointer' onClick={()=>{navigate('/write')}}>Write</h2>
                        <h2 className='text-sm cursor-pointer' onClick={()=>{navigate('/signin')}}>Sign In</h2>
                    </div>
                </div>
                <div>
                    <button onClick={()=>{navigate('/signup')}} className=' cursor-pointer bg-black text-white text-sm font-semibold px-4 py-2 rounded-2xl'>Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
