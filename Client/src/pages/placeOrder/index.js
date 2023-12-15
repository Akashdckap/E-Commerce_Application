import { faDeleteLeft, faL, faLessThan, faPlus, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function placeOrder() {
    const getCartData = useSelector(state => state.productDetails.cartData);

    const [shippingFormOpen, setShippingForm] = useState(true)
    const [shippingDetails, setShippingDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        address: "",
        district: "",
        state: "",
        pincode: "",
        country: ""
    })
    const [shippingDetailsError, setShippingDetailsError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        address: "",
        district: "",
        state: "",
        pincode: "",
        country: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails({
            ...shippingDetails,
            [name]: value,
        });
        delete shippingDetailsError[name]
    };

    const validate = () => {
        let newErrors = { ...shippingDetailsError };
        let isVaild = true;
        if (shippingDetails.firstName.trim() === "" && shippingDetails.lastName.trim() === "" && shippingDetails.email.trim() === "" && shippingDetails.phoneNo.trim() === "" && shippingDetails.address.trim() === "" && shippingDetails.district.trim() === "" && shippingDetails.state.trim() === "" && shippingDetails.pincode.trim() === "" && shippingDetails.country.trim() === "") {
            console.log(shippingDetailsError);
            newErrors.firstName = 'FirstName is required';
            newErrors.lastName = 'LastName is required';
            newErrors.email = 'Email is required';
            newErrors.phoneNo = 'Contact is required';
            newErrors.address = "Address is required";
            newErrors.district = "District is required";
            newErrors.state = "State is required";
            newErrors.pincode = "Pincode is required";
            newErrors.country = "Country is required";
            isVaild = false;
        }
        if (shippingDetails.phoneNo.length < 9 || 5 && shippingDetails.phoneNo.trim() !== "") {
            newErrors.phoneNo = "Contact number should be 10 numbers"
            isVaild = false
        }
        if (shippingDetails.pincode.length < 9 || 5 && shippingDetails.pincode.trim() !== "") {
            newErrors.pincode = "pincode should be 6 number"
            isVaild = false
        }
        setShippingDetailsError(newErrors);
        console.log(shippingDetailsError);
        return isVaild;
    }

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log(shippingDetailsError);
            console.log("shippingDetails--------", shippingDetails);
        }
    }
    // const cartProducts = useSelector(state => state.productDetails.cartData);
    // const priceGetting = cartProducts.map((total) => total.price);
    // const totalPrice = priceGetting.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <>
            <div>
                <div className="flex justify-start ml-20 mt-10 gap-20">
                    <Link href={'/cartItems'} className="flex justify-center items-center gap-2">
                        <FontAwesomeIcon icon={faLessThan} className="text-xs cursor-pointer text-blue-500" />
                        <p className="cursor-pointer text-blue-500">Back to cart</p>
                    </Link>
                    <div onClick={() => setShippingForm(true)} className="flex justify-evenly items-center bg-white h-10 w-56 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">
                        <FontAwesomeIcon icon={faPlus} className="text-orange-400 cursor-pointer" />
                        <p className="text-orange-400 cursor-pointer">Add a new address</p>
                    </div>
                </div>
                <div className="flex justify-start items-center ml-20 mt-5">
                    <h1 className="text-gray-600 text-xl">Shipping Address</h1>
                </div>
                <div className="flex justify-start items-start ml-20 mt-5 gap-10">
                    <form onSubmit={handleOrderSubmit} style={{ display: shippingFormOpen ? "block" : "none" }}>
                        <div className="grid justify-start p-10 mb-10 w-auto gap-4 bg-teal-100 border-2 border-gray-300 rounded-md">
                            <h4>Add New Address</h4>
                            <div className="flex justify-between gap-16">
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">First Name<span className="pl-1 text-red-400">*</span></label>
                                    <input placeholder="Enter the first name" onChange={handleChange} name="firstName" value={shippingDetails.firstName} type="text" className="h-10 border-2 p-2 text-gray-600 w-72 bg-white rounded-md focus:outline-none focus:border-gray-400" />
                                    {shippingDetailsError.firstName && <span className="text-red-400">{shippingDetailsError.firstName}</span>}
                                </div>
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">Last Name</label>
                                    <input placeholder="Enter the last name" onChange={handleChange} name="lastName" value={shippingDetails.lastName} className="h-10 border-2 p-2 w-72 text-gray-600 bg-white rounded-md focus:outline-none  focus:border-gray-400" />
                                    {shippingDetailsError.lastName && <span className="text-red-400">{shippingDetailsError.lastName}</span>}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">Email<span className="pl-1 text-red-400">*</span></label>
                                    <input placeholder="Enter the email" onChange={handleChange} name="email" type="text" value={shippingDetails.email} className="border-2 p-2 text-gray-600 w-72 bg-white rounded-md focus:outline-none focus:border-gray-400" />
                                    {shippingDetailsError.email && <span className="text-red-400">{shippingDetailsError.email}</span>}
                                </div>
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">Contact Number<span className="pl-1 text-red-400">*</span></label>
                                    <input placeholder="Enter the number" onChange={handleChange} name="phoneNo" value={shippingDetails.phoneNo} type="number" className="border-2 p-2 w-72 text-gray-600 bg-white rounded-md focus:outline-none  focus:border-gray-400" />
                                    {shippingDetailsError.phoneNo && <span className="text-red-400">{shippingDetailsError.phoneNo}</span>}
                                </div>
                            </div>
                            <div className="grid">
                                <label className="text-gray-700 pl-1 pb-1">Address<span className="pl-1 text-red-400">*</span></label>
                                <input placeholder="Enter the address" onChange={handleChange} name="address" value={shippingDetails.address} type="text" className="border-2 p-2 text-gray-600 bg-white rounded-md focus:outline-none focus:border-gray-400" />
                                {shippingDetailsError.address && <span className="text-red-400">{shippingDetailsError.address}</span>}
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">District</label>
                                    <input placeholder="City/District/Town" onChange={handleChange} name="district" value={shippingDetails.district} className="border-2 p-2 text-gray-600 w-72 bg-white rounded-md focus:outline-none focus:border-gray-400" />
                                    {shippingDetailsError.district && <span className="text-red-400">{shippingDetailsError.district}</span>}
                                </div>
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">State</label>
                                    <input placeholder="Enter the state" onChange={handleChange} name="state" value={shippingDetails.state} className="border-2 p-2 bg-white text-gray-600 w-72 rounded-md focus:outline-none  focus:border-gray-400" />
                                    {shippingDetailsError.state && <span className="text-red-400">{shippingDetailsError.state}</span>}
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">Pin Code<span className="pl-1 text-red-400">*</span></label>
                                    <input placeholder="Enter the code" onChange={handleChange} name="pincode" value={shippingDetails.pincode} type="number" className="border-2 p-2 bg-white text-gray-600 w-72 rounded-md focus:outline-none  focus:border-gray-400" />
                                    {shippingDetailsError.pincode && <span className="text-red-400">{shippingDetailsError.pincode}</span>}
                                </div>
                                <div className="grid">
                                    <label className="text-gray-700 pl-1 pb-1">Country<span className="pl-1 text-red-400">*</span></label>
                                    <select value={shippingDetails.country} onChange={handleChange} name="country" className="border-2 p-2 w-72 bg-white text-gray-600 rounded-md focus:outline-none  focus:border-gray-400">
                                        <option defaultValue="Select One">Select One</option>
                                        <option value="India">India</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Newsland">Newsland</option>
                                        <option value="Netharland">Netharland</option>
                                        <option value="England">England</option>
                                    </select>
                                    {shippingDetailsError.country && <span className="text-red-400">{shippingDetailsError.country}</span>}
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-4">
                                <span className="border border-red-400 h-9 flex justify-center items-center p-2 rounded text-red-400 cursor-pointer" onClick={() => setShippingForm(false)}>Cancel</span>
                                <button className="border border-blue-400 hover:border-green-400  h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-white-400 hover:bg-green-400" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <div className="bg-white w-auto h-auto">
                            <div className="flex justify-center items-center">
                                <h3>Order Summary</h3>
                            </div>
                            <div>
                                {
                                    getCartData.map((cartItems, index) => {
                                        return (
                                            <div key={index} className="flex justify-center items-center gap-x-5 gap-y-5">
                                                <div>
                                                    <span className="float-right ">{cartItems.count}</span>
                                                    <div className="grid border-gray-400 border-solid border rounded-md">
                                                        <img className="h-24 w-24 max-w-full p-2 rounded-2xl  object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                    </div>
                                                </div>
                                                <div className="grid">
                                                    <h4>{cartItems.productName}</h4>
                                                    <p>{cartItems.category}</p>
                                                </div>
                                                <div className="gird justify-center items-center">
                                                    <p>{cartItems.price}</p>
                                                    <FontAwesomeIcon icon={faDeleteLeft} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}