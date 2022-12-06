import React, { ReactElement, useState } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import Map from "./components/HMap";
import Events from "./components/Events";

import MapApp from "./components/Map";
import Event from "./components/Event";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Map />,
    },
    {
        path: "/event",
        element: <Event />,
    },
    {
        path: "/events",
        element: <Events />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
