import React from "react";
import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaUserCircle,
    FaArrowDown,
    FaArrowUp,
} from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { Link, useLoaderData } from "react-router-dom";
import Map from "./Map";
import Navbar from "./Navbar";
import { EventClass } from "./types";
import axios from "axios";

const TitleBar = () => (
    <div className='flex items-center gap-4 w-full pt-5 pb-2 '>
        <Link to={"/events"}>
            <FaArrowLeft className='text-2xl' />
        </Link>
        <div className='text-3xl font-bold'>Event Info</div>
    </div>
);

const MapDiv = () => (
    <div className='h-[450px] w-full grid-center bg-slate-200  rounded-xl'>
        MAP
    </div>
);

const EventInfo: React.FC<{ event: EventClass }> = ({ event }) => {
    const [EventIntensity, setEventIntensity] = React.useState("High");

    return (
        <div className='bg-slate-100 rounded-[12px] p-5 w-full'>
            <div className='flex items-center gap-2'>
                <p className='text-xl font-bold'>
                    {/* Car Crash at toll booth #8 on NH-42 */}
                    {event.Title}
                </p>
                <div className='flex flex-row items-center gap-2'>
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
            </div>
            <div className='flex items-center py-1'>
                <RiMapPinLine className='ml-[-2px] mr-[2px]' />
                <p className='text-xs'>{1 + Math.random().toFixed(1)} km</p>
            </div>

            <p></p>
            <p className='py-3'>{event.EventDescription}</p>
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
    );
};

class Comment {
    userName: string = "";
    comment: string = "";
    upvotes: number = 0;
    downvotes: number = 0;
}

const EventComment: React.FC<{ data: Comment }> = ({ data }) => {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    return (
        <div className='flex items-center gap-3'>
            <FaUserCircle className='h-[60px] w-[60px] text-slate-600' />
            <div className='flex flex-col gap-1'>
                <p className='text-sm font-semibold text-slate-600'>
                    {`${data.userName} ${currentTime}`}
                </p>
                <p className='text-sm'>{data.comment}</p>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-1'>
                        <FaArrowUp className='text-green-600 text-sm' />
                        <p className='text-green-600 text-sm font-semibold'>
                            {data.upvotes}
                        </p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaArrowDown className='text-red-600 text-sm ' />
                        <p className='text-red-600 text-sm font-semibold'>
                            {data.downvotes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
const EventComments: React.FC = () => {
    return (
        <div className='bg-slate-100 rounded-[12px] p-5 w-full'>
            <p className='font-bold text-xl'>Comments</p>
            <div className='flex flex-col mt-5 gap-5'>
                <EventComment
                    data={{
                        userName: "Tanay Sharma",
                        comment:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, enim?",
                        upvotes: 112,
                        downvotes: 6,
                    }}
                />
                <EventComment
                    data={{
                        userName: "Vipul Bhardwaj",
                        comment:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, enim?",
                        upvotes: 22,
                        downvotes: 1,
                    }}
                />
                <EventComment
                    data={{
                        userName: "Gaurav",
                        comment:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, enim?",
                        upvotes: 44,
                        downvotes: 11,
                    }}
                />
                <EventComment
                    data={{
                        userName: "Tanay Sharma",
                        comment:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, enim?",
                        upvotes: 10,
                        downvotes: 0,
                    }}
                />
                <EventComment
                    data={{
                        userName: "Tanay Sharma",
                        comment:
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, enim?",
                        upvotes: 112,
                        downvotes: 6,
                    }}
                />
            </div>
        </div>
    );
};

const Event: React.FC = () => {
    const event = useLoaderData() as EventClass;
    return (
        <div className='h-screen w-[450px] sm:w-[600px] m-auto flex flex-col gap-5 items-center'>
            <Navbar />
            <TitleBar />
            <Map />
            <EventInfo event={event} />
            <EventComments />
        </div>
    );
};

export const GetEventByID = async ({ params }) => {
    const event = await axios
        .get(`${import.meta.env.VITE_FLASK_BACKEND}/event/${params.EventID}`)
        .then(res => res.data);
    return event;
};

export default Event;
