import React, { ReactElement, useState } from "react";
import Map from "./components/HMap";
import Events from "./components/Events";

import Login from "./components/Login";
import MapApp from "./components/Map";
import Event, { GetEventByID } from "./components/Event";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";

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
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/addevent",
        element: <CreateEvent />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
