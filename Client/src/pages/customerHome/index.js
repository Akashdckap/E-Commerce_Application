import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOutCustomer } from '@/Reducer/productReducer';
import { useRouter } from 'next/router';
import { notification } from 'antd';
export default function index() {
    const dispatch = useDispatch();
    const router = useRouter();
    const loginData = useSelector(state => state.productDetails.LoginData);
    console.log("loginData----------------------", loginData.name);
    const logOutUser = () => {
        dispatch(logOutCustomer());
        router.push('/customerLogin')
        notification.success({ message: "User logged out successfully  " })
    }
    return (
        <div className='flex justify-between p-10'>
            <h1>Welcome to our site <span className='text-sky-400'>{loginData.name}</span></h1>
            <button className='border border-solid border-emerald-400 flex justify-center items-center px-2 py-1 text-emerald-400 hover:text-red-400 hover:border-red-400 rounded-md' onClick={logOutUser}>LogOut</button>
        </div>
    )
}
