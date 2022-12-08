import React from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const [Email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [User, setUser] = React.useState("");
    const [Phone, setPhone] = React.useState("");
    const [HouseNo, setHouseNo] = React.useState("");
    const [Street, setStreet] = React.useState("");
    const [City, setCity] = React.useState("");
    const [State, setState] = React.useState("");
    const [District, setDistrict] = React.useState("");
    const [Pincode, setPincode] = React.useState("");

    return (
        <div className='flex flex-col items-center'>
            <Navbar />
            <div className='relative flex flex-col justify-center gap-1 w-[500px] overflow-hidden'>
                <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40  ring-2 ring-blue-600 lg:max-w-xl'>
                    <h1 className='text-3xl font-semibold text-center text-blue-700 uppercase hover:cursor-default'>
                        Register
                    </h1>
                    <form className='mt-6'>
                        <div className='mb-2'>
                            <label
                                htmlFor='username'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                User Name
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setUser(e.currentTarget.value);
                                }}
                            />
                        </div>
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
                        <div className='mb-2'>
                            <label
                                htmlFor='phone'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Phone
                            </label>
                            <input
                                type='tel'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setPhone(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='houseno'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                House No
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setHouseNo(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='street'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Street
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setStreet(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='pincode'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                Pincode
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setPincode(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='city'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                City
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setCity(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='district'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                District
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setDistrict(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label
                                htmlFor='state'
                                className='block text-sm font-semibold text-gray-800'
                            >
                                State
                            </label>
                            <input
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    e.preventDefault();
                                    setState(e.currentTarget.value);
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
                                            }/register`,
                                            {
                                                email: Email,
                                                password: Password,
                                                username: User,
                                                phone: Phone,
                                                houseno: HouseNo,
                                                street: Street,
                                                city: City,
                                                state: State,
                                                district: District,
                                                pincode: Pincode,
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
                    <p className='mt-8 text-xs font-light text-center text-gray-700'>
                        Already have an account?
                        <Link to={`/login`}>
                            <p className='font-medium text-blue-600 hover:underline'>
                                Login
                            </p>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
