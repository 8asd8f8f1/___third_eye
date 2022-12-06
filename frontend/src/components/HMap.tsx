import React, { useState, useCallback, forwardRef } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";

const Map: React.FC = () => {
    const [mapContainer, setMapContainer] = useState<HTMLDivElement>();
    const mapRef = useCallback(node => {
        node && setMapContainer(node);
    }, []);

    const mapOptions = {
        // Add your map options here
        // `center` and `zoom` are required for every map to be displayed
        center: { lat: 53.5582447, lng: 9.647645 },
        zoom: 6,
    };

    return (
        <GoogleMapsProvider
            googleMapsAPIKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
            mapContainer={mapContainer}
            mapOptions={mapOptions}
        >
            <div
                ref={(node: HTMLDivElement) => setMapContainer(node)}
                style={{ height: "100vh" }}
            />
        </GoogleMapsProvider>
    );
};

export default Map;
