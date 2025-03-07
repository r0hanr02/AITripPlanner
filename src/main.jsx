import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";
import {
  // BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateTrip from "./pages/CreateTrip";
import Header from "./components/custom/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./pages/ViewTrip";
import MyTrips from "./pages/MyTrips";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/mytrips",
    element: <MyTrips />,
  },
]);

const client_id = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />;
    </GoogleOAuthProvider>
  </StrictMode>
);
