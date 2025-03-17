import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";
import {
  BrowserRouter,
  // BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateTrip from "./pages/CreateTrip";
import Header from "./components/custom/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./pages/ViewTrip";
import MyTrips from "./pages/MyTrips";

const client_id = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <BrowserRouter>
      <Header />
      <Toaster />
      <App/>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
