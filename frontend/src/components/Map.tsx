import * as React from "react";
import { Libraries } from "@googlemaps/js-api-loader";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual, deepEqual } from "fast-equals";
import type { TypeEqualityComparator, EqualityComparator } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import Navbar from "./Navbar";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

export const MyMapComponent: React.FC<{
    center: google.maps.LatLngLiteral;
    zoom: number;
}> = ({ center, zoom }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        new window.google.maps.Map(ref.current!, {
            center: { lat: 10, lng: 10 },
            zoom: 11,
        });
    });

    return <div ref={ref} id='map' style={{ height: "100vh" }} />;
};

const MapApp = () => (
    <div className='overflow-hidden'>
        <Navbar />
        <Wrapper
            apiKey='AIzaSyDyDAT6yUSuV-SybyKyaLtgd-tfPHNJle0'
            render={render}
        >
            <MyMapComponent center={{ lat: -34, lng: 150 }} zoom={6} />
        </Wrapper>
    </div>
);

const MapAp: React.FC = () => {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    const form = (
        <div
            style={{
                padding: "1rem",
                flexBasis: "250px",
                height: "100%",
                overflow: "auto",
            }}
        >
            <label htmlFor='zoom'>Zoom</label>
            <input
                type='number'
                id='zoom'
                name='zoom'
                value={zoom}
                onChange={event => setZoom(Number(event.target.value))}
            />
            <br />
            <label htmlFor='lat'>Latitude</label>
            <input
                type='number'
                id='lat'
                name='lat'
                value={center.lat}
                onChange={event =>
                    setCenter({ ...center, lat: Number(event.target.value) })
                }
            />
            <br />
            <label htmlFor='lng'>Longitude</label>
            <input
                type='number'
                id='lng'
                name='lng'
                value={center.lng}
                onChange={event =>
                    setCenter({ ...center, lng: Number(event.target.value) })
                }
            />
            <h3>
                {clicks.length === 0 ? "Click on map to add markers" : "Clicks"}
            </h3>
            {clicks.map((latLng, i) => (
                <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
            ))}
            <button onClick={() => setClicks([])}>Clear</button>
        </div>
    );

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Wrapper
                apiKey='AIzaSyDyDAT6yUSuV-SybyKyaLtgd-tfPHNJle0'
                render={render}
            >
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{ flexGrow: "1", height: "100%" }}
                >
                    {clicks.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                    ))}
                </Map>
            </Wrapper>
            {/* Basic form for controlling center and zoom of map. */}
            {form}
        </div>
    );
};
interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center: { lat: -34.397, lng: 150.644 },
                    zoom: 8,
                })
            );
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach(eventName =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    // @ts-ignore
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
};

const Marker: React.FC<google.maps.MarkerOptions> = options => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

const areMapsEqual: TypeEqualityComparator<google.maps.LatLng, undefined> = (
    a,
    b
) => {
    if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
    ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }
    return deepEqual(a, b);
};

const deepCompareEqualsForMaps = createCustomEqual(deepEqual => ({
    areMapsEqual,
}));

function useDeepCompareMemoize(value: any) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default MapApp;
