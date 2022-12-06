import React from "react";

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

const queryClient = new QueryClient();

const Events: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <EventsComponent />
        </QueryClientProvider>
    );
};

class Event {
    Category: string = "";
    Date_time: Date = new Date();
    Downvote: number = 0;
    EventDescription: string = "";
    EventStatus: string = "";
    Event_time: Date = new Date();
    ID: number = 0;
    Severity: string = "";
    Title: string = "";
    Upvote: number = 0;
    UserID: number = 0;
    UserName: string = "";
    isVerified: number = 0;
}

const EventComponent: React.FC<{ event: Event }> = ({ event }) => {
    return (
        <div className='flex flex-col m-5'>
            <p className='text-xl font-bold mb-2'>{event.Title}</p>
            <p className='text-sm'>{event.EventDescription}</p>
            <p className='text-sm'>
                {`${new Intl.DateTimeFormat("en-US").format(
                    new Date(event.Date_time)
                )}`}
            </p>
            <p className='text-sm font-semibold'>{event.UserName}</p>
            <div className='flex items-center gap-3'>
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
                .then(res => res.data as [Event]),
    });

    return (
        <div>
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
