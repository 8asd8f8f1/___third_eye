import React, { ReactElement, useState } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import Map from "./components/HMap";

import MapApp from "./components/Map";
import Event from "./components/Event";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Map />,
    },
    {
        path: "/events",
        element: <Event />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
