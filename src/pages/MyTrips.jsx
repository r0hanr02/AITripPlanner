import UserTripsCard from "@/components/mytrip/UserTripsCard";
import { db } from "@/service/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  // Fetch all user trips
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const trips = [];

      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error.message);
    }
  };

  useEffect(() => {
    GetUserTrips();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-10/12 sm:px-10 md:px-32 lg:px-56 xl:px-10 p-2 mt-10">
        <h2 className="font-bold text-3xl">My Trips</h2>
        {userTrips.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-5">
            {userTrips.map((trip, index) => (
              <UserTripsCard key={index} trip={trip} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no trips yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
