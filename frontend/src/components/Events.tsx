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

import { EventClass, Helper } from "./types";

const queryClient = new QueryClient();

const Events: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EventsComponent />
    </QueryClientProvider>
  );
};

const EventSeverity: React.FC<{ severity: string }> = ({ severity }) => {
  let severityStyle: string;
  switch (severity) {
    case "Low":
      severityStyle = "text-yellow-600";
      break;
    case "Med":
      severityStyle = "text-orange-500";
      break;
    default:
      severityStyle = "text-red-500";
      break;
  }

  return (
    <p
      className={`${severityStyle} drop-shadow-xl text-white grid-center rounded-[6px] text-xs font-bold capitalize`}
    >
      {severity} Severity
    </p>
  );
};

const EventCategory: React.FC<{ category: string }> = ({ category }) => {
  return (
    <p className="text-xs font-semibold text-blue-900 border-blue-900 border-[1px] px-2 rounded-full">
      {category}
    </p>
  );
};

const EventUserTS: React.FC<{ username: string; datetime: Date }> = ({
  username,
  datetime,
}) => {
  const locale = "en-IN";
  const formatOBJ: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  const datetimeFormatted = new Date(datetime).toLocaleString(
    locale,
    formatOBJ
  );

  return (
    <div className="flex items-center mt-2">
      <p className="text-sm font-semibold text-gray-500">
        {`${username} on ${datetime}`}
      </p>
    </div>
  );
};

const EventComponent: React.FC<{ event: EventClass }> = ({ event }) => {
  return (
    <div className="flex flex-col border-[1px] bg-blue-300 border-gray-500 rounded-2xl shadow-xl p-4 w-[50%]">
      <div className="flex flex-row items-center">
        <Link to={`/event/${event.ID}`}>
          <p className="text-xl font-bold">{event.Title}</p>
        </Link>
      </div>
      <div className="flex flex-row gap-3 items-start mb-3 ">
        <EventCategory category={event.Category} />
        <EventSeverity severity={event.Severity} />
      </div>
      {/* <p className='text-sm text-ellipsis overflow-x-hidden overflow-y-hidden min-h-[30px] max-h-[80px] align-top'>
                {event.EventDescription.slice(0, 100)}...
            </p> */}
      <EventUserTS username={event.UserName} datetime={event.Date_time} />
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <FaArrowUp className="text-green-600 text-sm" />
          <p className="text-green-600 text-sm font-semibold">{event.Upvote}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaArrowDown className="text-red-600 text-sm " />
          <p className="text-red-600 text-sm font-semibold">{event.Downvote}</p>
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
        .then((res) => res.data as [EventClass]),
  });

  return (
    <div className="m-auto flex flex-col gap-5 w-[400px] sm:w-[500px] lg:w-[80%] xl:w-[60%] items-center">
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
