import { faArrowLeft, faDeleteLeft, faL, faLessThan, faPlus, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { removeCartdata, storeShippingAddress, updateShippingAddress } from "@/Reducer/productReducer";
export default function placeOrder() {
    const getCartData = useSelector(state => state.productDetails.cartData);
    const getShippingData = useSelector(state => state.productDetails.shippingData)
    const dispatch = useDispatch()
    const [shippingFormOpen, setShippingForm] = useState(false)
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

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
        dispatch(updateShippingAddress({ name, value }));
    };
    // if (getShippingData.length > 1) {
    //     setShippingForm(false)
    // }
    // useEffect(() => {
    //     if (getShippingData.length > 1) {
    //         setShippingForm(false)
    //     }
    // }, [])
    // console.log("getShippingData.length-------------------", getShippingData.length);
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
        console.log("shippingDetails.phoneNo----", shippingDetails.phoneNo.length);
        if (shippingDetails.phoneNo.length < 9 && shippingDetails.phoneNo.trim() !== "") {
            newErrors.phoneNo = "Contact number should be 10 numbers"
            isVaild = false
        }
        if (shippingDetails.pincode.length < 5 && shippingDetails.pincode.trim() !== "") {
            newErrors.pincode = "pincode should be 6 number"
            isVaild = false
        }
        setShippingDetailsError(newErrors);
        return isVaild;
    }

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(storeShippingAddress(shippingDetails));
            setShippingDetails({
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
        }
    }
    const handleRemoveDataFromLocal = (itemId, itemName) => {
        dispatch(removeCartdata(itemId))
        notification.success({ message: `Successfully removed ${itemName} from your cart` })
    }
    const editShippingDetails = (editId) => {
        const shippingData = getShippingData.find((shipping) => shipping.id === editId);
        setShippingDetails({
            firstName: shippingData.firstName,
            lastName: shippingData.lastName,
            email: shippingData.email,
            phoneNo: shippingData.phoneNo,
            address: shippingData.address,
            district: shippingData.district,
            state: shippingData.state,
            pincode: shippingData.pincode,
            country: shippingData.country
        })
        setShippingForm(true)
        setSelectedShippingAddress(editId)
    }
    // const handleSelectShippingAddress = (e) => {
    //     setSelectedShippingAddress(e.target.id)
    //     // setSelectedShippingAddress(true)
    // }
    // console.log("getShippingData-----------------", getShippingData);
    // const cartProducts = useSelector(state => state.productDetails.cartData);
    // const priceGetting = cartProducts.map((total) => total.price);
    // const totalPrice = priceGetting.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <>
            <div>
                <div className="flex justify-start ml-20 mt-10 gap-20">
                    <Link href={'/cartItems'} className="flex justify-center items-center gap-2">
                        <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                        <p className="cursor-pointer text-blue-500">Back to cart</p>
                    </Link>
                    <div onClick={() => setShippingForm(true)} className="flex justify-evenly items-center bg-white h-10 w-56 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">
                        <FontAwesomeIcon icon={faPlus} className="text-orange-400 cursor-pointer" />
                        <p className="text-orange-400 cursor-pointer">Add a new address</p>
                    </div>
                </div>
                <div>
                    {
                        getShippingData.map((shippinData, index) => {
                            return (
                                <div className="flex justify-start items-start ml-20 mt-5 w-auto">
                                    <div onClick={() => editShippingDetails(shippinData.id)} className={`w-7/12 flex p-5 justify-between items-center bg-white rounded-md border border-solid ${selectedShippingAddress === shippinData.id ? 'border-gray-400 shadow-lg transition-all duration-300' : 'border-gray-300'}`} key={index}>
                                        <div className="flex justify-between items-center gap-10">
                                            <input type="radio" id={shippinData.id} onChange={(e) => setSelectedShippingAddress(e.target.id)} onClick={() => editShippingDetails(shippinData.id)} checked={selectedShippingAddress === shippinData.id} className="border-2 h-5 w-5 border-gray-300 checked:border-green-200 checked:bg-green-500 rounded-full focus:outline-none focus:border-green-200 focus:ring-green-200 active:border-green-500" />
                                            <div className="flex">
                                                <h4 className="text-gray-800">{shippinData.firstName}</h4>
                                                <h4 className="text-gray-800">{shippinData.lastName}</h4>
                                            </div>
                                            <div className="flex justify-start">
                                                <p className="text-gray-500">{shippinData.address}</p>
                                                <p className="text-gray-500">{shippinData.district}</p>
                                                <p className="text-gray-500">{shippinData.pincode}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <span id={shippinData.id} onClick={() => editShippingDetails(shippinData.id)} className="text-blue-500 hover:text-blue-600 hover:cursor-pointer">Edit</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

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
                        <div className="bg-white w-96 h-auto p-3 pb-6 rounded-md border-gray-300 border border-solid">
                            <div className="flex justify-center items-center bg-gray-200 h-10 w-80 m-auto rounded-sm mt-3">
                                <h3 className="text-gray-600">Order Summary</h3>
                            </div>
                            <div className="grid justify-center items-center mt-3">
                                {
                                    getCartData.map((cartItems, index) => {
                                        return (
                                            <div key={index} className="flex justify-between items-center gap-x-14 gap-y-10 pt-5">
                                                <div className="flex justify-start items-center">
                                                    <div>
                                                        <span className="float-right flex justify-center items-center relative bottom-2 right-3 bg-gray-400 border-0 h-5 w-5 text-sm rounded-full text-white">{cartItems.count}</span>
                                                        <div className="grid border-gray-300 border-solid border rounded-md">
                                                            <img className="h-24 w-24 max-w-full p-2 rounded-2xl  object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="grid justify-start">
                                                        <h4 className="text-gray-700">{cartItems.productName}</h4>
                                                        <p className="text-gray-400">{cartItems.category}</p>
                                                    </div>
                                                </div>
                                                <div className="gird justify-start items-center">
                                                    <p className="text-gray-500">₹{cartItems.price}</p>
                                                    <FontAwesomeIcon onClick={() => handleRemoveDataFromLocal(cartItems._id, cartItems.productName)} icon={faDeleteLeft} className="text-red-300 hover:cursor-pointer hover:text-red-400" />
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