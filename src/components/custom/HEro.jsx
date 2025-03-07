import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const HEro = () => {
  return (
    <div className="flex flex-col items-center mx-56 my-20 gap-10">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI
        </span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nemo
        mollitia praesentium, neque enim nam dolore? Ab magnam dolor vero?
      </p>
      <Link to="/create-trip" className="">
        <Button>Get Started, its,free</Button>
      </Link>
    </div>
  );
};

export default HEro;
