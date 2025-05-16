// import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  selectBudgetOption,
  selectTravelList,
} from "@/contants/data";
import { chatSession } from "@/service/AiModal";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebase.config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setopenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.people
    ) {
      toast("Please fill all Details");
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text());
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (err) => console.log(err),
  });

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const GetUserProfile = (tokenInfo) => {
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
        localStorage.setItem("user", JSON.stringify(res.data));
        onGenerateTrip();
      });
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

  return (
    <div className="flex items-center justify-center">
      <div className="w-10/12 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">
          🌴 Tell us your travel preference 🥥
        </h2>
        <p className="mt-3 text-gray-500 text-xl">
          Let AI craft your dream getaway—personalized just for you!
        </p>

        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              what is destination of choice ?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip?
            </h2>
            <Input
              placeholder={"Ex.3"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {selectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`cursor-pointer flex flex-col items-center  text-justify border roundelg hover:shadow-lg
                  ${
                    formData?.budget == item.title &&
                    "shadow-lg border-2 border-black"
                  }
                  `}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-medium">{item.title}</h2>
                <h2 className="p-2 text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on Travelling with on your next Adventure?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {selectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("people", item.people)}
                className={`p-4 cursor-pointer flex flex-col items-center  text-justify border roundelg hover:shadow-lg
                  ${
                    formData?.people == item.people &&
                    "shadow-lg border-2 border-black"
                  }
                `}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-medium">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 flex justify-end">
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center">
                    <img className="" src="/logo.svg" alt="" />
                  </div>
                  <div className="mt-5 mb-5">
                    <h2 className="font-bold ">Sign in With Google</h2>
                    <p>
                      Sign in to the app with Google Authentication securely
                    </p>
                  </div>
                  <div>
                    <Button
                      disabled={loading}
                      onClick={googleLogin}
                      className="w-full"
                    >
                      <>
                        <FcGoogle size={20} />
                        Sign In With Google
                      </>
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateTrip;
