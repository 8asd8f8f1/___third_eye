import React from "react";
import { Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaUserCircle,
    FaArrowDown,
    FaArrowUp,
} from "react-icons/fa";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Navbar from "./Navbar";

import { EventClass } from "./types";

const queryClient = new QueryClient();

const Events: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <EventsComponent />
        </QueryClientProvider>
    );
};

// class Event {
//     Category: string = "";
//     Date_time: Date = new Date();
//     Downvote: number = 0;
//     EventDescription: string = "";
//     EventStatus: string = "";
//     Event_time: Date = new Date();
//     ID: number = 0;
//     Severity: string = "";
//     Title: string = "";
//     Upvote: number = 0;
//     UserID: number = 0;
//     UserName: string = "";
//     isVerified: number = 0;
// }

const EventComponent: React.FC<{ event: EventClass }> = ({ event }) => {
    return (
        <div className='flex flex-col border-[1px] border-gray-500 rounded-xl p-4 w-[50%]'>
            <div className='flex flex-row items-center'>
                <Link to={`/event/${event.ID}`}>
                    <p className='text-xl font-bold'>{event.Title}</p>
                </Link>
            </div>
            <div className='flex flex-row items-center mb-3 gap-2'>
                <p
                    className={`${
                        event.Severity === "High"
                            ? "bg-red-500"
                            : event.Severity === "Med"
                            ? "bg-orange-500"
                            : "bg-yellow-400"
                    } text-white grid-center p-1 rounded-[6px] text-xs font-bold capitalize`}
                >
                    {event.Severity}
                </p>
                <p className='text-xs font-semibold text-white bg-blue-700 px-3 py-1 rounded-full'>
                    {event.Category}
                </p>
            </div>
            <p className='text-sm'>{event.EventDescription}</p>
            <div className='flex items-center mt-2'>
                <p className='text-sm font-semibold text-gray-500'>
                    {`${event.UserName} on ${new Date(
                        event.Date_time
                    ).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                    })}`}
                </p>
            </div>
            <div className='flex items-center gap-3 mt-2'>
                <div className='flex items-center gap-1'>
                    <FaArrowUp className='text-green-600 text-sm' />
                    <p className='text-green-600 text-sm font-semibold'>
                        {event.Upvote}
                    </p>
                </div>
                <div className='flex items-center gap-1'>
                    <FaArrowDown className='text-red-600 text-sm ' />
                    <p className='text-red-600 text-sm font-semibold'>
                        {event.Downvote}
                    </p>
                </div>
            </div>
        </div>
    );
};

const EventsComponent: React.FC = () => {
    const queryClient = useQueryClient();

    const eventsQuery = useQuery({
        queryKey: ["EventsList"],
        queryFn: () =>
            axios
                .get(`${import.meta.env.VITE_FLASK_BACKEND}/events`)
                .then(res => res.data),
    });

    return (
        <div className='m-auto flex flex-col gap-5 w-[400px] sm:w-[500px] lg:w-[80%] xl:w-[60%] items-center'>
            <Navbar />
            {eventsQuery.isError
                ? "Error!!!"
                : eventsQuery.isLoading
                ? "Loading..."
                : eventsQuery.data.map((e, idx) => (
                      <EventComponent key={idx} event={e} />
                  ))}
        </div>
    );
};

export default Events;
