import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import './index.css'
import MapApp from "./Map";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MapApp />
    </React.StrictMode>
);
