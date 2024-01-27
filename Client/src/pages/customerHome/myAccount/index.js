import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShippingFast, faArrowLeft, faEllipsisVertical, faPlus, faFileEdit, faEdit, faDeleteLeft, faRemove, faTrash, faShoppingBag, faShoppingBasket, faShoppingCart, faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_CUSTOMER_REGISTER_DATA, GET_CUSTOMER_SHIPPING_ADDRESS } from "../../../../Grahpql/queries";
import { UPDATE_CUSTOMER_PERSONAL_DETAILS, ADD_CUSTOMER_SHIPPING_ADDRESS, UPDATE_CUSTOMER_SHIPPING_ADDRESS, DELETE_CUSTOMER_ADDRESS } from "../../../../Grahpql/mutation";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
function Myaccount() {
    const [showPersonalData, setShowPersonalData] = useState(false)
    const [showShippingData, setShowShippingData] = useState(false);
    const [addressesCustomer, setAddressesCustomer] = useState([]);
    const [editDelete, setEditDelete] = useState(false);
    const [editId, setEditId] = useState();
    const [activeSection, setActiveSection] = useState('address');
    const [isHovered, setIsHovered] = useState(null);
    const router = useRouter();
    const componentRef = useRef();


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

    const { data, loading, error, refetch: refetchAddresses } = useQuery(GET_CUSTOMER_REGISTER_DATA, {
        variables: { id: getCustomerLocalData.customerId }
    })
    // const { data: getshippinData, loading: shippingLoading, error: shippingError } = useQuery(GET_CUSTOMER_SHIPPING_ADDRESS, {
    //     variables: { id: getCustomerLocalData.customerId }
    // })

    const [deleteCustomerAddresstData] = useMutation(DELETE_CUSTOMER_ADDRESS)

    // console.log("data----------", data);

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
        if (shippingDetails.phoneNo === "") {
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
    const [updateCustomerShippingAddress] = useMutation(UPDATE_CUSTOMER_SHIPPING_ADDRESS)
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
                toast.success("Personal detail updated", {
                    position: 'top-right',
                    autoClose: 3000,
                })

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
            if (!editId) {
                try {
                    await addCustomerShipping({ variables: { id: getCustomerLocalData.customerId, input: shippingDetails } })
                    toast.success("Address added Successfully", {
                        position: 'top-right',
                        autoClose: 3000,
                    })
                    refetchAddresses()
                    setShowShippingData(false)
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
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                try {
                    await updateCustomerShippingAddress({ variables: { userId: getCustomerLocalData.customerId, addressId: editId, input: shippingDetails } })
                    setShowShippingData(false)
                    toast.success("Updated Successfully", {
                        position: 'top-right',
                        autoClose: 3000,
                    })
                    refetchAddresses()
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
                    });
                    setEditId('');
                }
                catch (error) {
                    notification.error({ message: "Not updated" })
                }
            }

        }
    }
    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (componentRef.current && !componentRef.current.contains(e.target)) {
    //             setEditId(false);
    //         }
    //         else {
    //             setEditId(true)
    //         }
    //     };
    //     window.addEventListener('click', handleClickOutside);
    //     return () => {
    //         window.removeEventListener('click', handleClickOutside);
    //     }
    // }, [editId]);

    useEffect(() => {
        if (data && data.getCustomerRegister) {
            setPersonalDetails({
                name: data.getCustomerRegister.name,
                email: data.getCustomerRegister.email,
                phoneNo: data.getCustomerRegister.phoneNo,
            });
            setAddressesCustomer(data.getCustomerRegister.Addresses);
        }
    }, [data]);

    const removeAddress = async (deleteId) => {

        try {
            const addressId = deleteId;
            console.log(addressId)
            const userId = getCustomerLocalData.customerId;
            await deleteCustomerAddresstData({ variables: { userId: userId, addressId: addressId } })
            refetchAddresses();
            toast.success("Successfully Deleted", {
                position: 'top-right',
                autoClose: 3000,
            })
        }
        catch (error) {
            console.log("not deleted");
            notification.error({ message: "Not deleted" })
        }
    }

    const editAddress = (editId) => {
        const editAddress = addressesCustomer.find((edit) => edit._id === editId)
        setEditId(editAddress._id);
        setShippingDetails({
            firstName: editAddress.firstName,
            lastName: editAddress.lastName,
            email: editAddress.email,
            phoneNo: editAddress.phoneNo,
            address: editAddress.address,
            district: editAddress.district,
            state: editAddress.state,
            country: editAddress.country,
            pincode: editAddress.pincode,
        })
        setShowShippingData(true)
    }
    console.log("editId------", editId);

    const cancelAddressForm = () => {
        setShowShippingData(false)
        setShippingDetailsError({
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
    const handleAddNewAddressBtn = () => {
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
        setEditId('')
        if (!showShippingData) {
            setShowShippingData(true)
        }
        else {
            setShowShippingData(false)
        }

    }
    const handleMouseEnter = (addressID) => {
        setIsHovered(addressID)
        // setIsHovered((prevAddressID) => (prevAddressID === addressID ? null : addressID));
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };
    return (
        <>
            <div className="grid gap-5 ml-28 overflow-y-scroll custom-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-screen p-2 mr-1">
                <Link href={'/customerHome'} className="flex justify-start items-center gap-2 mt-5">
                    <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                    <p className="cursor-pointer text-blue-500">Back to Home</p>
                </Link>
                <div className="flex gap-x-10 gap-y-5 items-start justify-start">
                    <div className="grid gap-y-4">

                        <div className={`flex items-center justify-center px-3 py-3 gap-4  border border-solid rounded-md ${activeSection === "profile" || 'address' ? 'border-orange-400 bg-white' : 'border-gray-500 bg-stone-200'}`}>
                            <FontAwesomeIcon icon={faUser} className={`${activeSection === "profile" || 'address' ? 'text-orange-400' : 'text-gray-500'}`} />
                            <p className={`${activeSection === "profile" || 'address' ? 'text-orange-400' : 'text-gray-500'}`}>ACCOUNT SETTING</p>
                        </div>
                        <div className="grid pl-12 gap-y-2">
                            <p onClick={() => setActiveSection('profile')} className={`hover:cursor-pointer ${activeSection === "profile" ? 'text-orange-400' : 'text-gray-500'}`}>Personal Information</p>
                            <p onClick={() => setActiveSection('address')} className={`hover:cursor-pointer ${activeSection === "address" ? 'text-orange-400' : 'text-gray-500'}`}>Address</p>
                        </div>
                        <Link href={'/customerHome/myOrders'}>
                            <div className="flex items-center  justify-between px-3 py-3 gap-8 bg-gray-200 border border-solid rounded-md">
                                <FontAwesomeIcon icon={faShoppingBag} className="text-gray-500" />
                                <p className="text-gray-500">MY ORDERS</p>
                                <FontAwesomeIcon icon={faGreaterThan} className="text-gray-500" />
                            </div>
                        </Link>
                    </div>
                    <div>
                        <div style={{ display: activeSection === "profile" ? 'block' : 'none' }}>
                            <div className="flex justify-start items-center">
                                <h1 className="text-[#575F70] text-lg font-medium">Personal Details</h1>
                            </div>
                            <form onSubmit={handlePersonalDetailForm} className="mt-3">
                                <div className={`grid justify-start p-5 w-auto gap-4 bg-white rounded-md  border-gray-200 border border-solid `} >
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
                        <div style={{ display: activeSection === "address" ? 'block' : 'none' }}>
                            <div className="border border-solid gap-3 group border-green-400 flex hover:cursor-pointer hover:bg-green-400 hover:text-white justify-center w-52 items-center py-1.5 mt-5 rounded-sm" onClick={handleAddNewAddressBtn}>
                                <FontAwesomeIcon icon={faPlus} className="text-green-400 group-hover:text-white" />
                                <h4 className="font-normal text-green-400 group-hover:text-white">Add New Address</h4>
                            </div>
                            <div className="mt-5" >
                                <form onSubmit={handleShipppingDetails} style={{ display: showShippingData ? "block" : "none" }}>
                                    <div className={`${editId ? 'absolute inset-x-52 inset-y-10 px-10 h-screen shadow-xl' : ''} grid justify-st p-5 mx-20 gap-4 bg-white border-green-300 border border-solid rounded-md`}>
                                        <div className="flex justify-start items-center gap-3">
                                            <FontAwesomeIcon icon={faShippingFast} className="text-green-400" />
                                            <h4 className="text-gray-700 text-base font-normal">Address</h4>
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
                                            <span className="border border-gray-200 hover:border-red-300 hover:text-red-400 h-9 flex justify-center items-center p-2 rounded text-gray-400 cursor-pointer" onClick={cancelAddressForm}>Cancel</span>
                                            <button className={`border border-blue-400 h-9 flex justify-center items-center p-2 rounded text-blue-400 hover:text-white hover:bg-[#45BA76] hover:border-[#45BA76]`} type="submit">{editId ? "Update" : "Save"}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="grid grid-cols-2 flex-wrap gap-x-4 justify-between" >
                                {addressesCustomer.map((address, index) => {
                                    return (
                                        <div onMouseEnter={() => handleMouseEnter(address._id)} onMouseLeave={handleMouseLeave} className="flex justify-between items-center border border-solid bg-teal-50 hover:border-teal-200 rounded-md my-4 p-3 gap-x-2 w-auto" key={index}>
                                            <div>
                                                <div className="flex gap-2">
                                                    <p className="text-gray-600">{address.firstName}</p>
                                                    <p className="text-gray-400 border border-gray-200 bg-gray-300 px-1 text-sm">Home</p>
                                                    <p className="text-gray-600">{address.phoneNo}</p>
                                                </div>
                                                <div className="flex gap-2 py-2">
                                                    <p className="text-gray-500">{
                                                        address.address.length > 15 ?
                                                            `${address.address.slice(0, 15)}....` : address.address
                                                    },</p>
                                                    <p className="text-gray-500">{address.district},</p>
                                                    <p className="text-gray-500">{address.state} - </p>
                                                    <p className="text-gray-500">{address.pincode}</p>
                                                </div>
                                            </div>
                                            <div className="flex" style={{ visibility: isHovered === address._id ? 'visible' : 'hidden' }} >
                                                <div className="grid gap-y-6 items-center">
                                                    <FontAwesomeIcon icon={faEdit} onClick={() => { editAddress(address._id), setEditDelete(false) }} className="text-green-400 hover:cursor-pointer" />
                                                    <FontAwesomeIcon icon={faTrash} onClick={() => { removeAddress(address._id), setEditDelete(false) }} className="text-red-400 hover:cursor-pointer" />
                                                </div>
                                                {/* <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setEditDelete(editDelete === address._id ? null : address._id)} className="actionIcon text-gray-500 cursor-pointer hover:text-teal-500" /> */}
                                            </div>
                                            {/* <div className="flex">
                                                {/* {editDelete === address._id && ( */}
                                            {/* <div style={{ display: editDelete === address._id ? 'block' : 'none' }} className="flex gap-4 bg-teal-50 items-center px-4 rounded-md shadow-sm hover:shadow-xl border border-solid border-green-100"> */}
                                            {/* <FontAwesomeIcon icon={faEdit} onClick={() => { editAddress(address._id), setEditDelete(false) }} className="text-green-400 hover:cursor-pointer" /> */}
                                            {/* <FontAwesomeIcon icon={faTrash} onClick={() => { removeAddress(address._id), setEditDelete(false) }} className="text-red-400 hover:cursor-pointer" /> */}
                                            {/* <button onClick={() => editAddress(address._id)} className="border rounded-md w-16 text-gray-600">Edit</button>
                                                <button onClick={() => removeAddress(address._id)} className="border rounded-md w-16 text-gray-600">Delete</button> */}
                                            {/* </div> */}
                                            {/* <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setEditDelete(editDelete === address._id ? null : address._id)} className="actionIcon text-gray-500 cursor-pointer hover:text-teal-500" /> */}
                                            {/* )} */}
                                            {/* </div>  */}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Myaccount;