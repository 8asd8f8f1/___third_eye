import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <div className='flex items-center justify-between w-full mt-6 mb-5'>
            <p className='text-4xl font-extrabold'>Third Eye</p>
            <div className='flex items-center font-semibold gap-5 sm:gap-16 lg:gap-32 xl:gap-40 xl:text-xl'>
                <Link to={`/`}>
                    <p>Home</p>
                </Link>
                <Link to={`/events`}>
                    <p>Events</p>
                </Link>
                <p>Logout</p>
            </div>
        </div>
    );
};

export default Navbar;
