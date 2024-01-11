import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faDeleteLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { DELETE_CUSTOMER_CART_DATA } from "../../../Grahpql/mutation";
import { GET_CUSTOMER_REGISTER_DATA, GET_CUSTOMER_CART_DATA } from "../../../Grahpql/queries";
import { useMutation } from "@apollo/client";
import { notification } from "antd";
export default function UserPlaceOrder() {
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([])
    const [selectEditDelete, setSelectEditDelete] = useState(false);
    const getCustomerLocalData = useSelector(state => state.productDetails.LoginData);

    const { data, loading, error } = useQuery(GET_CUSTOMER_REGISTER_DATA, {
        variables: { id: getCustomerLocalData.customerId }
    })
    // console.log(addresses.Addresses.firstName,"-----------");
    const { data: customerCartData, loading: customerCartLoading, error: customerCartError, refetch: refetchCustomerCartData } = useQuery(GET_CUSTOMER_CART_DATA,
        {
            variables: { userId: getCustomerLocalData.customerId }
        })

    useEffect(() => {
        if (data && !loading && !error) {
            setAddresses(data.getCustomerRegister.Addresses)
        }
        if (!data && loading && !error) {
            console.log("loading......", loading)
        }
        if (!data && !loading && error) {
            console.log("error......", error)
        }
    }, [data, loading, error]);

    console.log(addresses, "---------")

    const [deleteCustomerCartData] = useMutation(DELETE_CUSTOMER_CART_DATA)
    const removeCustomerCartData = async (productId) => {
        try {
            await deleteCustomerCartData({ variables: { cartId: productId, userId: getCustomerLocalData.customerId } })
            notification.success({ description: "product successfully removed from your cart" })
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    const handlePlaceOrder = () => {

    }
    const CustomerAmountarray = customerCartData && customerCartData.getCustomerCartData.map((expanded) => expanded.expandedPrice)
    const CustomerTotalAmount = CustomerAmountarray ? CustomerAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : [];

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
                                        <h4 className="text-gAddressesray-600">{data && data.getCustomerRegister.email}</h4>
                                    </div>
                                    <div className="flex justify-start">
                                        <p className="text-gray-400">{data && data.getCustomerRegister.phoneNo}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Link href={'/customerHome/myAccount'}><span className="text-blue-400  hover:cursor-pointer hover:text-green-500">Change</span></Link>
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <div>
                                <h1>Addresses</h1>
                                <div>
                                    {
                                        addresses.map((address, index) => {
                                            // console.log(address);
                                            return (
                                                <div>
                                                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                                                    <div>
                                                        <h1>{address.address}</h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <div>{addresses.map((address, index) => {
                                return (
                                    <div className="border border-solid bg-white rounded-md my-8 p-3">
                                        <div className="flex gap-6">
                                            <input type="radio"></input>
                                            <p className="text-gray-600">{address.firstName}</p>
                                            <p className="text-gray-400 border border-gray-200 bg-gray-300 px-1 text-sm">Home</p>
                                            <p className="text-gray-600">{address.phoneNo}</p>
                                            <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setSelectEditDelete(true)} className="text-gray-500 cursor-pointer ml-auto" />
                                        </div>
                                        <div>
                                            <div className="flex gap-2 py-2">
                                                <p className="text-gray-500">{address.address},</p>
                                                <p className="text-gray-500">{address.district},</p>
                                                <p className="text-gray-500">{address.state}</p>
                                                <span>-</span>
                                                <p className="text-gray-500">{address.pincode}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}</div>
                        </div>
                    </div>
                    <div className="pb-10">
                        <div className="bg-white w-auto shadow-md h-full p-5 pb-6 rounded-md border-gray-300 border  hover:border-green-300 border-solid">
                            <div className="flex justify-center items-center bg-[#F5F7FA] h-10 w-80 m-auto rounded-sm mt-3">
                                <h3 className="text-[#51596B] font-normal">Order Summary</h3>
                            </div>
                            <div className="grid justify-center items-center mt-3">
                                {
                                    customerCartData && customerCartData.getCustomerCartData.map((cartItems, index) => {
                                        return (
                                            <div key={index} className="flex justify-between items-center gap-x-14 gap-y-10 pt-5">
                                                <div className="flex justify-start items-center">
                                                    <div>
                                                        <span className="float-right flex justify-center items-center relative bottom-2 right-3 bg-[#AAB1BC] border-0 h-5 w-5 text-sm rounded-full text-white">{cartItems.quantity}</span>
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
                                                    <FontAwesomeIcon onClick={() => removeCustomerCartData(cartItems._id, cartItems.productName)} icon={faDeleteLeft} className="text-red-300 hover:cursor-pointer hover:text-red-400" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex justify-between items-center mt-5 w-80 gap-2  border-b border-solid border-gray-300 p-2 border-t">
                                <label className="text-gray-700 font-medium">Total Amount :</label>
                                <p className="text-orange-400 font-medium">₹{CustomerTotalAmount}</p>
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
