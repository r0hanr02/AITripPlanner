import Footer from "@/components/custom/Footer";
import Hotels from "@/components/view-trip/Hotels";
import InfoSection from "@/components/view-trip/InfoSection";
import PlacesToVisit from "@/components/view-trip/PlacesToVisit";
import { db } from "@/service/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // console.log("No Such Data ");
      toast("No Trip Found");
    }
  };
  // console.log(trip);

  return (
    <div className="p-8 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection tripData={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plans */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default ViewTrip;
