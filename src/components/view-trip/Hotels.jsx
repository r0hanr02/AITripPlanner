import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
