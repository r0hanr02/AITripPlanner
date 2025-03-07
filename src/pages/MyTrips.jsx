import UserTripsCard from "@/components/mytrip/UserTripsCard";
import { db } from "@/service/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  //   used to get all User Trips
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    const trips = [];

    querySnapshot.forEach((doc) => {
      // setUserTrips((prev) => [...prev, doc.data()]);
      trips.push(doc.data());
      setUserTrips(trips);
    });
  };

  useEffect(() => {
    GetUserTrips();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="w-10/12 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">My Trips</h2>
        <div className="grid grid-cols-2 gap-5">
          {userTrips.map((trip, index) => (
            <UserTripsCard key={index} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
