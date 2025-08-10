import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  selectBudgetOption,
  selectTravelList,
} from "../constants/options";
import { chatSession } from "../service/AlModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTrip() {
  const [place, SetPlace] = useState();

  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {}, [formData]);

     const login =useGoogleLogin({
     onSuccess:(coderes) => GetUserProfile(coderes),
     onError:(error) => console.log(error),
  }
  )
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }
    
    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("==", result?.response.text());
    setLoading(false);
    saveAiTrip(result?.response.text());
  };

  const saveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };
  
  const GetUserProfile = (tokenInfo) =>{
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: `Application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        localStorage.setItem("user", JSON.stringify(res.data));
        onGenerateTrip();
      });
  }


  return (
    <div className="w-9/12 mx-auto sm:px-10 md:px-32 lg:px-56 xl:px-20 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.{" "}
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="my-3 text-xl font-medium ">
            What is destination of choice ?
          </h2>

          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                SetPlace(v);
                handleInputChange("location", v); 
              },
            }}
          />
        </div>

        <div>
          <h2 className="my-3 text-xl font-medium ">
            How many days are you planning your trip ?
          </h2>
          <input
            type="number"
            placeholder="Ex.3"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            className="border p-2 rounded-md w-[800px] outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <h2 className="my-3 text-xl font-medium ">What is your Budget ?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {selectBudgetOption.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.budget == item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>

              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-gray-500 text-sm">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="my-3 text-xl font-medium mt-15">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {selectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.traveler == item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-gray-500 text-sm">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end my-20">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="bg-black text-white px-5 py-1.5 rounded-md cursor-pointer"
        >
          {" "}
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate trip"
          )}
        </Button>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the App with the Google authentication securly</p>
              <Button
                className="w-full mt-5 flex gap-5 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
