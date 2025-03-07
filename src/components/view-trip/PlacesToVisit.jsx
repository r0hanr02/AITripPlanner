import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  // console.log(trip.tripData[0].itinerary);
  if (!trip?.tripData?.itinerary) {
    return <p>Loading Recommendation...</p>;
  }

  const itineraryArray = Object.entries(trip.tripData.itinerary);
  // console.log("itenraryArayyyy++++++++++",itineraryArray);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Places To Visit</h2>

      {itineraryArray.map(([day, details], index) => (
        <div key={index} className="mt-5">
          <h2 className="text-lg font-medium">{day.toLocaleUpperCase()}</h2>
          <div className=" gap-5">
            {Array.isArray(details.activities) &&
            details.activities.length > 0 ? (
              details.activities.map((place, idx) => (
                <div key={idx} className="p-2 rounded-md mt-2">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.bestTimeToVisit}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))
            ) : (
              <p>No activities listed.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacesToVisit;
