import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { GET_CUSTOMER_REGISTER_DATA } from "../../../Grahpql/queries";
import { removeCartdata } from "@/Reducer/productReducer";
import { notification } from "antd";
export default function UserPlaceOrder() {
    const dispatch = useDispatch();
    const getCustomerLocalData = useSelector(state => state.productDetails.LoginData);
    const getCartData = useSelector(state => state.productDetails.cartData);

    const { data, loading, error } = useQuery(GET_CUSTOMER_REGISTER_DATA, {
        variables: { id: getCustomerLocalData.customerId }
    })
    const handleRemoveDataFromLocal = (itemId, itemName) => {
        dispatch(removeCartdata(itemId))
        notification.success({ message: `Successfully removed ${itemName} from your cart` })
    }
    const handlePlaceOrder = () => {

    }
    const expandedAmountarray = getCartData.map((expanded) => expanded.expandedPrice)
    const totalExpandedAmount = expandedAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return (
        <>
            <div>
                <div className="flex justify-between ml-20 mt-10 gap-20 pr-16">
                    <div className="flex justify-around gap-80">
                        <Link href={'/cartItems'} className="flex justify-center items-center gap-2">
                            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                            <p className="cursor-pointer text-blue-500">Back to cart</p>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-start items-center ml-20 mt-5">
                    <h1 className="text-[#575F70] text-lg font-medium">Personal Details</h1>
                </div>
                <div className="flex justify-between items-start mt-5 pl-20 pr-5 gap-10">
                    <div className="grid">
                        <div>
                            <div className='flex p-5 w-auto gap-44 hover:border-green-300 justify-between items-center bg-white rounded-md border border-solid' >
                                <div className="flex justify-start items-center gap-8">
                                    <FontAwesomeIcon icon={faUser} className="text-green-400 text-lg" />
                                    <div className="flex justify-start gap-3">
                                        <h4 className="text-gray-600">{data && data.getCustomerRegister.name}</h4>
                                        <h4 className="text-gray-600">{data && data.getCustomerRegister.email}</h4>
                                    </div>
                                    <div className="flex justify-start">
                                        <p className="text-gray-400">{data && data.getCustomerRegister.phoneNo}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span className="text-blue-400  hover:cursor-pointer hover:text-green-500">Change</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-10">
                        <div className="bg-white w-auto shadow-md h-full p-5 pb-6 rounded-md border-gray-300 border  hover:border-green-300 border-solid">
                            <div className="flex justify-center items-center bg-[#F5F7FA] h-10 w-80 m-auto rounded-sm mt-3">
                                <h3 className="text-[#51596B] font-normal">Order Summary</h3>
                            </div>
                            <div className="grid justify-center items-center mt-3">
                                {
                                    getCartData.map((cartItems, index) => {
                                        return (
                                            <div key={index} className="flex justify-between items-center gap-x-14 gap-y-10 pt-5">
                                                <div className="flex justify-start items-center">
                                                    <div>
                                                        <span className="float-right flex justify-center items-center relative bottom-2 right-3 bg-[#AAB1BC] border-0 h-5 w-5 text-sm rounded-full text-white">{cartItems.count}</span>
                                                        <div className="grid border-gray-300 border-solid border rounded-md">
                                                            <img className="h-24 w-24 max-w-full p-2 rounded-2xl  object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="grid justify-start">
                                                        <h4 className="text-[#949AAA]">{cartItems.productName}</h4>
                                                        <p className="text-[#C3C8D3]">{cartItems.category}</p>
                                                    </div>
                                                </div>
                                                <div className="gird justify-start items-center">
                                                    <p className="text-gray-500">₹{cartItems.expandedPrice}</p>
                                                    <FontAwesomeIcon onClick={() => handleRemoveDataFromLocal(cartItems._id, cartItems.productName)} icon={faDeleteLeft} className="text-red-300 hover:cursor-pointer hover:text-red-400" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex justify-between items-center mt-5 w-80 gap-2  border-b border-solid border-gray-300 p-2 border-t">
                                <label className="text-gray-700 font-medium">Total Amount :</label>
                                <p className="text-orange-400 font-medium">₹{totalExpandedAmount}</p>
                            </div>
                            <div className="flex justify-center items-center mt-5">
                                <button onClick={handlePlaceOrder} className={`bg-white w-80 border border-solid border-gray-400 hover:border-green-300 p-3 h-10 flex justify-center items-center hover:text-white hover:bg-green-400 text-gray-600 font-bold rounded cursor-pointer}`} >PLACE ORDER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
