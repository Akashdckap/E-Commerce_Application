import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOutCustomer } from '@/Reducer/productReducer';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart, faUser, faSignOutAlt, faSignOut, faShoppingBag, faArrowLeft, faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
export default function index() {
    const dispatch = useDispatch();
    const [openProfile, setOpenProfile] = useState(false)
    const router = useRouter();
    const loginData = useSelector(state => state.productDetails.LoginData);
    const logOutUser = () => {
        dispatch(logOutCustomer());
        router.push('/customerLogin')
        notification.success({ message: "User logged out successfully  " })
    }
    return (
        <>
            <div>
                <div>
                    <div className='flex justify-between p-10'>
                        <h1>Welcome to our site <span className='text-sky-400'>{loginData.name}</span></h1>
                        <div className='flex justify-between items-center gap-10'>
                            <input type='text' placeholder='Search products' className='h-10 bg-gray-50 border-solid border border-gray-300 text-gray-600 text-sm rounded-lg hover:border-gray-500 focus:border-gray-500 outline-0 ps-5' />
                            <div className='relative bottom-3'>
                                <p className='relative left-4 top-1 text-white bg-yellow-600 text-base font-medium rounded-full h-6 w-6 flex justify-center items-center'>2</p>
                                <FontAwesomeIcon icon={faShoppingCart} className='text-gray-700 hover:text-gray-600 text-2xl cursor-pointer' />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faUserCircle} className='text-3xl text-gray-500 hover:cursor-pointer ' onClick={() => !openProfile ? setOpenProfile(true) : setOpenProfile(false)} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: openProfile ? 'block' : 'none' }}>
                        <div className='grid justify-center items-center gap-3 bg-gray-200 absolute top-24 right-5 py-3 pl-10 w-56 rounded-sm shadow-md' >
                            <div className='flex justify-start items-center gap-5 mr-10 bg-white p-2 w-44 pl-4 rounded-md'>
                                <Image src={"/Images/Balaprofile.png"} alt="Profile Image" width="40" height="40" className='rounded-full' />
                                <div>
                                    <span className='text-gray-900'>Hello,</span>
                                    <h1 className='text-gray-600'>{loginData.name}</h1>
                                </div>
                            </div>
                            <div className='flex justify-around items-center w-44 bg-white p-2 rounded-md hover:cursor-pointer'>
                                <FontAwesomeIcon icon={faShoppingBag} className='text-emerald-400' />
                                <span className="text-emerald-400">My Orders</span>
                                <FontAwesomeIcon icon={faGreaterThan} className='text-emerald-400 font-mono' />
                            </div>
                            <div onClick={logOutUser} className='border cursor-pointer border-solid  flex justify-between w-44 items-center px-4 py-1 text-red-400 hover:text-white hover:bg-red-400 border-red-400 rounded-md'>
                                <FontAwesomeIcon icon={faSignOut} />
                                <span>LogOut</span>
                            </div>
                            <button className=''></button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
