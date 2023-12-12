import React from "react";

export default function placeOrder() {
    return (
        <>
            <div className="flex">
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
                <div className="m-auto">
                    <h2 className="ml-16 leading-loose text-3xl">Order Details</h2>
                    <div className="flex border-2 border-dashed border-blue-600 p-3 rounded-md">
                        <ul className="leading-loose text-2xl">
                            <li>Price (11 - items)</li>
                            <li>Discount</li>
                            <li>Delivery chagres</li>
                            <li>Total amount</li>
                        </ul>
                        <ul className="ml-6 mr-6 leading-loose text-2xl">
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                        </ul>
                        <ul className="leading-loose text-2xl">
                            <li>5000</li>
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