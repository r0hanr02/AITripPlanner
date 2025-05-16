/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiShareForwardFill } from "react-icons/ri";
import { GetPlaceDetails, getPhotoUrl } from "@/service/GlobalApi";

const InfoSection = ({ tripData }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (tripData) {
      setPhotoUrl(""); // Clear previous photo on tripData change
      GetPlacePhotos();
    }
  }, [tripData]);

  const GetPlacePhotos = async () => {
    if (!tripData?.userSelection?.location?.label) return;

    const data = { textQuery: tripData.userSelection.location.label };

    try {
      // Fetch data from the API
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
      <img
        src={photoUrl || "https://via.placeholder.com/350"}
        className="h-[350px] w-full object-cover rounded-xl"
        alt="Location Preview"
      />
      <div className="flex flex-wrap justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripData?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-4 justify-center">
            <h2 className="p-2 px-3 bg-gray-200 rounded-2xl text-gray-500 text-xs md:text-md">
              🗓️ {tripData?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-2 px-3 bg-gray-200 rounded-2xl text-gray-500 text-xs md:text-md">
              💰 {tripData?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-2 px-3 bg-gray-200 rounded-2xl text-gray-500 text-xs md:text-md">
              🥂 No of Travellers: {tripData?.userSelection?.people} people
            </h2>
          </div>
        </div>
        <Button>
          <RiShareForwardFill />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
