import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      if (!place?.placeName) return;
      const data = { textQuery: place.placeName };
      
      const response = await GetPlaceDetails(data);
      
      const photoName = response.data?.places?.[0]?.photos?.[3]?.name;  // Check if photo exists safely
      if (photoName) {
        const formattedPhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(formattedPhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName || "")}`} target="__blank">
      <div className="hover:shadow-md border rounded-xl p-3 mt-2 flex flex-col md:flex-row items-center gap-10 hover:scale-105 transition-all">
        <img src={photoUrl ? photoUrl : '/nature.jpg'} className="h-[160px] w-[250px] rounded-xl object-cover" alt="place_image" />
        
        <div className="flex flex-col items-start gap-2">
          <h2 className="font-bold text-lg">📍 {place?.placeName}</h2>
          <p className="text-gray-700">{place?.placeDetails}</p>
          <p>
            <strong>Travel Time From Hotels:</strong> 🕒 {place?.travelTimeFromHotel}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
