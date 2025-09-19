
const Bottom = () => {
    return (
        <div className='px-7 sm:px-15 w-screen absolute  h-15  bottom-0 z-20 lg:bg-[rgb(247,244,237)] lg:text-black bg-black text-white flex justify-between items-center  border-y-1 border-black'>
            <div>
                <div className='flex gap-7 justify-center items-between'>
                    <h2 className='text-sm '>About</h2>
                    <h2 className='text-sm'>Help</h2>
                    <h2 className='text-sm '>Terms</h2>
                    <h2 className='text-sm '>Privacy</h2>
                    <div className='hidden lg:block lg:flex gap-7'>
                        <h2 className='text-sm '>Home</h2>
                        <h2 className='text-sm '>Careers</h2>
                        <h2 className='text-sm '>Press</h2>
                        <h2 className='text-sm '>Blog</h2>
                        <h2 className='text-sm '>Rules</h2>
                        <h2 className='text-sm '>Text to speech</h2>
                        <h2 className='text-sm '>Status</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bottom
