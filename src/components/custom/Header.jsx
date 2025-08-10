import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
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

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (coderes) => GetUserProfile(coderes),
    onError: (error) => console.log(error),
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
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDailog(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    // console.log(user)
  }, []);

  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5 ">
        <a href="/">
          <img src="/logo (2).png" alt="logo"  className="w-60 "/>
        </a>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <a href="/create-trip">
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer"
                >
                  + Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer"
                >
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  {" "}
                  <img
                    src={user?.picture}
                    alt=""
                    className="h-[35px] w-[35px] rounded-full cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="cursor-pointer"
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              className="cursor-pointer"
              onClick={() => setOpenDailog(true)}
            >
              Sign In
            </Button>
          )}
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
    </>
  );
}

export default Header;
