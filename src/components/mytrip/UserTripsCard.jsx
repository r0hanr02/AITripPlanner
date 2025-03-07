import { getPhotoUrl, GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripsCard = ({ trip }) => {
  const [PhotoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhotos();
  }, [trip]);

  const GetPlacePhotos = async () => {
    if (!trip?.tripData?.destination) return;

    const data = { textQuery: trip?.tripData?.destination };

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
    <Link to={"/view-trip/" + trip?.id}>
      <div className="flex flex-col items-start flex-wrap mt-5">
        <img
          src={PhotoUrl}
          alt=""
          className="object-cover  h-[200px] w-[450px] rounded-xl"
        />
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-lg">{trip?.tripData?.destination}</h2>
          <h2 className="text-gray-400 font-semibold">
            {trip.userSelection.noOfDays} Days trips with{" "}
            {trip.userSelection.budget}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripsCard;
