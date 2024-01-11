import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS } from '../../../../Grahpql/queries';

export default function Myorders() {
    const router = useRouter();
    const { customerId } = router.query
    console.log("customerId---------", customerId);

    const { data, loading, error } = useQuery(GET_CUSTOMER_ORDERS, {
        variables: { userId: customerId }
    })
    console.log("customerOrders---------------", data);
    return (
        <div>
            <Link href={'/customerHome'} className="flex justify-start items-center gap-2 mx-32 mt-6">
                <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                <p className="cursor-pointer text-blue-500">Back to Home</p>
            </Link>
            <div className='flex justify-between items-center px-4 mx-28 py-5 '>
                <h1 className='text-amber-600 text-xl'>Your Orders (<span className='text-slate-600'>10</span>)</h1>
                <input type='text' placeholder='Search products...' className='h-10 bg-white border-solid border border-gray-300 text-gray-600 text-base font-normal rounded-md hover:border-gray-400 focus:border-gray-400 outline-0 ps-5' />
            </div>
            <div>
                <div className='flex justify-between items-start px-6 bg-white hover:shadow-sm hover:cursor-pointer border border-solid py-3 mx-32 rounded-md'>
                    <div className='flex justify-between gap-6'>
                        <div>
                            <img className="h-16 rounded-md object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                        </div>
                        <div className='grid'>
                            <h1 className='text-gray-900 '>Smart Watch</h1>
                            <p className='text-gray-400 font-light'>Color: White & gray</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-700'>₹1899</p>
                    </div>
                    <div className='grid justify-center gap-1'>
                        <p className='text-gray-700'>Delivered on Jul 04,2023</p>
                        <p className='text-green-700 font-light'>Your item has been delivered</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
