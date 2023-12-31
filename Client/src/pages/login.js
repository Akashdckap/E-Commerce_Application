
import React, { useEffect, useState } from 'react'
// import { useMutation } from '@apollo/client'

// import React, { StrictMode, useEffect, useState } from 'react'
import { ApolloError, useMutation } from '@apollo/client'

import { CREATE_ADMINS } from '../../Grahpql/mutation'
import { useRouter } from 'next/router';
import { notification } from 'antd';
import Link from 'next/link';
export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const router = useRouter()
    const validate = () => {
        let newErrors = { ...errors };
        let isVaild = true;

        if (formData.password.trim() === "" && formData.email.trim() === "") {
            newErrors.password = 'password is required';
            newErrors.email = 'Email is required';
            isVaild = false;
        }
        if (formData.email.length < 10 && formData.email.trim() !== "") {
            newErrors.email = 'Email must be at least 8 characters long';
            isVaild = false;
        }

        if (formData.password.length < 7 && formData.password.trim() !== "") {
            newErrors.password = 'Password must be at least 8 characters long';
            isVaild = false;
        }
        setErrors(newErrors);
        return isVaild;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        delete errors[name]
    };
    const [createAdmins, { data, loading, error }] = useMutation(CREATE_ADMINS)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                await (createAdmins({ variables: { input: formData } }))
            }
            catch (error) {
                if (error.message == "Successfully") {
                    notification.success({ description: "successfully logged" })
                    router.push("/adminStore")
                }
                else {
                    notification.error({ description: "Invalid Email" })
                    router.push("/login")
                }
            }
        }
    }

    return (
        <>
            <div className='flex justify-center items-center gap-7 mt-8'>
                <Link href={'/customerLogin'} className='border border-solid h-10 w-25 p-2 border-violet-400 text-violet-400 hover:bg-violet-50 rounded-md flex justify-center items-center' >Customer Login</Link>
                <Link href={'/customerRegister'} className='border border-solid h-10 w-25 p-2 border-indigo-400 text-indigo-400 hover:bg-indigo-50 rounded-md flex justify-center items-center'>Customer Register</Link>
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-1/2 m-auto mt-10 bg-blue-300 rounded-2xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && <p>Error: {error.message}</p>}
                    <form className="space-y-6" onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email} placeholder='Enter a email' onChange={handleChange}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.email && <span className="text-red-600">{errors.email}</span>}

                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={formData.password} placeholder='Enter a password' onChange={handleChange}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.password && <span className="text-red-600">{errors.password}</span>}
                        </div>
                        <div>
                            <button type="submit" className="flex justify-center w-1/2 m-auto rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Light it up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* </> */}
        </>
    )
}