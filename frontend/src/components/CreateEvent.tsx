import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { LocationClass } from "./types";
import { GetCurrentLocation } from "./Map";

const CreateEvent: React.FC = () => {
    const [Title, setTitle] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [Category, setCategory] = React.useState("");
    const [Severity, setSeverity] = React.useState("");
    const [EventTime, setEventTime] = React.useState(
        new Date().toLocaleDateString("en-IN")
    );
    const [Location, setLocation] = React.useState<LocationClass>(
        GetCurrentLocation()
    );

    return (
        <div className='flex flex-col items-center'>
            <Navbar />
            <div className='relative flex flex-col justify-center gap-1 w-[500px] overflow-hidden'>
                <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40  ring-2 ring-blue-600 lg:max-w-xl'>
                    <h1 className='text-3xl font-semibold text-center  capitalize hover:cursor-default'>
                        Create Event
                    </h1>
                    <form className='mt-6'>
                        <div className='mb-2'>
                            <label
                                htmlFor='title'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Title
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setTitle(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='email'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Description
                            </label>
                            <textarea
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                    e.preventDefault();
                                    setDescription(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='category'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Category
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setCategory(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='severity'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Severity
                            </label>
                            <input
                                type='tel'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setSeverity(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='houseno'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Event Date Time
                            </label>
                            <input
                                type='datetime-local'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setEventTime(e.target.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='street'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Location
                            </label>
                            <input
                                type='text'
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                value={JSON.stringify(Location)}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    const currentloc = GetCurrentLocation();
                                    setLocation(currentloc);
                                }}
                            />
                        </div>
                        <div className='mt-6'>
                            <button
                                className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                                onClick={e => {
                                    e.preventDefault();
                                    axios
                                        .post(
                                            `${
                                                import.meta.env
                                                    .VITE_FLASK_BACKEND
                                            }/addevent`,
                                            {
                                                title: Title,
                                                desc: Description,
                                                category: Category,
                                                severity: Severity,
                                                etime: EventTime,
                                                lat: Location.lat,
                                                lng: Location.lng,
                                            }
                                        )
                                        .then(res => {
                                            {
                                                console.log(res.data);
                                            }
                                        });
                                }}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
