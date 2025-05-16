import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItems from './HotelCardItems'

function Hotels({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl my-5'>Hotel Recommendation</h2>

      <div className='grid md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5'>
        {trip?.tripData?.hotels?.map((hotel,index) => (
          <HotelCardItems hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Hotels
