import { useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import { GET_REGISTER_CUSTOMER } from '../../Grahpql/queries'
import { LOGIN_CUSTOMER } from '../../Grahpql/mutation'
export default function customerLogin() {
    const { data, loading, error } = useQuery(GET_REGISTER_CUSTOMER);
    // const [customerLogin { data, error }] = useMutation(LOGIN_CUSTOMER);
    console.log("data--------", data);
    return (
        <div>
            <div className='flex justify-center items-center border shadow-lg border-solid border-violet-300 my-10 bg-gray-100 w-auto py-14 mx-80 rounded-md'>
                <form>
                    <div className='grid justify-center gap-3'>
                        <div className='grid justify-center items-center gap-2'>
                            <h2 className='text-indigo-400 text-lg font-normal'>Login Form</h2>
                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Name</label>
                            <input placeholder='Enter the name' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Email</label>
                            <input placeholder='Enter the name' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                        </div>
                        <div className='flex gap-3 justify-start items-center pt-3'>
                            <button type='submit' className='border border-solid h-10 w-24 border-violet-400 hover:bg-violet-400 hover:text-white text-violet-400 flex justify-center items-center rounded-md'>Login</button>
                            <div>
                                <span className='text-gray-500'>Don't have account ?</span> <Link href={'/customerRegister'} className='text-indigo-500'>Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
