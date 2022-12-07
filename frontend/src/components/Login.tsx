import React from "react";
import axios from "axios";

const Login: React.FC = () => {
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");

    return (
        <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
            <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl'>
                <h1 className='text-3xl font-semibold text-center text-purple-700 uppercase'>
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
                            className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
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
                            className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
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
                            className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'
                            onClick={e => {
                                e.preventDefault();
                                axios
                                    .post(
                                        `${
                                            import.meta.env.VITE_FLASK_BACKEND
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
                                            console.log(res.data.message!);
                                            setTimeout(() => {}, 5000);
                                        }
                                    });
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className='mt-8 text-xs font-light text-center text-gray-700'>
                    Don't have an account?
                    <a
                        href='#'
                        className='font-medium text-purple-600 hover:underline'
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
