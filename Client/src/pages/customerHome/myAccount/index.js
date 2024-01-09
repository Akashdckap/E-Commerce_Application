import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_CUSTOMER_REGISTER_DATA, GET_CUSTOMER_SHIPPING_ADDRESS } from "../../../../Grahpql/queries";
import { UPDATE_CUSTOMER_PERSONAL_DETAILS, ADD_CUSTOMER_SHIPPING_ADDRESS, UPDATA_CUSTOMER_SHIPPING_ADDRESS } from "../../../../Grahpql/mutation";
import { useMutation } from "@apollo/client";
function Myaccount() {
    const [showPersonalData, setShowPersonalData] = useState(false)
    const [showShippingData, setShowShippingData] = useState(false);

    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        email: "",
        phoneNo: "",
    })
    const [personalDetailsError, setPersonalDetailsError] = useState({
        name: "",
        email: "",
        phoneNo: "",
    });
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
    const getCustomerLocalData = useSelector(state => state.productDetails.LoginData);

    const { data, loading, error } = useQuery(GET_CUSTOMER_REGISTER_DATA, {
        variables: { id: getCustomerLocalData.customerId }
    })
    const { data: getshippinData, loading: shippingLoading, error: shippingError } = useQuery(GET_CUSTOMER_SHIPPING_ADDRESS, {
        variables: { id: getCustomerLocalData.customerId }
    })

    // console.log("getshippinData----------", getshippinData.getShippingAddress);



    const validatePersonalDetailForm = () => {
        let newErrors = { ...personalDetailsError };
        let isValid = true;

        if (personalDetails.name.trim() === "") {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (personalDetails.email.trim() === "") {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (personalDetails.phoneNo === "") {
            newErrors.phoneNo = 'Contact is required';
            isValid = false;

        } else if (personalDetails.phoneNo.length < 9) {
            newErrors.phoneNo = 'Contact number should be 10 numbers';
            isValid = false;
        }

        setPersonalDetailsError(newErrors);
        return isValid;
    }
    const validateShippingForm = () => {
        let newErrors = { ...shippingDetailsError };
        let isVaild = true;
        // if (shippingDetails.firstName.trim() === "" || shippingDetails.lastName.trim() === "" || shippingDetails.email.trim() === "" || shippingDetails.phoneNo.trim() === "" || shippingDetails.address.trim() === "" || shippingDetails.district.trim() === "" || shippingDetails.state.trim() === "" || shippingDetails.pincode.trim() === "" || shippingDetails.country.trim() === "") {
        //     newErrors.firstName = 'FirstName is required';
        //     newErrors.lastName = 'LastName is required';
        //     newErrors.email = 'Email is required';
        //     newErrors.phoneNo = 'Contact is required';
        //     newErrors.address = "Address is required";
        //     newErrors.district = "District is required";
        //     newErrors.state = "State is required";
        //     newErrors.pincode = "Pincode is required";
        //     newErrors.country = "Country is required";
        //     isVaild = false;
        // }
        if (shippingDetails.firstName.trim() === "") {
            newErrors.firstName = 'FirstName is required';
            isVaild = false;
        }
        if (shippingDetails.lastName.trim() === "") {
            newErrors.lastName = 'LastName is required';
            isVaild = false;
        }
        if (shippingDetails.email.trim() === "") {
            newErrors.email = 'Email is required';
            isVaild = false;
        }
        if (shippingDetails.phoneNo.trim() === "") {
            newErrors.phoneNo = 'Contact is required';
            isVaild = false;
        }
        if (shippingDetails.address.trim() === "") {
            newErrors.address = "Address is required";
            isVaild = false;
        }
        if (shippingDetails.district.trim() === "") {
            newErrors.district = "District is required";
            isVaild = false;
        }
        if (shippingDetails.state.trim() === "") {
            newErrors.state = "State is required";
            isVaild = false;
        }
        if (shippingDetails.pincode.trim() === "") {
            newErrors.pincode = "Pincode is required";
            isVaild = false;
        }
        if (shippingDetails.country.trim() === "") {
            newErrors.country = 'country is required';
            isVaild = false;
        }
        if (shippingDetails.phoneNo.length < 9 && shippingDetails.phoneNo.trim() !== "") {
            newErrors.phoneNo = "Contact number should be 10 numbers"
            isVaild = false
        }
        if (shippingDetails.pincode.length < 6 && shippingDetails.pincode.trim() !== "") {
            newErrors.pincode = "pincode should be 6 number"
            isVaild = false
        }
        setShippingDetailsError(newErrors);
        return isVaild;
    }
    const [updateCustomerPersonal] = useMutation(UPDATE_CUSTOMER_PERSONAL_DETAILS)
    const [addCustomerShipping] = useMutation(ADD_CUSTOMER_SHIPPING_ADDRESS)
    const [updateCustomerShipping] = useMutation(UPDATA_CUSTOMER_SHIPPING_ADDRESS)
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
    const handlePersonalDetailForm = async (e) => {
        e.preventDefault();
        if (validatePersonalDetailForm()) {
            try {
                await updateCustomerPersonal({ variables: { id: getCustomerLocalData.customerId, input: personalDetails } })
                setShowPersonalData(false)
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const handleShipppingDetails = async (e) => {
        e.preventDefault();
        if (validateShippingForm()) {
            if (getshippinData && getshippinData.getShippingAddress === null) {
                try {
                    await addCustomerShipping({ variables: { id: getCustomerLocalData.customerId, input: shippingDetails } })
                    setShowShippingData(false)
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                try {
                    await updateCustomerShipping({ variables: { id: getCustomerLocalData.customerId, input: shippingDetails } })
                    setShowShippingData(false)
                }
                catch (error) {
                    console.log(error);
                }
            }

        }
    }
    // console.log("getshippinData-----------------", getshippinData.getShippingAddress.length === 0);
    useEffect(() => {
        if (data && data.getCustomerRegister) {
            setPersonalDetails({
                name: data.getCustomerRegister.name,
                email: data.getCustomerRegister.email,
                phoneNo: data.getCustomerRegister.phoneNo,
            })
        }
    }, [data]);

    useEffect(() => {
        if (getshippinData && getshippinData.getShippingAddress === null) {
            setShowShippingData(true)
        }
        else {
            setShowShippingData(false)
        }
    }, [getshippinData, showShippingData])
    useEffect(() => {
        if (getshippinData && getshippinData.getShippingAddress) {
            setShippingDetails({
                firstName: getshippinData.getShippingAddress.firstName,
                lastName: getshippinData.getShippingAddress.lastName,
                email: getshippinData.getShippingAddress.email,
                phoneNo: getshippinData.getShippingAddress.phoneNo,
                address: getshippinData.getShippingAddress.address,
                district: getshippinData.getShippingAddress.district,
                state: getshippinData.getShippingAddress.state,
                pincode: getshippinData.getShippingAddress.pincode,
                country: getshippinData.getShippingAddress.country
            })
        }
    }, [getshippinData]);
    // console.log(getshippinData.getShippingAddress === null);

    return (
        <>
            <div>
                <div className="grid gap-5 ml-28">
                    <div className="flex justify-start items-center mt-5">
                        <h1 className="text-[#575F70] text-lg font-medium">Personal Details</h1>
                    </div>

                    <div className="" style={{ display: showPersonalData ? 'none' : 'block' }}>
                        <div className={`flex p-5 gap-44 w-7/12 hover:border-green-300 justify-between items-center bg-white rounded-md border border-solid`}>
                            <div className="flex justify-start items-center gap-8">
                                <FontAwesomeIcon icon={faUser} className="text-green-400 text-lg" />
                                <div className="flex justify-start gap-3">
                                    <h4 className="text-gray-600">{personalDetails.name}</h4>
                                    <h4 className="text-gray-600">{personalDetails.email}</h4>
                                </div>
                                <div className="flex justify-start">
                                    <p className="text-gray-400">{personalDetails.phoneNo}</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <span className="text-blue-400 hover:cursor-pointer hover:text-green-500" onClick={() => setShowPersonalData(true)}>Change</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <form onSubmit={handlePersonalDetailForm} style={{ display: showPersonalData ? "block" : "none" }}>
                            <div className={`grid justify-start p-5 w-7/12 gap-4 bg-white rounded-md  border-gray-200 border border-solid `} >
                                <div className="flex justify-start items-center gap-3">
                                    <FontAwesomeIcon icon={faUser} className="text-green-400 text-lg" />
                                    <h4 className="text-gray-700 text-base font-normal">Change Personal Details</h4>
                                </div>
                                <div className="flex justify-between gap-16">
                                    <div className="grid">
                                        <label className="text-[#B9BECB] pl-1 pb-1">Name<span className="pl-1 text-red-400">*</span></label>
                                        <input placeholder="Enter the name..." onChange={handleChangePersonalDetails} value={personalDetails.name} name="name" className="h-10 border border-gray-300 border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none focus:border-green-300 hover:border-green-300" />
                                        {personalDetailsError.name && <span className="text-red-400">{personalDetailsError.name}</span>}
                                    </div>
                                    <div className="grid">
                                        <label className="text-[#B9BECB] pl-1 pb-1">Email<span className="pl-1 text-red-400">*</span></label>
                                        <input placeholder="Enter the email..." onChange={handleChangePersonalDetails} value={personalDetails.email} name="email" className="h-10 border border-gray-300 border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none focus:border-green-300 hover:border-green-300" />
                                        {personalDetailsError.email && <span className="text-red-400">{personalDetailsError.email}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between item-center gap-16">
                                    <div className="grid">
                                        <label className="text-[#B9BECB] pl-1 pb-1">PhoneNo<span className="pl-1 text-red-400">*</span></label>
                                        <input placeholder="Enter the phoneno..." onChange={handleChangePersonalDetails} value={personalDetails.phoneNo} name="phoneNo" className="h-10 border border-gray-300 border-solid p-2 text-gray-700 w-72 bg-white rounded-md focus:outline-none focus:border-green-300 hover:border-green-300" />
                                        {personalDetailsError.phoneNo && <span className="text-red-400">{personalDetailsError.phoneNo}</span>}
                                    </div>
                                    <div className="flex justify-between gap-3 mt-8">
                                        <span className="border border-gray-200 hover:border-red-300 hover:text-red-400 h-9 flex justify-center items-center p-2 rounded text-gray-400 cursor-pointer" onClick={() => setShowPersonalData(false)}>Cancel</span>
                                        <button className={`border border-blue-400 h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-white hover:bg-[#45BA76] hover:border-[#45BA76]`} type="submit">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {
                        getshippinData && getshippinData.getShippingAddress !== null ?
                            <div style={{ display: showShippingData ? 'none' : 'block' }}>
                                <div className='flex shadow-sm justify-between w-7/12 items-center hover:border-green-300 mt-5 p-5 bg-white rounded-md border border-solid border-gray-300' >
                                    <div className="flex justify-evenly items-center gap-x-3">
                                        <FontAwesomeIcon icon={faShippingFast} className="text-green-400 text-lg" />
                                        <div className="flex">
                                            <h4 className="text-gray-600">{shippingDetails.firstName}</h4>
                                            <h4 className="text-gray-600">{shippingDetails.lastName}</h4>
                                        </div>
                                        <div className="flex justify-start gap-2 pl-3">
                                            <p className="text-gray-400">
                                                {
                                                    shippingDetails.address.length > 25
                                                        ? shippingDetails.address.slice(0, 25) + '....'
                                                        : shippingDetails.address
                                                }
                                            </p>
                                            <p className="text-gray-400">{shippingDetails.district}</p>
                                            <p className="text-gray-400">{shippingDetails.pincode}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <button onClick={() => setShowShippingData(true)} className="text-blue-400 hover:text-green-400 hover:cursor-pointer">Change</button>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    <div className="mt-5">
                        <form onSubmit={handleShipppingDetails} style={{ display: showShippingData ? "block" : "none" }}>
                            <div className={`grid justify-start p-5 w-7/12 gap-4 bg-white border border-solid ${showShippingData ? 'border-gray-200 border border-solid' : 'border-green-300 border-2 border-solid'} rounded-md`}>
                                <div className="flex justify-start items-center gap-3">
                                    <FontAwesomeIcon icon={faShippingFast} className="text-green-400" />
                                    <h4 className="text-gray-700 text-base font-normal">{showShippingData ? 'Add New Shipping Address' : 'Change Shipping Address'}</h4>
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
                                    <button className={`border border-blue-400 h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-white hover:bg-[#45BA76] hover:border-[#45BA76]`} type="submit">{getshippinData && getshippinData.getShippingAddress === null ? "Save" : "Update"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Myaccount;