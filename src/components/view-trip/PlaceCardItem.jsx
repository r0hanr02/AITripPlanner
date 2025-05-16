/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, getPhotoUrl } from "@/service/GlobalApi";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhotos();
  }, [place]);

  const GetPlacePhotos = async () => {
    const PlaceName = place.placeName;

    if (!PlaceName) {
      console.error("Invalid location input:", PlaceName);
      return;
    }

    const data = { textQuery: PlaceName };

    try {
      const resp = await GetPlaceDetails(data);

      if (!resp.data.places || resp.data.places.length === 0) {
        console.error("No places found for:", PlaceName);
        return;
      }

      const place = resp.data.places[0];
      // console.log("placessssss::::::::", place);

      if (!place.photos || place.photos.length === 0) {
        console.error("No photos available for this place.");
        return;
      }

      const photoIndex = place.photos[2] ? 2 : 0;
      const photoRef = place.photos[photoIndex]?.name;

      // console.log("photoReff::::",photoRef);

      const photoUrl = `https://places.googleapis.com/v1/${photoRef}/media?maxHeightPx=800&maxWidthPx=800&key=${
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY
      }`;
      // console.log(":::::::::cd",photoUrl);
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error(
        "Error fetching place details:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=` + place.placeName}
      target="__blank"
    >
      <div className="shadow-md border rounded-xl p-3 mt-2 flex flex-col md:flex-row items-center gap-10">
        {photoUrl ? (
          <img
            src={photoUrl}
            className="h-[200px] w-[250px] object-cover rounded-xl"
            alt="place_Image"
          />
        ) : (
          <p>Loading Image...</p>
        )}
        <div className="flex flex-col items-start gap-2 ">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="line-clamp-3">{place.placeDetails}</p>
          <p>
            {" "}
            <strong>Travel Time From Hotels :</strong>{" "}
            {place.travelTimeFromHotel}
          </p>
          <Button>
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
