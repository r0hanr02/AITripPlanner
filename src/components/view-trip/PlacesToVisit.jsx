import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  if (!trip?.tripData?.itinerary) {
    return <p>Loading recommendations...</p>;
  }

  const itineraryArray = Object.entries(trip.tripData.itinerary);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Places To Visit</h2>

      {itineraryArray.length === 0 ? (
        <p>No places to visit available.</p>
      ) : (
        itineraryArray.map(([day, details], index) => (
          <div key={index} className="mt-5">
            <h2 className="text-lg font-medium">{day.toUpperCase()}</h2>
            <div className="gap-1">
              {Array.isArray(details?.activities) &&
              details.activities.length > 0 ? (
                details.activities.map((place, idx) => (
                  <div key={idx} className="p-2 rounded-md mt-2">
                    {place.bestTimeToVisit && (
                      <h2 className="font-medium text-sm text-orange-600">
                        Best Time to Visit: {place.bestTimeToVisit}
                      </h2>
                    )}
                    <PlaceCardItem place={place} />
                  </div>
                ))
              ) : (
                <p>No activities listed for this day.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PlacesToVisit;
