/* eslint-disable react/prop-types */
import { GetPlaceDetails, getPhotoUrl } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel }) => {
  const [PhotoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhotos();
  }, [hotel]);

  const GetPlacePhotos = async () => {
    if (!hotel?.hotelName) return;

    const data = { textQuery: hotel.hotelName };

    try {
      // Fetch hotel details from API
      const resp = await GetPlaceDetails(data);

      // Validate API response
      if (!resp.data.places || resp.data.places.length === 0) {
        console.error("No places found for:", data.textQuery);
        return;
      }

      const place = resp.data.places[0];

      if (!place.photos || place.photos.length === 0) {
        console.error("No photos available for this place.");
        return;
      }

      // Use index 2 if available, otherwise fallback to 0
      const photoIndex = place.photos[2] ? 2 : 0;
      const photoRef = place.photos[photoIndex]?.name;

      // Get the correct URL
      const photoUrl = getPhotoUrl(photoRef);
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error("Error fetching place details:", error.message);
    }
  };

  return (
    <div>
      <Link
        to={
          `https://www.google.com/maps/search/?api=1&query=` +
          hotel.hotelName +
          "," +
          hotel.address
        }
        target="__blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img
            src={PhotoUrl}
            alt=""
            className="rounded-lg h-72 w-full object-cover"
          />
          <div className="my-2 flex flex-col gap-1">
            <h2 className="font-medium">{hotel.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
            <h2 className="text-sm ">💰 {hotel.price}</h2>
            <h2 className="text-sm ">⭐ {hotel.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
