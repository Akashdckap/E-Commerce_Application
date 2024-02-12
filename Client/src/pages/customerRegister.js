import Link from 'next/link'
import React, { useState } from 'react'
import { CUSTOMER_REGISTER } from '../../Grahpql/mutation';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
// import { notification } from 'antd';
import { useRouter } from 'next/router';


export default function customerRegister() {
    const router = useRouter();
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        phoneNo: '',
        password: '',
    });
    const [registerError, setRegisterError] = useState({
        name: '',
        email: '',
        phoneNo: '',
        password: '',
    });

    const validateRegisterForm = () => {
        let newErrors = { ...registerError };
        let isVaild = true;
        if (registerForm.name.trim() === "") {
            newErrors.name = 'Name is required';
            isVaild = false;
        }
        if (registerForm.email.trim() === "") {
            newErrors.email = 'Email is required';
            isVaild = false;
        }

        if (registerForm.password.trim() === "") {
            newErrors.password = 'password is required';
            isVaild = false;
        }
        if (registerForm.phoneNo.trim() === "") {
            newErrors.phoneNo = 'Contact is required';
            isVaild = false;
        }
        if (registerForm.email.length < 10 && registerForm.email.trim() !== "") {
            newErrors.email = 'Email must be at least 8 characters long';
            isVaild = false;
        }
        if (registerForm.phoneNo.length < 9 && registerForm.phoneNo.trim() !== "") {
            newErrors.phoneNo = "Contact number should be above 10 numbers"
            isVaild = false
        }
        if (registerForm.password.length < 7 && registerForm.password.trim() !== "") {
            newErrors.password = 'Password must be at least 8 characters long';
            isVaild = false;
        }
        setRegisterError(newErrors);
        return isVaild;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({
            ...registerForm,
            [name]: value,
        });
        delete registerError[name]
    };
    const [registerCustomer] = useMutation(CUSTOMER_REGISTER)
    const handleRegisterForm = async (e) => {
        e.preventDefault()
        if (validateRegisterForm()) {
            try {
                await (registerCustomer({ variables: { customerInput: registerForm } }));
                toast.success("Registered successfully", {
                    position: 'top-center',
                    autoClose: 3000,
                })
                router.push('/customerLogin')
            }
            catch (error) {
                toast.error(error.message, {
                    position: 'top-center',
                    autoClose: 3000,
                });
                router.push('/customerRegister')
            }
        }
        else {
            console.log("error");
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center border shadow-lg border-solid border-violet-300 my-10 bg-gray-100 w-auto py-14 mx-80 rounded-md'>
                <form onSubmit={handleRegisterForm}>
                    <div className='grid justify-center gap-3'>
                        <div className='grid justify-center items-center gap-2'>
                            <h2 className='text-indigo-400 text-lg font-normal'>Register Here</h2>
                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Name</label>
                            <input onChange={handleChange} value={registerForm.name} name='name' placeholder='Enter the name' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                            {registerError.name && <span className="text-red-400">{registerError.name}</span>}

                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Email</label>
                            <input onChange={handleChange} value={registerForm.email} name='email' placeholder='Enter the email' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                            {registerError.email && <span className="text-red-400">{registerError.email}</span>}

                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Phone Number</label>
                            <input onChange={handleChange} value={registerForm.phoneNo} name='phoneNo' type='password' placeholder='Enter the contact' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                            {registerError.phoneNo && <span className="text-red-400">{registerError.phoneNo}</span>}

                        </div>
                        <div className='grid justify-start items-center gap-1'>
                            <label className='text-violet-400'>Password</label>
                            <input onChange={handleChange} value={registerForm.password} name='password' placeholder='Enter the password' className='border border-solid border-gray-400 h-10 w-72 pl-3 rounded-md hover:border-violet-400 focus:border-violet-400 outline-none text-gray-500' />
                            {registerError.password && <span className="text-red-400">{registerError.password}</span>}

                        </div>
                        <div className='flex gap-3 justify-start items-center pt-3'>
                            <button type='submit' className='border border-solid h-10 w-24 border-violet-400 hover:bg-violet-400 hover:text-white text-violet-400 flex justify-center items-center rounded-md'>Register</button>
                            <div className='flex items-center gap-2'>
                                <span className='text-gray-500'>Already have an account ?</span><Link href={'/customerLogin'} className='text-indigo-500'>Login</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
