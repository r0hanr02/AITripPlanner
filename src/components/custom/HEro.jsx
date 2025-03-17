import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const HEro = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mx-56 md:my-20 gap-10">
      <h1 className="font-extrabold md:text-[50px] text-[26px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI
        </span>
        <br />
        <span className="text-[20px]">
          "Plan, Explore, and Adventure Your Way—Effortlessly with AI!"
        </span>
      </h1>
      <p className="md:text-xl text-gray-500 text-center text-[18px] ">
        "Discover the world your way with our AI-powered trip planner. From
        hidden gems to iconic landmarks, get personalized itineraries that make
        every journey unforgettable."
      </p>
      <Link to="/create-trip" className="">
        <Button>Get Started, its,free</Button>
      </Link>
    </div>
  );
};

export default HEro;
