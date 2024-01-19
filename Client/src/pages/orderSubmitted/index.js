import { faCheckCircle, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function OrderSubmitted() {
    return (
        <>
            <div className={`bg-white p-10 mt-32 grid gap-5 mx-auto rounded shadow-lg w-full md:w-1/2 lg:w-1/3 border-green-300 border border-solid`}>
                <div className='flex justify-center items-center gap-4'>
                    <FontAwesomeIcon className='text-green-400 text-7xl' icon={faCheckCircle} />
                </div>
                <h1 className="text-3xl text-center text-green-500 font-medium">Order Confirmed !</h1>
                <div className='text-center'>
                    <p className="text-gray-600">Thank you for your order! We have received your order and will process it shortly.</p>
                </div>
                <div className="text-center">
                    <Link href={'/customerHome/myOrders'} className='text-orange-400'>View All Orders
                        <FontAwesomeIcon icon={faSquareArrowUpRight} className='pl-2' />
                    </Link>
                </div>
            </div>
        </>
    )
}
