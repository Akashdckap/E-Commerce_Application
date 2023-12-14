import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function placeOrder() {

    const cartProducts = useSelector(state => state.productDetails.cartData);
    const priceGetting = cartProducts.map((total) => total.price);
    const totalPrice = priceGetting.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <>
            {/* <div className="flex">

            <div className="flex">
                <h2 className="text-xl ml-6 mt-5">Billing address</h2>
                <div className="border-dashed border-2 border-blue-600 h-auto rounded-md mx-auto my-9">
                    <form>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Name</label>
                            <span className="ml-20">:</span>
                            <input type="text" placeholder="Name" className="border-2 border-blue-600 rounded-lg ml-20 mt-6 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Email</label>
                            <span className="mx-20">:</span>
                            <input type="text" placeholder="Email" className="border-2 border-blue-600 rounded-lg ml-2 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">PhoneNo</label>
                            <span className="mx-10">:</span>
                            <input type="Number" placeholder="Phone No..." className="border-2 border-blue-600 rounded-lg ml-12 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Address</label>
                            <span className="mx-14">:</span>
                            <input type="Address" placeholder="Address" className="border-2 border-blue-600 rounded-lg ml-8 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">District</label>
                            <span className="mx-16">:</span>
                            <input type="District" placeholder="District" className="border-2 border-blue-600 rounded-lg ml-6 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Pincode</label>
                            <span className="mx-14">:</span>
                            <input type="Pincode" placeholder="Pincode" className="border-2 border-blue-600 rounded-lg ml-8 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">State</label>
                            <span className="mx-20">:</span>
                            <input type="State" placeholder="State" className="border-2 border-blue-600 rounded-lg ml-4 mr-8 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <button className="border-4 border-blue-600 pl-20 w-60 h-16 mx-auto rounded-xl shadow-lg flex items-center space-x-4 my-4 text-2xl">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="mx-auto">
                    <h2 className="ml-16 leading-loose text-2xl">Order Details</h2>
                    <div className="flex border-4 border-solid border-black p-3 bg-white ">
                        <ul className="leading-loose text-xl">
                            <li>Price ({cartProducts.length > 1 ? `${cartProducts.length} - items` : `${cartProducts.length} - item`})</li>
                            <li>Discount</li>
                            <li>Delivery chagres</li>
                            <li>Total amount</li>
                        </ul>
                        <ul className="ml-6 mr-6 leading-loose text-xl">
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                        </ul>
                        <ul className="leading-loose text-xl">
                            <li>{totalPrice}</li>
                            <li>5</li>
                            <li>55</li>
                            <li>6000</li>
                        </ul>
                    </div>
                </div>
            </div> */}
            <div>
                <div className="grid justify-start ml-20 mt-10">
                    <Link href={'/cartItems'} className="flex justify-center items-center gap-2">
                        <FontAwesomeIcon icon={faLessThan} className="text-xs cursor-pointer text-blue-500" />
                        <p className="cursor-pointer text-blue-500">Back to cart</p>
                    </Link>
                </div>
                <div className="flex justify-start items-center ml-20 mt-5">
                    <h1 className="text-gray-600 text-xl">Shipping Address</h1>
                </div>
                <div className="grid justify-start ml-20 mt-5 p-10 w-3/4 gap-4 bg-teal-100 border-2 border-gray-300 rounded-md">
                    <h4>Add New Address</h4>
                    <div className="flex justify-between gap-10">
                        <div className="grid">
                            <label className="text-gray-700">First Name<span className="pl-1 text-red-400">*</span></label>
                            <input placeholder="Enter the first name" type="text" className="border-2 p-2 text-gray-600 w-96 bg-white rounded-md focus:outline-none focus:border-gray-400" />
                        </div>
                        <div className="grid">
                            <label className="text-gray-700">Last Name</label>
                            <input placeholder="Enter the last name" className="border-2 p-2 w-96 text-gray-600 bg-white rounded-md focus:outline-none  focus:border-gray-400" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="grid">
                            <label className="text-gray-700">Email<span className="pl-1 text-red-400">*</span></label>
                            <input placeholder="Enter the email" type="text" className="border-2 p-2 text-gray-600 w-96 bg-white rounded-md focus:outline-none focus:border-gray-400" />
                        </div>
                        <div className="grid">
                            <label className="text-gray-700">Contact Number<span className="pl-1 text-red-400">*</span></label>
                            <input placeholder="Enter the number" type="number" className="border-2 p-2 w-96 text-gray-600 bg-white rounded-md focus:outline-none  focus:border-gray-400" />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="grid">
                            <label className="text-gray-700">Address<span className="pl-1 text-red-400">*</span></label>
                            <input placeholder="Enter the address" type="text" className="border-2 p-2 text-gray-600 w-96 bg-white rounded-md focus:outline-none focus:border-gray-400" />
                        </div>
                        <div className="grid">
                            <label className="text-gray-700">District</label>
                            <input placeholder="City/District/Town" className="border-2 p-2 bg-white text-gray-600 w-96 rounded-md focus:outline-none  focus:border-gray-400" />
                        </div>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="grid">
                            <label className="text-gray-700">State</label>
                            <input placeholder="Enter the state" className="border-2 p-2 bg-white text-gray-600 rounded-md focus:outline-none  focus:border-gray-400" />
                        </div>
                        <div className="grid">
                            <label className="text-gray-700">Pin Code<span className="pl-1 text-red-400">*</span></label>
                            <input placeholder="Enter the code" type="number" className="border-2 p-2 bg-white text-gray-600 rounded-md focus:outline-none  focus:border-gray-400" />
                        </div>
                        <div className="grid">
                            <label className="text-gray-700">Country<span className="pl-1 text-red-400">*</span></label>
                            <select className="border-2 p-2 bg-white text-gray-600 rounded-md focus:outline-none  focus:border-gray-400">
                                <option defaultValue="Select One">Select One</option>
                                <option value="India">India</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Australia">Australia</option>
                                <option value="Newsland">Newsland</option>
                                <option value="Netharland">Netharland</option>
                                <option value="England">England</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                        <button className="border border-red-400 h-9 flex justify-center items-center p-2 rounded text-red-400">Cancel</button>
                        <button className="border border-blue-400 hover:border-green-400  h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-green-400 hover:bg-green-100">Submit Order</button>
                    </div>
                </div>
            </div>
        </>
    )
}