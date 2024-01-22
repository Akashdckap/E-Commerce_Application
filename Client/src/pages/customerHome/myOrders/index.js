import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS } from '../../../../Grahpql/queries';
import { useSelector } from 'react-redux';
export default function Myorders() {
    const loginData = useSelector(state => state.productDetails.LoginData);
    const { data: customerOrders, loading: customerLoading, error: customerError, refetch: refetchCustomerOrders } = useQuery(GET_CUSTOMER_ORDERS, {
        variables: { userId: loginData.customerId }
    });

    const calculateSI = (index) => {
        return (currentPage - 1) * pageSize + index + 1;
    };
    useEffect(() => {
        if (customerOrders) {
            refetchCustomerOrders()
        }
    }, [customerOrders]);

    return (
        <div>
            <Link href={'/customerHome'} className="flex justify-start items-center gap-2 mx-32 mt-6">
                <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                <p className="cursor-pointer text-blue-500">Back to Home</p>
            </Link>
            <div className='flex justify-between items-center px-4 mx-28 py-5 '>
                <h1 className='text-amber-600 text-xl'>Your All Orders (<span className='text-slate-600'>{customerOrders && customerOrders.getCustomerOrders.length}</span>)</h1>
                <input type='text' placeholder='Search products...' className='h-10 bg-white border-solid border border-gray-300 text-gray-600 text-base font-normal rounded-md hover:border-gray-400 focus:border-gray-400 outline-0 ps-5' />
            </div>

            <div className='mx-32  mt-4 bg-stone-100 rounded-md border border-solid mb-10 shadow-sm'>
                <table className="w-full rounded-md overflow-hidden border border-solid border-green-600">
                    <thead>
                        <tr className="bg-teal-100">
                            <th scope="col" className="text-center text-gray-700 py-3.5 px-7">S.No</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5" colSpan="3">Product Details</th>
                            <th scope="col" className="text-center text-gray-700 py-3.5">View Orders</th>
                            <th scope="col" className="text-center text-gray-700 px-7">Total price</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            customerOrders && customerOrders.getCustomerOrders.map((orders, index) =>
                            (
                                <tr className="border hover:bg-white hover:rounded-t-full border-b-gray-300 transition-all duration-300 ease-in-out" key={index}>
                                    <td className="text-center text-gray-700 font-medium " role="cell">{index + 1}</td>
                                    <td className="text-center py-3.5 px-10 text-gray-700 font-medium" role="cell" colSpan="3">
                                        {
                                            orders.orderedProducts.map((orderProducts, innerIndex) => (
                                                <>
                                                    <tr className="border-0" key={innerIndex}>
                                                        <td className="text-center text-gray-700 font-medium py-2 px-20" role="cell">{orderProducts.quantity}</td>
                                                        <td className="text-center text-gray-700 font-medium py-2 px-20" role="cell">{orderProducts.productName}</td>
                                                        <td className="text-center text-gray-700 font-medium py-2 px-16" role="cell">₹ {orderProducts.expandedPrice}</td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </td>
                                    <td className="text-center text-gray-700 font-medium hover:cursor-pointer" role="cell"><Link href={`/customerHome/myOrders/viewOrders/${orders._id}`}><FontAwesomeIcon icon={faEye} className='hover:text-teal-400' /></Link></td>
                                    <td className="text-center text-gray-700 font-medium" role="cell">₹ {orders.totalPrice}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
