import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOutCustomer } from '@/Reducer/productReducer';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
export default function index() {
    const dispatch = useDispatch();
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
                        <div className='flex justify-between items-center gap-6'>
                            <input type='search' placeholder='Search products' />
                            <div className=''>
                                <p className='relative left-4 top-1 text-white bg-yellow-600 text-base font-medium rounded-full h-6 w-6 flex justify-center items-center'>2</p>
                                <FontAwesomeIcon icon={faShoppingCart} className='text-gray-700 hover:text-gray-600 text-2xl cursor-pointer' />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faUserCircle} size='2x' />
                            </div>
                        </div>
                    </div>
                    <button className='border border-solid border-emerald-400 flex justify-center items-center px-2 py-1 text-emerald-400 hover:text-red-400 hover:border-red-400 rounded-md' onClick={logOutUser}>LogOut</button>
                </div>
            </div>
        </>

    )
}
