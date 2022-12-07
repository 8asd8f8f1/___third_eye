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
import { Link } from "react-router-dom";
import Map from "./Map";

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

const EventInfo: React.FC = () => {
    const [EventIntensity, setEventIntensity] = React.useState("High");

    return (
        <div className='bg-slate-100 rounded-[12px] p-5 w-full'>
            <div className='flex items-center gap-2'>
                <p className='text-xl font-bold'>
                    Car Crash at toll booth #8 on NH-42
                </p>
                <p
                    className={`text-xs px-1 h-5 grid-center  capitalize rounded-[5px] text-white font-bold ${
                        EventIntensity === "High"
                            ? "bg-red-500"
                            : EventIntensity === "Medium"
                            ? "bg-orange-400"
                            : "bg-yellow-400"
                    }`}
                >
                    {EventIntensity}
                </p>
            </div>
            <div className='flex items-center py-1'>
                <RiMapPinLine className='ml-[-2px] mr-[2px]' />
                <p className='text-xs'>10.7 km</p>
            </div>

            <p></p>
            <p className='py-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                explicabo consectetur ipsam sunt, omnis praesentium suscipit
                nulla minima illo similique harum, vitae laborum error
                distinctio officia nemo, facere recusandae quod. Quidem ratione
                odio optio dolorum, mollitia dolorem temporibus ut repellendus!
            </p>
            <p className='text-sm font-semibold text-slate-600 mt-2'>
                Ashish Singh
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
    return (
        <div className='h-screen w-[450px] sm:w-[600px] m-auto flex flex-col gap-5 items-center'>
            <TitleBar />
            <Map />
            <EventInfo />
            <EventComments />
        </div>
    );
};

export default Event;
