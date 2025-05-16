/* eslint-disable react/prop-types */
import { GetPlaceDetails, getPhotoUrl } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (hotel) {
      setPhotoUrl(""); // Clear previous photo when hotel changes
      GetPlacePhotos();
    }
  }, [hotel]);

  const GetPlacePhotos = async () => {
    if (!hotel?.hotelName) return;

    const data = { textQuery: hotel.hotelName };

    try {
      // Fetch hotel details from API
      const resp = await GetPlaceDetails(data);

      // Validate API response
      if (!resp?.data?.places || resp.data.places.length === 0) {
        console.error("No places found for:", data.textQuery);
        return;
      }

      const place = resp.data.places[0];

      if (!place?.photos || place.photos.length === 0) {
        console.error("No photos available for this place.");
        return;
      }

      // Use index 2 if available, otherwise fallback to 0
      const photoIndex = place.photos[2] ? 2 : 0;
      const photoRef = place.photos[photoIndex]?.name;

      if (!photoRef) {
        console.error("Photo reference not found.");
        return;
      }

      // Get the correct URL
      const photoUrl = getPhotoUrl(photoRef);
      console.log("Generated Photo URL:", photoUrl); // Log the URL for debugging

      if (photoUrl) {
        setPhotoUrl(photoUrl);
      } else {
        console.error("Failed to generate photo URL.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error.message);
    }
  };

  return (
    <div>
      <Link
        to={
          `https://www.google.com/maps/search/?api=1&query=` +
          encodeURIComponent(hotel.hotelName) +
          "," +
          encodeURIComponent(hotel.address)
        }
        target="__blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img
            src={photoUrl || "https://via.placeholder.com/350"}
            alt={hotel.hotelName}
            className="rounded-lg h-28 md:h-72  w-full object-cover"
          />
          <div className="my-2 flex flex-col gap-1">
            <h2 className="font-medium">{hotel.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
            <h2 className="text-sm">💰 {hotel.price}</h2>
            <h2 className="text-sm">⭐ {hotel.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
