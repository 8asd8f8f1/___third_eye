import React, { ReactElement, useState } from "react";
import Map from "./components/HMap";
import Events from "./components/Events";

import MapApp from "./components/Map";
import Event, { GetEventByID } from "./components/Event";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MapApp />,
    },
    {
        path: "/event/:EventID",
        element: <Event />,
        loader: GetEventByID,
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
