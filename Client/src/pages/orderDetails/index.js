import React, { useEffect, useState } from "react";
import { ALL_ORDERED_PRODUCTS } from "../../../Grahpql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function OrderDetails() {
    const { data: orderedProducts, loading: dataLoading, error: dataError } = useQuery(ALL_ORDERED_PRODUCTS)
    return (
        <>

            <div>
                <div className="py-10 px-16">
                    <h1 className="text-start pl-4 text-2xl text-orange-400">Order Details</h1>
                    <div className="border-0 border-solid border-gray-400 mx-4 mt-4 bg-white rounded-lg">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-300">
                                    <th scope="col" className="text-center text-gray-700 px-6 py-4">S.No</th>
                                    <th scope="col" className="text-start text-gray-700">Name</th>
                                    <th scope="col" className="text-start text-gray-700">Email</th>
                                    <th scope="col" className="text-start text-gray-700">PhoneNo</th>
                                    <th scope="col" className="text-start text-gray-700">Order Time</th>
                                    <th scope="col" className="text-center text-gray-700">View Products</th>
                                    <th scope="col" className="text-center text-gray-700">Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderedProducts && orderedProducts.getAllOrders && orderedProducts.getAllOrders.map((entireData, index) => {
                                        return (
                                            <tr className="border hover:bg-gray-100 hover:rounded-t-full transition-all duration-300 ease-in-out" key={index}>
                                                <td className="text-center py-5 text-gray-700">{index + 1}</td>
                                                <td className="text-start text-gray-700">{entireData.personalDetails.PersonalName}</td>
                                                <td className="text-start text-gray-700">{entireData.personalDetails.PersonalEmail}</td>
                                                <td className="text-start text-gray-700">{entireData.personalDetails.PersonalPhoneNo}</td>
                                                <td className="text-start text-gray-700">{entireData.OrderTime}</td>
                                                <td className="text-center text-gray-700" ><Link href={`/orderDetails/productDetails/${entireData._id}`}><FontAwesomeIcon icon={faEye} className=" hover:border-green-400" /></Link></td>
                                                <td className="text-center text-gray-700">₹ {entireData.totalPrice}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}