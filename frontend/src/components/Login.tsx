import React from "react";
import axios from "axios";
import Navbar from "./Navbar";

import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");

    return (
        <div className='flex flex-col items-center gap-2'>
            <Navbar />
            <div className='relative flex flex-col justify-center w-[65%] overflow-hidden'>
                <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40  ring-2 ring-blue-600 lg:max-w-xl'>
                    <h1 className='text-3xl font-semibold text-center text-blue-700 uppercase'>
                        Sign in
                    </h1>
                    <form className='mt-6'>
                        <div className='mb-2'>
                            <label
                                htmlFor='email'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setEmail(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='password'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Password
                            </label>
                            <input
                                type='password'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setPassword(e.currentTarget.value);
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
                                            }/login`,
                                            {
                                                email: Email,
                                                password: Password,
                                            },
                                            {
                                                headers: {
                                                    "X-Requested-With":
                                                        "XMLHttpRequest",
                                                },
                                            }
                                        )
                                        .then(res => {
                                            {
                                                console.log(res.data!);
                                                sessionStorage.setItem(
                                                    "auth-token",
                                                    res.data["auth-token"]!
                                                );
                                            }
                                        });
                                }}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className='mt-8 text-xs font-light text-center text-gray-700'>
                        Don't have an account?
                        <Link to={`/register`}>
                            <p className='font-medium text-blue-600 hover:underline'>
                                Register
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
