import React from 'react'
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS } from '../../../../../Grahpql/queries';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
export default function ViewOrders() {
    const router = useRouter();
    const { orderId } = router.query
    const loginData = useSelector(state => state.productDetails.LoginData);
    const { data: customerOrders, loading: customerLoading, error: customerError } = useQuery(GET_CUSTOMER_ORDERS, {
        variables: { userId: loginData.customerId }
    });

    const orderedList = customerOrders && customerOrders.getCustomerOrders.find((orders) => orders._id === orderId)
    console.log("orderedProducts--------", orderedList && orderedList.orderedProducts);
    return (
        <>
            <div className='flex justify-between items-center px-4 mx-28 py-5 '>
                <h1 className='text-amber-600 text-xl'>Your Orders (<span className='text-slate-600'>{orderedList && orderedList.orderedProducts.length}</span>)</h1>
                <Link href={'/customerHome/myOrders'} className="flex justify-start items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                    <p className="cursor-pointer text-blue-500">Back to Orders</p>
                </Link>
            </div>
            <div className='grid gap-4'>
                {
                    orderedList && orderedList.orderedProducts.map((item, index) => (
                        <div key={index} className='flex justify-between items-start hover:shadow-lg px-6 bg-white hover:border-green-200 hover:cursor-pointer border border-solid py-3 mx-32 rounded-md'>
                            <div className='flex justify-between gap-6'>
                                <div>
                                    <img className="h-16 rounded-md object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                </div>
                                <div className='grid'>
                                    <h1 className='text-gray-900 '>{item.productName}</h1>
                                    <p className='text-gray-400 font-light'>Color: {item.color}</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-gray-700'>₹{item.expandedPrice}</p>
                            </div>
                            <div className='grid justify-center gap-1'>
                                <p className='text-gray-700'>Delivered on Jul 04,2023</p>
                                <p className='text-green-700 font-light'>Your item has been delivered</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
