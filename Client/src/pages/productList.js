import React from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ALL_PRODUCTS } from '../../Grahpql/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
export default function users() {

    const { data: getDataError, error: getError, loading: getLoading } = useQuery(GET_ALL_PRODUCTS);
    useEffect(() => {
        // console.log(typeof getDataError);
    }, [getDataError])

    if (getLoading) {
        return <div>loading.......</div>
    }
    if (getError) {
        // return <div>error</div>
        console.log("getting data error-----------------------------", getError);
    }
    else {
        // console.log(getDataError);
    }

    const productList = getDataError.getAllProducts
    return (
        <div>
            <div className='flex justify-between item-center mt-10 pl-10 pr-20'>
                <h1>Product list</h1>
                <div className='flex justify-center gap-6 item-center'>
                    <input type='search' placeholder='Search product' className='border-none focus:border-teal-300 pl-5 mt-3 rounded' />
                    <div className='grid'>
                        <span className='relative left-4 top-2 text-yellow-500 text-lg font-semibold'>0</span>
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </div>
                </div>
            </div>
            <div className='z-0 flex w-full justify-between flex-wrap flex-row gap-30'>
                {
                    productList.map((item, index) =>
                        <div key={index} className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
                            <a>
                                <img className="h-60 rounded-t-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                            </a>
                            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                            <div className="mt-4 px-5 pb-5">
                                <div className="flex items-center gap-2">
                                    <label className='text-blue-400'>Name :</label>
                                    <h5 className='text-xl font-semibold tracking-tight text-slate-900'>{item.productName}</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className='text-blue-400'>Brand :</label>
                                    <span>{item.brand}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label className='text-blue-400'>Description </label>
                                    <span>{item.description}.....</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label className='text-blue-400'>Color : </label>
                                    <p>{item.color}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>
                                        <span className="text-3xl font-bold text-slate-900">₹{item.price}</span>
                                    </p>
                                    <a className="cursor-pointer flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to cart</a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
