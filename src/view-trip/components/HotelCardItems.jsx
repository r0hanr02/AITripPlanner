import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItems({hotel}) {

     const [photoUrl,setPhotoUrl] = useState();
      
      useEffect(()=> {
         hotel&&GetPlacePhoto()
      },[hotel])
    
      const GetPlacePhoto = async() => {
        const data = {
          textQuery:hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp=>{
    
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
          setPhotoUrl(PhotoUrl);
        })
    }

  return (
    <div>
      <Link to={'https://www.google.com//maps/search/?api=1&query='+hotel?.hotelName+","+ hotel?.address} target='_blank'>
            <div className="hover:scale-105 transition-all cursor-pointer">
                <img src={photoUrl} className='rounded-lg h-[180px] object-cover w-full'/>
                <div className='my-2 flex flex-col gap-2' >
                    <h2 className='font-medium md:text-lg'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500 md:text-sm lg:text-lg'>📍 {hotel?.address}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating} stars</h2>
                </div>
            </div>
            </Link>
    </div>
  )
}

export default HotelCardItems
