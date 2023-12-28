import React, { useEffect, useState } from "react";
import { ALL_ORDERED_PRODUCTS } from "../../../Grahpql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function OrderDetails() {
    // const router = useRouter();
    const { data: orderedProducts, loading: dataLoading, error: dataError } = useQuery(ALL_ORDERED_PRODUCTS)
    // const [orderData, setOrderData] = useState([]);
    // const _id = orderData.map((id)=>{ return id._id})
    // const orderProducts = orderData.map((orderDB) => { return orderDB.orderedProducts });
    // const personalDetails = orderData.map((personalData) => { return personalData.personalDetails });
    // const personDetail = personalDetails.map((data) => { return data });
    // console.log("--------------",personalDetails.length);
    // const orderId = orderData.map((orderId) => { return orderId._id })
    // const totalPrice = orderData.map((total) => { return total.totalPrice })

    // console.log(orderId.length,"------")
    // const result = []
    // if (personalDetails.length === orderId.length) {
    //     for (let i = 0; i < personalDetails.length; i++) {
    //         let modifyObject = { ...personalDetails[i], objectId: orderId[i] }
    //         result.push(modifyObject);
    //     }
    // }
    // else {
    //     console.log("Length is different");
    // }

    // if (orderProducts && orderedProducts) {
    //     // console.log("orderedProducts-------------", orderedProducts.getAllOrders);
    // }

    // const result2 = [];
    // if (result.length === totalPrice.length) {
    //     for (let i = 0; i < result.length; i++) {
    //         let modifyObject2 = { ...result[i], totalPrice: totalPrice[i] }
    //         result2.push(modifyObject2);
    //     }
    // }
    // else {
    //     console.log("Length is different");
    // }
    // console.log("personalDetails", result2)

    // useEffect(() => {
    //     if (orderedProducts && !dataLoading) {
    //         //getting Data from data and storing the data by using useState to use in the page
    //         setOrderData(orderedProducts.getAllOrders)
    //     }
    //     else {
    //         console.log("orderError----------", dataError);
    //     }
    // }, [orderedProducts, dataLoading, dataError])
    return (
        <>
            <h1 className="text-center mt-4 text-2xl text-gray-700">Order Details</h1>
            <div>
                <div className="border border-gray-400 mx-4 mt-4 bg-white rounded-md hover:border-green-300">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-center text-gray-700 py-6">S.No</th>
                                <th className="text-center text-gray-700">Name</th>
                                <th className="text-center text-gray-700">Email</th>
                                <th className="text-center text-gray-700">PhoneNo</th>
                                <th className="text-center text-gray-700">Order Time</th>
                                <th className="text-center text-gray-700">View Products</th>
                                <th className="text-center text-gray-700">Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderedProducts && orderedProducts.getAllOrders && orderedProducts.getAllOrders.map((entireData, index) => {
                                    return (
                                        <tr className="border hover:border-green-300" key={index}>
                                            <td className="text-center py-5 text-gray-700">{index + 1}</td>
                                            <td className="text-center text-gray-700">{entireData.personalDetails.PersonalName}</td>
                                            <td className="text-center text-gray-700">{entireData.personalDetails.PersonalEmail}</td>
                                            <td className="text-center text-gray-700">{entireData.personalDetails.PersonalPhoneNo}</td>
                                            <td className="text-center text-gray-700">{entireData.OrderTime}</td>
                                            <td className="text-center text-gray-700" ><Link href={`/orderDetails/productDetails/${entireData.objectId}`}><FontAwesomeIcon icon={faEye} className=" hover:border-green-400" /></Link></td>
                                            <td className="text-center text-gray-700">{entireData.totalPrice}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        {/* <tbody>
                            {result2.map((item, index) => {
                                return (
                                    <tr className="border hover:border-green-300" key={index}>
                                        <td className="text-center py-5 text-gray-700">{index + 1}</td>
                                        <td className="text-center text-gray-700">{item.PersonalName}</td>
                                        <td className="text-center text-gray-700">{item.PersonalEmail}</td>
                                        <td className="text-center text-gray-700">{item.PersonalPhoneNo}</td>
                                        <td className="text-center text-gray-700">{item.OrderTime}</td>
                                        <td className="text-center text-gray-700" ><Link href={`/orderDetails/productDetails/${item.objectId}`}><FontAwesomeIcon icon={faEye} className=" hover:border-green-400" /></Link></td>
                                        <td className="text-center text-gray-700">{item.totalPrice}</td>
                                    </tr>
                                )
                            })}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </>
    )
}