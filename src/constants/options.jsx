export const selectTravelList = [
    {
      id: 1,
      title: "Just Me",
      desc: "A solo traveler in exploration.",
      icon: "✈️",
      people: 1,
    },
    {
      id: 2,
      title: "A Couple",
      desc: "Two travelers in tandem.",
      icon: "🥂",
      people: 2,
    },
    {
      id: 3,
      title: "Family",
      desc: "A group of fun-loving adventurers.",
      icon: "🏡",
      people: 4,
    },
    {
      id: 4,
      title: "Friends",
      desc: "A bunch of thrill-seekers.",
      icon: "⛵",
      people: 3,
    },
    {
      id: 5,
      title: "Business",
      desc: "Traveling for work or networking.",
      icon: "💼",
      people: 1,
    },
    {
      id: 6,
      title: "Group Tour",
      desc: "Join a guided tour with fellow travelers.",
      icon: "🚌",
      people: 10,
    },
  ];
  
  export const selectBudgetOption = [
    {
      id: 1,
      title: "Budget-Friendly",
      desc: "Affordable travel options with essential amenities.",
      icon: "💰",
    },
    {
      id: 2,
      title: "Standard",
      desc: "A balanced travel experience with good comfort.",
      icon: "🏠",
    },
    {
      id: 3,
      title: "Luxury",
      desc: "Experience premium services and high-end accommodations.",
      icon: "🏨",
    },
    {
      id: 4,
      title: "All-Inclusive",
      desc: "Includes meals, activities, and accommodations in one package.",
      icon: "🎟️",
    },
    {
      id: 5,
      title: "Backpacker",
      desc: "Low-cost travel with hostels and shared experiences.",
      icon: "🎒",
    },
  ];
  export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {noOfDays} days for {people} people 
  with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url,
   geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,
    Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} with each day plan
     with best time to visit in JSON format`;