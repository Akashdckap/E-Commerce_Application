import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
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


    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    // const { data: customerOrders, loading: customerLoading, error: customerError } = useQuery(GET_CUSTOMER_ORDERS, {
    //     variables: { userId: loginData.customerId }
    // });
    // console.log(currentPage,"-----currentPage")
    const { data: customerPersonalDetails, loading: customerPersonalLoading, error: customerPersonalError } = useQuery(GET_PERSONAL_DETAILS_ORDER, {
        variables: { userId: loginData.customerId, page: currentPage, pageSize: pageSize }
    });

    const { data: orderCount, loading: orderLoading, error: orderError } = useQuery(ORDER_COUNT)
    // console.log(orderCount.getOrderCount)

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    // console.log(customerPersonalDetails.getCustomerPersonalDetails.length, "customerPersonalDetails")
    const calculateSI = (index) => {
        return (currentPage - 1) * pageSize + index + 1;
    };
    // console.log(isDataValid)
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, orderCount && orderCount.getOrderCount)
    const totalPages = Math.ceil(orderCount && orderCount.getOrderCount / pageSize)
    return (
        <div>

            <div className='flex items-center justify-between mx-16 my-5'>
                <h1 className='text-amber-600 text-xl'>Your Orders</h1>
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
                                        <td className="text-center text-gray-700 font-medium" role="cell">{calculateSI(index)}</td>
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
            <div className='flex justify-between pr-4 items-center pb-2'>
                <div>
                    <p className='pl-16 text-gray-700 '>Showing {startItem} to {endItem} of {orderCount && orderCount.getOrderCount} results</p>
                </div>
                <div className='flex justify-between items-center gap-8'>
                    <div className="border border-solid border-teal-600 rounded-md flex justify-between items-center h-9 w-32 gap-3 p-2">
                        <p className="text-gray-800">Show :</p>
                        <select className="pl-3 outline-0 bg-transparent" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                    <div className='flex gap-4 items-center mx-16 justify-end'>
                        <button className='border px-1 border-gray-400 rounded-md w-8 hover:bg-teal-100'><FontAwesomeIcon icon={faLessThan} onClick={prevPage} disabled={currentPage === 1} style={{ cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }} /></button>
                        <span className='bg-teal-200 border border-teal-500 hover:bg-teal-100 font-bold py-1 px-3.5 rounded-full'>{currentPage}</span>
                        <button className={`border px-1 border-gray-400 rounded-md w-8 hover:bg-teal-100 `}><FontAwesomeIcon icon={faGreaterThan} onClick={nextPage} disabled={currentPage === totalPages} style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }} /></button>
                    </div>
                </div>
            </div>
        </div >
    )
}
