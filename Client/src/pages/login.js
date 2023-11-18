import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../Grahpql/mutation'
export default function login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER)
    // console.log(data);
    // console.log(error);

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser({ variables: { name: name, email: email, password: password } })
        console.log(name);
        console.log(email);
        console.log(password);
    }
    // useEffect(() => {
    //     console.log(name);
    //     console.log(email);
    //     console.log(password);
    // }, [])

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const { data } = await (createUser({ variables: { name: name, email: email, password: password } }))
    //         // console.log("user created", data.createUser);
    //     }
    //     catch (error) {
    //         console.error('Error creating users:', error);
    //         console.error('GraphQL Error Details:', error.message, error.graphQLErrors, error.networkError);
    //     }
    // }


    return (
        <>
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
                    <form className="space-y-6" onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name} placeholder='Enter a name' onChange={(e) => setName(e.target.value)}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
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
                                    required
                                    value={email} placeholder='Enter a email' onChange={(e) => setEmail(e.target.value)}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
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
                                    required
                                    value={password} placeholder='Enter a password' onChange={(e) => setPassword(e.target.value)}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex justify-center w-1/2 m-auto rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Light it up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
