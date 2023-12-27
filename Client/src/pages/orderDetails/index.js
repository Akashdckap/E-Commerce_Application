import React, { useEffect, useState } from "react";
import { ALL_ORDERED_PRODUCTS } from "../../../Grahpql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; 
import {useRouter} from "next/router";

export default function OrderDetails() {
    const router = useRouter();
    const { data: orderedProducts, loading: dataLoading, error: dataError } = useQuery(ALL_ORDERED_PRODUCTS)
    const [orderData, setOrderData] = useState([]);
    // const _id = orderData.map((id)=>{ return id._id})
    const orderProducts = orderData.map((orderDB) => { return orderDB.orderedProducts });
    const personalDetails = orderData.map((personalData) => { return personalData.personalDetails });
    // const personDetail = personalDetails.map((data) => { return data });
    // console.log("--------------",personalDetails.length);
    const orderId = orderData.map((orderId) => { return orderId._id })
    // console.log(orderId.length,"------")
    const result = []
    if (personalDetails.length === orderId.length) {
        for (let i = 0; i < personalDetails.length; i++) {
            let modifyObject = { ...personalDetails[i], objectId: orderId[i] }
            result.push(modifyObject);
        }
    }
    else {
        console.log("Length is different");
    }

    console.log("personalDetails", result)

    useEffect(() => {
        if (orderedProducts && !dataLoading) {
            //getting Data from data and storing the data by using useState to use in the page
            setOrderData(orderedProducts.getAllOrders)
        }
        else {
            console.log("orderError----------", dataError);
        }
    }, [orderedProducts, dataLoading, dataError])
    return (
        <>
            <h1 className="text-center mt-4 text-2xl">Order Details</h1>
            <div>
                <div className="border border-gray-400 mx-4 mt-4">
                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="text-center">S.No</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">PhoneNo</th>
                                <th className="text-center">View Products</th>
                                <th className="text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => {
                                return (
                                    <tr>
                                        <td className="text-center py-5">{index + 1}</td>
                                        <td className="text-center">{item.PersonalName}</td>
                                        <td className="text-center">{item.PersonalEmail}</td>
                                        <td className="text-center">{item.PersonalPhoneNo}</td>
                                        <Link href={`/orderDetails/productDetails/${item.objectId}`}><td className="text-center" ><FontAwesomeIcon icon={faEye} /></td></Link>
                                        <td className="text-center"><FontAwesomeIcon icon={faTrash} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}