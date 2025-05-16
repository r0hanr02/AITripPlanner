import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '../ui/button'
import Footer from '@/view-trip/components/Footer'

function HEro() {
  return (
    <div className='flex flex-col items-center mx-48 gap-9'>
      <h2 className='font-extrabold text-[50px] text-center mt-16'>
       <span className='text-[#f56551]'> Discover Your Next Adventure With AI:</span> Personalized Itineraries at your fingertips</h2>
       <p className='text-gray-500 text-xl text-center '>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and bugdets.</p>
       <Link to={'/create-trip'}>
        <Button className='cursor-pointer'>
            Get Started, It's Free
        </Button>
      </Link>
      <img src="/landing.jpg" alt="" className='-mt-0 h-[500px] object-cover rounded-xl' />

      <Footer />
    </div>
  )
}

export default HEro
