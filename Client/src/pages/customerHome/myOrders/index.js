import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS, GET_GUEST_ORDERS, GET_PERSONAL_DETAILS_ORDER } from '../../../../Grahpql/queries';
import { useSelector } from 'react-redux';
export default function Myorders() {
    const router = useRouter();
    const loginData = useSelector(state => state.productDetails.LoginData);

    // console.log("loginData.customerId--------",);
    // if (loginData.customerId === undefined) {
    const { data: customerOrders, loading: customerLoading, error: customerError } = useQuery(GET_CUSTOMER_ORDERS, {
        variables: { userId: loginData?.customerId || '' },
        skip: !loginData.customerId,
    });
    const { data: guestOrders, loading, error } = useQuery(GET_GUEST_ORDERS)
    console.log("guest orders----", guestOrders);
    // }
    // else {


    // }

    const { data: customerPersonalDetails, loading: customerPersonalLoading, error: customerPersonalError } = useQuery(GET_PERSONAL_DETAILS_ORDER, {
        variables: { userId: loginData.customerId }
    });

    const calculateSI = (index) => {
        return (currentPage - 1) * pageSize + index + 1;
    };
    return (
        <div>

            <div className='flex items-center justify-between mx-16 my-5'>
                <h1 className='text-amber-600 text-xl'>Your Orders (<span className='text-slate-600'>{customerPersonalDetails && customerPersonalDetails.getCustomerPersonalDetails.length}</span>)</h1>
                <Link href={'/customerHome'} className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                    <p className="cursor-pointer text-blue-500">Back to Home</p>
                </Link>
            </div>
            <div className='mx-16 mt-4 bg-stone-100 rounded-md border border-solid mb-10 shadow-sm'>
                <table className="w-full rounded-md overflow-hidden border border-solid border-green-600">
                    <thead>
                        <tr className="bg-teal-100">
                            <th scope="col" className="text-center text-gray-700 py-3.5 px-7">S.No</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">Name</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">Email</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">PhoneNo</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">OrderTime</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">Status</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">View Product</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">Total Price</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {
                            customerPersonalDetails && customerPersonalDetails.getCustomerPersonalDetails.map((orders, index) => {
                                // console.log("orders---", orders);
                                return (
                                    <tr className="border hover:bg-white hover:rounded-t-full border-b-gray-300 transition-all duration-300 ease-in-out" key={index}>
                                        <td className="text-center text-gray-700 font-medium" role="cell">{index + 1}</td>
                                        <td className="text-center text-gray-700 font-medium py-3 px-10" role="cell">{orders.personalDetails.name}</td>
                                        <td className="text-center text-gray-700 font-medium px-10" role="cell">{orders.personalDetails.email}</td>
                                        <td className="text-center text-gray-700 font-medium px-10" role="cell">{orders.personalDetails.phoneNo}</td>
                                        <td className="text-center text-gray-700 font-medium" role="cell">{orders.orderTime}</td>
                                        <td className="text-center text-gray-700 font-medium px-10" role="cell">Delivered</td>
                                        <td className="text-center" role="cell"><Link href={`/customerHome/myOrders/viewOrders/${orders._id}`}><FontAwesomeIcon icon={faEye} className='text-base text-gray-700 cursor-pointer hover:text-teal-500' /></Link></td>
                                        <td className="text-center text-gray-700 font-medium px-10" role="cell">₹ {orders.totalPrice}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
