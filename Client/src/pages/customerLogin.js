import Link from 'next/link'
import React from 'react'

export default function customerLogin() {
    return (
        <div>
            <div className='flex justify-center items-center border shadow-lg border-solid border-violet-300 my-10 bg-gray-100 w-auto py-14 mx-80 rounded-md'>
                <form>
                    <div className='grid justify-center gap-3'>
                        <div className='grid justify-center items-center gap-2'>
                            <h2 className='text-indigo-400 text-lg font-normal'>Login Form</h2>
                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label>Name</label>
                            <input placeholder='Enter the name' />
                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label>Email</label>
                            <input placeholder='Enter the name' />
                        </div>
                        <div className='flex gap-3 justify-start items-center pt-3'>
                            <button>Login</button>
                            <div>
                                <span>Don't have account ?</span> <Link href={'/customerRegister'}>Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
