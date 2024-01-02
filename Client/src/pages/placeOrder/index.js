import { faArrowLeft, faDeleteLeft, faInbox, faL, faLessThan, faPerson, faPlus, faRemove, faSection, faSeedling, faShare, faShareAlt, faShareNodes, faShareSquare, faShippingFast, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { ORDER_PRODUCT } from "../../../Grahpql/mutation";
import { removeCartdata, storeShippingAddress, storePersonalDetails, updatePersonalDetails, updateShippingAddress, updateBillingAddress, storeBillingAddress } from "@/Reducer/productReducer";
export default function placeOrder() {
    const cartProducts = useSelector(state => state.productDetails.cartData);
    const dispatch = useDispatch()
    const getCartData = useSelector(state => state.productDetails.cartData);

    const getShippingData = useSelector(state => state.productDetails.shippingData)
    const getBillingData = useSelector(state => state.productDetails.billingData)
    const getPersonalData = useSelector(state => state.productDetails.personalData)

    const [shippingFormOpen, setShippingForm] = useState(true)
    const [personalDetailForm, setPersonalDetailForm] = useState(true);
    const [billingFormOpen, setBillingForm] = useState(true)
    // const [selectedPersonalDetails, setSelectedPersonalDetails] = useState(null);
    // const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
    // const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);

    const [showPersonalData, setShowPersonalData] = useState(true);
    const [showShippingData, setShowShippingData] = useState(true);
    const [showBillingData, setShowBillingData] = useState(true);


    const [personalDetails, setPersonalDetails] = useState({
        PersonalName: "",
        PersonalEmail: "",
        PersonalPhoneNo: "",
    })
    const [personalDetailsError, setPersonalDetailsError] = useState({
        PersonalName: "",
        PersonalEmail: "",
        PersonalPhoneNo: "",
    })
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

    const [billingDetails, setBillingDetails] = useState({
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
    const [billingDetailsError, setBillingDetailsError] = useState({
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
    const handleChangePersonalDetails = (e) => {
        const { name, value } = e.target;
        setPersonalDetails({
            ...personalDetails,
            [name]: value,
        });
        delete personalDetailsError[name]
    };
    const handleChangeShippingAddress = (e) => {
        const { name, value } = e.target;
        setShippingDetails({
            ...shippingDetails,
            [name]: value,
        });
        delete shippingDetailsError[name]
    };
    const handleChangeBillingAddress = (e) => {
        const { name, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value,
        });
        delete billingDetailsError[name]
    }

    const validatePersonalDetailForm = () => {
        let newErrors = { ...personalDetailsError };
        let isVaild = true;
        if (personalDetails.PersonalName.trim() === "" && personalDetails.PersonalEmail.trim() === "" && personalDetails.PersonalPhoneNo.trim() === "") {
            newErrors.PersonalName = 'Name is required';
            newErrors.PersonalEmail = 'Email is required';
            newErrors.PersonalPhoneNo = 'Contact is required';
            isVaild = false;
        }
        if (personalDetails.PersonalPhoneNo.length < 9 && personalDetails.PersonalPhoneNo.trim() !== "") {
            newErrors.PersonalPhoneNo = "Contact number should be 10 numbers"
            isVaild = false
        }
        setPersonalDetailsError(newErrors);
        return isVaild;
    }


    const validateShippingForm = () => {
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

    const validateBillingForm = () => {
        let newErrors = { ...billingDetailsError };
        let isVaild = true;
        if (billingDetails.firstName.trim() === "" && billingDetails.lastName.trim() === "" && billingDetails.email.trim() === "" && billingDetails.phoneNo.trim() === "" && billingDetails.address.trim() === "" && billingDetails.district.trim() === "" && billingDetails.state.trim() === "" && billingDetails.pincode.trim() === "" && billingDetails.country.trim() === "") {
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
        if (billingDetails.phoneNo.length < 9 && billingDetails.phoneNo.trim() !== "") {
            newErrors.phoneNo = "Contact number should be 10 numbers"
            isVaild = false
        }
        if (billingDetails.pincode.length < 5 && billingDetails.pincode.trim() !== "") {
            newErrors.pincode = "pincode should be 6 number"
            isVaild = false
        }
        setBillingDetailsError(newErrors);
        return isVaild;
    }



    const handlePersonalDetailForm = (e) => {
        e.preventDefault();
        if (validatePersonalDetailForm()) {
            if (getPersonalData.length === 0) {
                dispatch(storePersonalDetails(personalDetails))
                setPersonalDetails({
                    PersonalName: "",
                    PersonalEmail: "",
                    PersonalPhoneNo: "",
                })
                setPersonalDetailForm(false)
                // setShowPersonalData(true)
            }
            else {
                dispatch(updatePersonalDetails(personalDetails))
                setPersonalDetails({
                    PersonalName: "",
                    PersonalEmail: "",
                    PersonalPhoneNo: "",
                })
                setPersonalDetailForm(false)
                // setShowPersonalData(true)
            }
        }
    }

    // console.log("getPersonalData------------------", getPersonalData.length === 0);

    const handleShipppingDetails = (e) => {
        e.preventDefault();
        if (validateShippingForm()) {
            if (getShippingData.length === 0) {
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
                setShowShippingData(true)
            }
            else {
                dispatch(updateShippingAddress(shippingDetails));
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
                setShowShippingData(true)
            }
        }
    }
    const handleBillingDetails = (e) => {
        e.preventDefault();
        if (validateBillingForm()) {
            if (getBillingData.length === 0) {
                dispatch(storeBillingAddress(billingDetails));
                setBillingDetails({
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
                console.log("billingDetails------------------", billingDetails);
                setShowBillingData(true)
            }
            else {
                dispatch(updateBillingAddress(billingDetails));
                setBillingDetails({
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
                setShowBillingData(true)
            }
        }
    }
    const handleRemoveDataFromLocal = (itemId, itemName) => {
        dispatch(removeCartdata(itemId))
        notification.success({ message: `Successfully removed ${itemName} from your cart` })
    }



    //<--------------------------- Below the codes for the edit those three form ---------------------------------------->


    const editPersonalDetails = () => {
        setPersonalDetails({
            PersonalName: getPersonalData.PersonalName,
            PersonalEmail: getPersonalData.PersonalEmail,
            PersonalPhoneNo: getPersonalData.PersonalPhoneNo,
        })
        setShowPersonalData(true)
        // setPersonalDetailForm(true)
    }

    const editShippingDetails = () => {
        setShippingDetails({
            firstName: getShippingData.firstName,
            lastName: getShippingData.lastName,
            email: getShippingData.email,
            phoneNo: getShippingData.phoneNo,
            address: getShippingData.address,
            district: getShippingData.district,
            state: getShippingData.state,
            pincode: getShippingData.pincode,
            country: getShippingData.country
        })
        setShowShippingData(true)
    }
    // <-----------------------------Below the code for the  editBillingDetails function  ----------------------------->

    const editBillingDetails = () => {
        setBillingDetails({
            firstName: getBillingData.firstName,
            lastName: getBillingData.lastName,
            email: getBillingData.email,
            phoneNo: getBillingData.phoneNo,
            address: getBillingData.address,
            district: getBillingData.district,
            state: getBillingData.state,
            pincode: getBillingData.pincode,
            country: getBillingData.country
        })
        setShowBillingData(true)
    }
    const handleCancelPersonal = () => {
        setShowPersonalData(true)
        setPersonalDetails({
            PersonalName: "",
            PersonalEmail: "",
            PersonalPhoneNo: "",
        })
    }
    const handleCancelShipping = () => {
        setShowShippingData(true)
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
    const handleCancelBilling = () => {
        setShowBillingData(true)
        setBillingDetails({
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
    const handleSameAsShipping = () => {
        setBillingDetails(getShippingData)
        setShowBillingData(false)
    }

    const [createOrders] = useMutation(ORDER_PRODUCT)

    const handlePlaceOrder = async () => {
        try {
            const finalData = getCartData.map(({ _id, __typename, ...rest }) => ({ ...rest, productID: _id }));
            const orderedInputData = {
                orderedProducts: finalData,
                personalDetails: getPersonalData,
                shippingAddress: getShippingData,
                billingAddress: getBillingData
            }
            if (!orderedInputData.orderedProducts.length || !orderedInputData.personalDetails || !orderedInputData.shippingAddress || !orderedInputData.billingAddress) {
                notification.error({ message: "Incomplete order data. Please fill in all required information." });
                return;
            }
            const { data: orderSubmitData, errors: SubmitOrderError } = await (createOrders({
                variables: {
                    inputs: orderedInputData
                },
            }));
            if (SubmitOrderError) {
                notification.success({ message: "Order Submission error" });
            }
            if (orderSubmitData) {
                notification.success({ message: "Order Submitted" });
            }
            return { orderSubmitData, SubmitOrderError }
        }
        catch (error) {
            if (error.graphQLErrors) {
                console.error("GraphQL Validation Errors:", error.graphQLErrors);
                notification.error({ message: "Order Submission Error" });
            }
            console.error("place order error :", error);
        }
    }

    useEffect(() => {
        if (getPersonalData.length === 0) {
            setShowPersonalData(true)
            // setShowShippingData(false)
            // setShowBillingData(false)
        }
        else {
            setShowPersonalData(false)
            // setShowShippingData(true)
            // setShowBillingData(true)
        }
    }, [getPersonalData]);

    useEffect(() => {
        if (getShippingData.length === 0) {
            setShowShippingData(true)
            // setShowPersonalData(false)
            // setShowBillingData(false)
        }
        else {
            setShowShippingData(false)
            // setShowPersonalData(true)
            // setShowBillingData(true)
        }
    }, [getShippingData])

    useEffect(() => {
        if (getBillingData.length === 0) {
            setShowBillingData(true)
            // setShowShippingData(false)
            // setShowPersonalData(false)
        }
        else {
            setShowBillingData(false)
            // setShowShippingData(true)
            // setShowPersonalData(true)
        }
    }, [getBillingData])

    const expandedAmountarray = cartProducts.map((expanded) => expanded.expandedPrice)
    const totalExpandedAmount = expandedAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log("orderData--------------------------------", orderData);
    return (
        <>
            <div className="">
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
                <div className="flex justify-between items-start mt-5 pl-20 pr-5">
                    <div className="grid">
                        <div style={{ display: showPersonalData ? 'none' : 'block' }} >
                            <div onClick={editPersonalDetails} className='flex p-5 w-auto gap-44 hover:border-green-300 justify-between items-center bg-white rounded-md border border-solid' >
                                <div className="flex justify-start items-center gap-8">
                                    {/* <input type="radio" onClick={editPersonalDetails} className="border-2 h-5 w-5 border-gray-300 checked:border-green-200 checked:bg-green-500 rounded-full focus:outline-none focus:border-green-200 focus:ring-green-200 active:border-green-500" /> */}
                                    <FontAwesomeIcon icon={faUser} className="text-green-400 text-lg" />
                                    <div className="flex justify-start gap-3">
                                        <h4 className="text-gray-600">{getPersonalData.PersonalName}</h4>
                                        <h4 className="text-gray-600">{getPersonalData.PersonalEmail}</h4>
                                    </div>
                                    <div className="flex justify-start">
                                        <p className="text-gray-400">{getPersonalData.PersonalPhoneNo}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span onClick={editPersonalDetails} className="text-blue-400  hover:cursor-pointer hover:text-green-500">Change</span>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <form onSubmit={handlePersonalDetailForm} style={{ display: showPersonalData ? "block" : "none" }}>
                                <div className={`grid justify-start p-10 w-auto gap-4 bg-white rounded-md ${showPersonalData ? 'border-gray-200 border border-solid' : 'border-green-300 border-2 border-solid'}`} onClick={() => setPersonalDetailForm(true)}>
                                    <div className="flex justify-start items-center gap-3">
                                        {/* <input type="radio" checked={!showPersonalData} className="border-2 h-5 w-5 border-gray-300 checked:border-green-200 checked:bg-green-500 rounded-full focus:outline-none focus:border-green-200 focus:ring-green-200 active:border-green-500" /> */}
                                        <FontAwesomeIcon icon={faUser} className="text-green-400 text-lg" />
                                        <h4 className="text-gray-700 text-base font-normal">{getPersonalData.length === 0 ? 'Add New Personal Details' : 'Change Personal Details'}</h4>
                                    </div>
                                    <div className="flex justify-between gap-16">
                                        <div className="grid">
                                            <label className="text-[#B9BECB] pl-1 pb-1">Name<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the name..." onChange={handleChangePersonalDetails} value={personalDetails.PersonalName} name="PersonalName" className="h-10 border border-gray-300 border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none focus:border-green-300 hover:border-green-300" />
                                            {personalDetailsError.PersonalName && <span className="text-red-400">{personalDetailsError.PersonalName}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-[#B9BECB] pl-1 pb-1">Email<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the email..." onChange={handleChangePersonalDetails} value={personalDetails.PersonalEmail} name="PersonalEmail" className="h-10 border border-gray-300 border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none focus:border-green-300 hover:border-green-300" />
                                            {personalDetailsError.PersonalEmail && <span className="text-red-400">{personalDetailsError.PersonalEmail}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between item-center gap-16">
                                        <div className="grid">
                                            <label className="text-[#B9BECB] pl-1 pb-1">PhoneNo<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the phoneno..." onChange={handleChangePersonalDetails} value={personalDetails.PersonalPhoneNo} name="PersonalPhoneNo" className="h-10 border border-gray-300 border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none focus:border-green-300 hover:border-green-300" />
                                            {personalDetailsError.PersonalPhoneNo && <span className="text-red-400">{personalDetailsError.PersonalPhoneNo}</span>}
                                        </div>
                                        <div className="flex justify-between gap-3 mt-8">
                                            <span className="border border-gray-200 hover:border-red-300 hover:text-red-400 h-9 flex justify-center items-center p-2 rounded text-gray-400 cursor-pointer" onClick={() => setShowPersonalData(false)}>Cancel</span>
                                            <button className={` ${getPersonalData.length === 0 ? 'w-18' : 'w-44'} border border-blue-400 h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-white hover:bg-[#45BA76] hover:border-[#45BA76]`} type="submit">{getPersonalData.length === 0 ? 'Save' : 'Use This Address'}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* <div onClick={handleOpenShippingForm} className="flex p-1 gap-5 mt-5 justify-center items-center ml-20 bg-white h-10 w-72 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">
                            <FontAwesomeIcon icon={faPlus} className="text-orange-400 cursor-pointer" />
                            <p className="text-orange-400 cursor-pointer">Add a new Shipping address</p>
                        </div> */}
                        {/* { -----------------------------Below these code is for the shipping data listed in UI -----------------------------> */}
                        <div className="flex justify-start items-center mt-5">
                            <h1 className="text-[#575F70] text-lg font-medium">Shipping Address</h1>
                        </div>
                        <div style={{ display: showShippingData ? 'none' : 'block' }}>
                            <div onClick={editShippingDetails} className='flex justify-between w-auto items-center gap-44 hover:border-green-300 mt-5 p-5 bg-white rounded-md border border-solid border-gray-300' >
                                <div className="flex justify-start items-center gap-8">
                                    {/* <input type="radio" onClick={editShippingDetails} className="border-2 h-5 w-5 border-gray-300 checked:border-green-200 checked:bg-green-500 rounded-full focus:outline-none focus:border-green-200 focus:ring-green-200 active:border-green-500" /> */}
                                    <FontAwesomeIcon icon={faShippingFast} className="text-green-400 text-lg" />
                                    <div className="flex">
                                        <h4 className="text-gray-600">{getShippingData.firstName}</h4>
                                        <h4 className="text-gray-600">{getShippingData.lastName}</h4>
                                    </div>
                                    <div className="flex justify-start gap-3">
                                        <p className="text-gray-400">
                                            {
                                                getShippingData && getShippingData.address && getShippingData.address.length > 25
                                                    ? getShippingData.address.slice(0, 25) + '....'
                                                    : getShippingData && getShippingData.address
                                            }
                                        </p>
                                        <p className="text-gray-400">{getShippingData.district}</p>
                                        <p className="text-gray-400">{getShippingData.pincode}</p>
                                    </div>
                                </div>
                                <div className="">
                                    <button onClick={editShippingDetails} className="text-blue-400 hover:text-green-400 hover:cursor-pointer">Change</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleShipppingDetails} style={{ display: showShippingData ? "block" : "none" }}>
                                <div className={`grid justify-start p-10 w-auto gap-4 bg-white border border-solid ${showShippingData ? 'border-gray-200 border border-solid' : 'border-green-300 border-2 border-solid'} rounded-md`}>
                                    <div className="flex justify-start items-center gap-3">
                                        {/* <input type="radio" checked={!showShippingData} className="border-2 h-5 w-5 border-gray-300 checked:border-green-200 checked:bg-green-500 rounded-full focus:outline-none focus:border-green-200 focus:ring-green-200 active:border-green-500" /> */}
                                        <FontAwesomeIcon icon={faShippingFast} className="text-green-400" />
                                        <h4 className="text-gray-700 text-base font-normal">{getShippingData.length === 0 ? 'Add New Shipping Address' : 'Change Shipping Address'}</h4>
                                    </div>
                                    <div className="flex justify-between gap-16">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">First Name<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the first name" onChange={handleChangeShippingAddress} name="firstName" value={shippingDetails.firstName} type="text" className="h-10 border border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none focus:border-green-300" />
                                            {shippingDetailsError.firstName && <span className="text-red-400">{shippingDetailsError.firstName}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Last Name</label>
                                            <input placeholder="Enter the last name" onChange={handleChangeShippingAddress} name="lastName" value={shippingDetails.lastName} className="h-10 border border-solid p-2 w-72 text-gray-700 bg-white rounded-md focus:outline-none  hover:border-green-300 focus:border-green-300" />
                                            {shippingDetailsError.lastName && <span className="text-red-400">{shippingDetailsError.lastName}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Email<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the email" onChange={handleChangeShippingAddress} name="email" type="text" value={shippingDetails.email} className="border border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none hover:border-green-300 focus:border-green-300" />
                                            {shippingDetailsError.email && <span className="text-red-400">{shippingDetailsError.email}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Contact Number<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the number" onChange={handleChangeShippingAddress} name="phoneNo" value={shippingDetails.phoneNo} type="number" className="border border-solid p-2 w-72 text-gray-700 bg-white rounded-md focus:outline-none  hover:border-green-300 focus:border-green-300" />
                                            {shippingDetailsError.phoneNo && <span className="text-red-400">{shippingDetailsError.phoneNo}</span>}
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <label className="text-gray-400 pl-1 pb-1">Address<span className="pl-1 text-red-400">*</span></label>
                                        <input placeholder="Enter the address" onChange={handleChangeShippingAddress} name="address" value={shippingDetails.address} type="text" className="border border-solid p-2 text-gray-700 bg-white rounded-md focus:outline-none hover:border-green-300 focus:border-green-300" />
                                        {shippingDetailsError.address && <span className="text-red-400">{shippingDetailsError.address}</span>}
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">District</label>
                                            <input placeholder="City/District/Town" onChange={handleChangeShippingAddress} name="district" value={shippingDetails.district} className="border border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none hover:border-green-300 focus:border-green-300" />
                                            {shippingDetailsError.district && <span className="text-red-400">{shippingDetailsError.district}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">State</label>
                                            <input placeholder="Enter the state" onChange={handleChangeShippingAddress} name="state" value={shippingDetails.state} className="border border-solid p-2 bg-white text-gray-700 w-72 rounded-md focus:outline-none  hover:border-green-300 focus:border-green-300" />
                                            {shippingDetailsError.state && <span className="text-red-400">{shippingDetailsError.state}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Pin Code<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the code" onChange={handleChangeShippingAddress} name="pincode" value={shippingDetails.pincode} type="number" className="border border-solid p-2 bg-white text-gray-700 w-72 rounded-md focus:outline-none  hover:border-green-300 focus:border-green-300" />
                                            {shippingDetailsError.pincode && <span className="text-red-400">{shippingDetailsError.pincode}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Country<span className="pl-1 text-red-400">*</span></label>
                                            <select value={shippingDetails.country} onChange={handleChangeShippingAddress} name="country" className="border border-solid p-2 w-72 bg-white text-gray-600 rounded-md focus:outline-none  hover:border-green-300 focus:border-green-300">
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
                                        <span className="border border-gray-200 hover:border-red-300 hover:text-red-400 h-9 flex justify-center items-center p-2 rounded text-gray-400 cursor-pointer" onClick={() => setShowShippingData(false)}>Cancel</span>
                                        <button className={`${getShippingData.length === 0 ? 'w-18' : 'w-44'} border border-blue-400 h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-white hover:bg-[#45BA76] hover:border-[#45BA76]`} type="submit">{getShippingData.length === 0 ? "Save" : "Use This Address"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* { -----------------------------Below these code is for the billing data listed in UI -----------------------------> */}
                        {/* <div onClick={() => setBillingForm(true)} className="flex p-1 gap-5 mt-5 justify-center items-center ml-20 bg-white h-10 w-72 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">
                            <FontAwesomeIcon icon={faPlus} className="text-orange-400 cursor-pointer" />
                            <p className="text-orange-400 cursor-pointer">Add a new Billing address</p>
                        </div> */}
                        <div className="flex justify-start items-center mt-5">
                            <h1 className="text-[#575F70] text-lg font-medium">Billing Address</h1>
                        </div>
                        <div style={{ display: showBillingData ? 'none' : 'block' }}>
                            <div onClick={editBillingDetails} className='flex justify-between w-auto items-center gap-44 hover:border-green-300 mt-5 p-5 bg-white rounded-md border border-solid border-gray-300'>
                                <div className="flex justify-between items-center gap-8">
                                    {/* <input type="radio" onClick={editBillingDetails} className="border-2 h-5 w-5 border-gray-300 checked:border-green-200 checked:bg-green-500 rounded-full focus:outline-none focus:border-green-200 focus:ring-green-200 active:border-green-500" /> */}
                                    <FontAwesomeIcon icon={faShippingFast} className="text-green-400 text-lg" />
                                    <div className="flex">
                                        <h4 className="text-gray-600">{getBillingData.firstName}</h4>
                                        <h4 className="text-gray-600">{getBillingData.lastName}</h4>
                                    </div>
                                    <div className="flex justify-start gap-3">
                                        <p className="text-gray-400">
                                            {
                                                getBillingData && getBillingData.address && getBillingData.address.length > 25
                                                    ? getBillingData.address.slice(0, 25) + '......'
                                                    : getBillingData && getBillingData.address
                                            }
                                        </p>                                        <p className="text-gray-400">{getBillingData.district}</p>
                                        <p className="text-gray-400">{getBillingData.pincode}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span onClick={editBillingDetails} className="text-blue-400  hover:cursor-pointer hover:text-green-400">Change</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleBillingDetails} style={{ display: showBillingData ? "block" : "none" }}>
                                <div className={`grid justify-start p-10 mb-10 w-auto gap-4 bg-white rounded-md ${showBillingData ? 'border-gray-200 border border-solid' : 'border-green-300 border-2 border-solid'}`}>
                                    <div className="flex justify-start items-center gap-3">
                                        {/* <input type="radio" checked={!showBillingData} className="border-2 h-5 w-5 border-gray-300 checked:border-green-200 checked:bg-green-500 rounded-full focus:outline-none focus:border-green-200 focus:ring-green-200 active:border-green-500" /> */}
                                        <FontAwesomeIcon icon={faShippingFast} className="text-green-400" />
                                        <h4 className="text-gray-700 text-base font-normal">{getBillingData.length === 0 ? 'Add New Billing Address' : 'Change Billing Address'}</h4>
                                    </div>
                                    <div className="flex justify-between gap-16">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">First Name<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the first name" onChange={handleChangeBillingAddress} name="firstName" value={billingDetails.firstName} type="text" className="h-10 border border-solid hover:border-green-300 focus:border-green-300 p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none" />
                                            {billingDetailsError.firstName && <span className="text-red-400">{billingDetailsError.firstName}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Last Name</label>
                                            <input placeholder="Enter the last name" onChange={handleChangeBillingAddress} name="lastName" value={billingDetails.lastName} className="h-10 border border-solid hover:border-green-300 focus:border-green-300 p-2 w-72 text-gray-700 bg-white rounded-md focus:outline-none" />
                                            {billingDetailsError.lastName && <span className="text-red-400">{billingDetailsError.lastName}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Email<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the email" onChange={handleChangeBillingAddress} name="email" type="text" value={billingDetails.email} className="border border-solid hover:border-green-300 focus:border-green-300 p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none" />
                                            {billingDetailsError.email && <span className="text-red-400">{billingDetailsError.email}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Contact Number<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the number" onChange={handleChangeBillingAddress} name="phoneNo" value={billingDetails.phoneNo} type="number" className="border border-solid hover:border-green-300 focus:border-green-300 p-2 w-72 text-gray-700 bg-white rounded-md focus:outline-none" />
                                            {billingDetailsError.phoneNo && <span className="text-red-400">{billingDetailsError.phoneNo}</span>}
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <label className="text-gray-400 pl-1 pb-1">Address<span className="pl-1 text-red-400">*</span></label>
                                        <input placeholder="Enter the address" onChange={handleChangeBillingAddress} name="address" value={billingDetails.address} type="text" className="border border-solid hover:border-green-300 focus:border-green-300 p-2 text-gray-700 bg-white rounded-md focus:outline-none" />
                                        {billingDetailsError.address && <span className="text-red-400">{billingDetailsError.address}</span>}
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">District</label>
                                            <input placeholder="City/District/Town" onChange={handleChangeBillingAddress} name="district" value={billingDetails.district} className="border border-solid hover:border-green-300 focus:border-green-300 p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none" />
                                            {billingDetailsError.district && <span className="text-red-400">{billingDetailsError.district}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">State</label>
                                            <input placeholder="Enter the state" onChange={handleChangeBillingAddress} name="state" value={billingDetails.state} className="border border-solid hover:border-green-300 focus:border-green-300 p-2 bg-white text-gray-700 w-72 rounded-md focus:outline-none" />
                                            {billingDetailsError.state && <span className="text-red-400">{billingDetailsError.state}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Pin Code<span className="pl-1 text-red-400">*</span></label>
                                            <input placeholder="Enter the code" onChange={handleChangeBillingAddress} name="pincode" value={billingDetails.pincode} type="number" className="border border-solid hover:border-green-300 focus:border-green-300 p-2 bg-white text-gray-700 w-72 rounded-md focus:outline-none" />
                                            {billingDetailsError.pincode && <span className="text-red-400">{billingDetailsError.pincode}</span>}
                                        </div>
                                        <div className="grid">
                                            <label className="text-gray-400 pl-1 pb-1">Country<span className="pl-1 text-red-400">*</span></label>
                                            <select value={billingDetails.country} onChange={handleChangeBillingAddress} name="country" className="border border-solid hover:border-green-300 focus:border-green-300 p-2 w-72 bg-white text-gray-700 rounded-md focus:outline-none">
                                                <option defaultValue="Select One">Select One</option>
                                                <option value="India">India</option>
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Newsland">Newsland</option>
                                                <option value="Netharland">Netharland</option>
                                                <option value="England">England</option>
                                            </select>
                                            {billingDetailsError.country && <span className="text-red-400">{billingDetailsError.country}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-3">
                                        <div className="flex justify-start items-center gap-4">
                                            <span className="border border-gray-200 hover:border-red-300 hover:text-red-400 h-9 flex justify-center items-center p-2 rounded text-gray-400 cursor-pointer" onClick={() => setShowBillingData(false)}>Cancel</span>
                                            <button className={`${getBillingData.length === 0 ? 'w-18' : 'w-44'} border border-blue-400 h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-white hover:bg-[#45BA76] hover:border-[#45BA76]`} type="submit">{getBillingData.length === 0 ? "Save" : "Use This Address"}</button>
                                        </div>
                                        {
                                            getShippingData.length !== 0 ?
                                                <div>
                                                    <button type="submit" onClick={handleSameAsShipping} className="p-3 flex justify-center items-center cursor-pointer text-orange-600 bg-white h-10 w-56 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">Same as Shipping Address</button>
                                                </div>
                                                : ''
                                        }
                                        {/* <div>
                                            {
                                                getShippingData.length === 0 ?
                                                    <span onClick={handleSameAsShipping} className="p-3 flex justify-center items-center cursor-pointer text-orange-600 bg-white h-10 w-56 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">Same as Shipping Address</span>
                                                    :
                                                    <button type="submit" onClick={handleSameAsShipping} className="p-3 flex justify-center items-center cursor-pointer text-orange-600 bg-white h-10 w-56 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">Same as Shipping Address</button>
                                            }
                                        </div> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="pb-10">
                        <div className="bg-white w-auto h-full p-5 pb-6 rounded-md border-gray-300 border  hover:border-green-300 border-solid">
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
                                <button onClick={handlePlaceOrder} className="bg-white w-80 border border-solid border-gray-400 hover:border-green-300 p-3 h-10 flex justify-center items-center hover:text-white hover:bg-green-400 text-gray-600 font-bold rounded">PLACE ORDER</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* { -----------------------------Below these code is for the billing form -----------------------------> */}
            </div>
        </>
    )
}