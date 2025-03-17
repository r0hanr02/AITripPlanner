/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setopenDialog] = useState(false);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (err) => console.log(err),
  });
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
        setopenDialog(false);
        navigate("/");
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to="/" className="">
        <img src="/logo.svg" alt="" className="cursor-pointer" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trips
              </Button>
            </Link>
            <Link to="/mytrips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </Link>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt=""
                  className="h-[35px] w-[35px] rounded-full object-cover"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                  }}
                  className="cursor-pointer"
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setopenDialog(true)}>Sign In </Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setopenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <img className="" src="/logo.svg" alt="" />
                </div>
                <div className="mt-5 mb-5">
                  <h2 className="font-bold ">Sign in With Google</h2>
                  <p>Sign in to the app with Google Authentication securely</p>
                </div>
                <div>
                  <Button onClick={googleLogin} className="w-full">
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
  );
};

export default Header;
