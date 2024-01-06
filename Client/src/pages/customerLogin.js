import { useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import React, { useState } from 'react'
import { GET_REGISTER_CUSTOMER } from '../../Grahpql/queries'

import { LOGIN_CUSTOMER } from '../../Grahpql/mutation';
import { customerLoginData } from '@/Reducer/productReducer';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import Jwt from 'jsonwebtoken';
export default function customerLogin() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        password: "",
        email: "",
    });
    const [loginError, setLoginError] = useState({
        password: "",
        email: "",
    });
    const validateLoginForm = () => {
        let newErrors = { ...loginError };
        let isVaild = true;
        if (loginForm.password.trim() === "") {
            newErrors.password = 'password is required';
            isVaild = false;
        }
        if (loginForm.email.trim() === "") {
            newErrors.email = 'Email is required';
            isVaild = false;
        }
        setLoginError(newErrors);
        return isVaild;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
        delete loginError[name]
    };
    const [customerLogin] = useMutation(LOGIN_CUSTOMER);
    const handleLoginCustomer = async (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            console.log("success");
            try {
                const { data, errors } = await customerLogin({ variables: { loginInput: loginForm } });
                const { token } = data.customerLogin;
                const { name, customerId } = Jwt.decode(token)
                dispatch(customerLoginData({ name, customerId, token }));
                notification.success({ message: "User successfully logged" })
                router.push('/customerHome')
            }
            catch (error) {
                notification.error({ message: error.message })
                console.error(error.message);
            }
        }
        else {
            router.push('/customerLogin')
        }
    }
    return (
        <div>
            <div className='flex justify-center items-center border shadow-lg border-solid border-violet-300 my-10 bg-gray-100 w-auto py-14 mx-80 rounded-md'>
                <form onSubmit={handleLoginCustomer}>
                    <div className='grid justify-center gap-3'>
                        <div className='grid justify-center items-center gap-2'>
                            <h2 className='text-indigo-400 text-lg font-normal'>Login Form</h2>
                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Email</label>
                            <input placeholder='Enter the name' onChange={handleChange} value={loginForm.email} name='email' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                            {loginError.email && <span className="text-red-400">{loginError.email}</span>}
                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Password</label>
                            <input placeholder='Enter the password' onChange={handleChange} value={loginForm.password} name='password' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                            {loginError.password && <span className="text-red-400">{loginError.password}</span>}
                        </div>
                        <div className='flex gap-3 justify-start items-center pt-3'>
                            <button type='submit' className='border border-solid h-10 w-24 border-violet-400 hover:bg-violet-400 hover:text-white text-violet-400 flex justify-center items-center rounded-md'>Login</button>
                            <div>
                                <span className='text-gray-500'>Don't have any account ?</span> <Link href={'/customerRegister'} className='text-indigo-500'>Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
