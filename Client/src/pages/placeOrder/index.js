import React from "react";
import { useSelector } from "react-redux";

export default function placeOrder() {

    const cartProducts = useSelector(state => state.productDetails.cartData);
    const priceGetting = cartProducts.map((total) => total.price);
    const totalPrice = priceGetting.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <>
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
            </div>
        </>
    )
}