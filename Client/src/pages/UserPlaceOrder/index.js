import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShippingFast, faUser, faDeleteLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { DELETE_CUSTOMER_CART_DATA, ORDER_PRODUCT } from "../../../Grahpql/mutation";
import { GET_CUSTOMER_REGISTER_DATA, GET_CUSTOMER_CART_DATA } from "../../../Grahpql/queries";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export default function UserPlaceOrder() {
    const router = useRouter()
    const [selectShippingId, setSelectShippingAddress] = useState()
    const [selectBillingId, setSelectBillingAddress] = useState()
    const getCustomerLocalData = useSelector(state => state.productDetails.LoginData);

    const { data: addressesData, loading: addressesLoading, error: addressesError } = useQuery(GET_CUSTOMER_REGISTER_DATA, {
        variables: { id: getCustomerLocalData.customerId }
    })
    // console.log(addresses.Addresses.firstName,"-----------");
    const { data: customerCartData, loading: customerCartLoading, error: customerCartError, refetch: refetchCustomerCartData } = useQuery(GET_CUSTOMER_CART_DATA,
        {
            variables: { userId: getCustomerLocalData.customerId }
        })

    const [deleteCustomerCartData] = useMutation(DELETE_CUSTOMER_CART_DATA)
    const [createOrders] = useMutation(ORDER_PRODUCT)
    const removeCustomerCartData = async (productId, productName) => {
        try {
            await deleteCustomerCartData({ variables: { cartId: productId, userId: getCustomerLocalData.customerId } })
            toast.success(`${productName} removed from your cart`, {
                position: 'top-right',
                autoClose: 3000,
            })
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error deleting item:', error);
        }
    }
    const handlePlaceOrder = async () => {
        try {
            const finalData = customerCartData.getCustomerCartData.map(({ _id, __typename, ...rest }) => ({ ...rest }));

            if (!selectShippingId) {
                toast.error("Please select a shipping address.", {
                    position: 'top-right',
                    autoClose: 3000,
                })
                return;
            }
            const selectedShippingAddress = addressesData.getCustomerRegister.Addresses.find(address => address._id === selectShippingId);
            const { __typename: shippingTypename, _id: shippingId, ...shippingData } = selectedShippingAddress

            if (!selectBillingId) {
                toast.error("Please select a billing address or .", {
                    position: 'top-right',
                    autoClose: 3000,
                })
                return;
            }
            const selectedBillingAddress = addressesData.getCustomerRegister.Addresses.find(Billaddress => Billaddress._id === selectBillingId);
            const { __typename: billingTypename, _id: billingId, ...billingData } = selectedBillingAddress
            const orderedInputData = {
                orderedProducts: finalData,
                personalDetails: {
                    name: addressesData.getCustomerRegister.name,
                    email: addressesData.getCustomerRegister.email,
                    phoneNo: addressesData.getCustomerRegister.phoneNo,
                    customerId: addressesData.getCustomerRegister._id
                },
                shippingAddress: shippingData,
                billingAddress: billingData
            }
            const { data: orderSubmitData, errors: SubmitOrderError } = await (createOrders({
                variables: {
                    inputs: orderedInputData
                },
            }));
            if (SubmitOrderError) {
                toast.error("Order Submission error", {
                    position: 'top-right',
                    autoClose: 3000,
                });
                router.push("/UserPlaceOrder")
            }
            if (orderSubmitData) {
                toast.success("Order Submitted", {
                    position: 'top-right',
                    autoClose: 3000,
                });
                router.push("/orderSubmitted")
            }
            return { orderSubmitData, SubmitOrderError }
        }
        catch (error) {
            if (error.graphQLErrors) {
                console.error("GraphQL Validation Errors:", error.graphQLErrors);
                toast.error("Order Submission Error", {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            console.error("place order error :", error);
        }
    }

    const CustomerAmountarray = customerCartData && customerCartData.getCustomerCartData.map((expanded) => expanded.expandedPrice)
    const CustomerTotalAmount = CustomerAmountarray ? CustomerAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : [];

    return (
        <>
            <div className="overflow-y-scroll custom-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-screen p-2 mr-1 rounded-2xl">
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
                <div className="flex justify-between items-start mt-5 pl-20 pr-5 gap-20 mb-5">
                    <div className="grid">
                        <div>
                            <div className='flex p-5 w-auto gap-44 hover:border-green-300 justify-between items-center bg-white rounded-md border border-solid' >
                                <div className="flex justify-start items-center gap-8">
                                    <FontAwesomeIcon icon={faUser} className="text-green-400 text-lg" />
                                    <div className="flex justify-start gap-3">
                                        <h4 className="text-gray-600">{addressesData && addressesData.getCustomerRegister.name}</h4>
                                        <h4 className="text-gray-600">
                                            {
                                                addressesData && addressesData.getCustomerRegister.email.length > 18
                                                    ? addressesData.getCustomerRegister.email.slice(0, 18) + '....'
                                                    : addressesData && addressesData.getCustomerRegister.email
                                            }
                                        </h4>
                                    </div>
                                    <div className="flex justify-start">
                                        <p className="text-gray-400">{addressesData && addressesData.getCustomerRegister.phoneNo}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Link href={'/customerHome/myAccount'}><span className="text-blue-400  hover:cursor-pointer hover:text-green-500">Change</span></Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-start items-center mt-5 gap-x-3">
                                <h1 className="text-[#575F70] text-lg font-medium">Shipping Address</h1>
                                <FontAwesomeIcon icon={faShippingFast} className="text-green-400 text-lg" />
                            </div>
                            <div className="">
                                <div className="border border-solid border-gray-300 hover:border-gray-400 shadow-sm rounded-md flex flex-wrap justify-center py-6 items-start gap-x-4 gap-y-4 mt-3">
                                    {
                                        addressesData && addressesData.getCustomerRegister.Addresses.map((shipping, index) => {
                                            return (
                                                <div key={index} onClick={() => setSelectShippingAddress(shipping._id)} className={`${selectShippingId === shipping._id ? 'border-emerald-300 shadow-lg border-2' : 'border-gray-300 shadow-sm'} bg-white grid gap-y-1 border w-52 border-solid  p-3 rounded-md`} >
                                                    <h1 className="text-emerald-300 font-normal text-lg">{shipping.firstName}{shipping.lastName}</h1>
                                                    <p className="text-gray-500">{shipping.phoneNo}</p>
                                                    <p className="w-36 text-gray-400">{shipping.address}</p>
                                                    <p className="text-gray-400">{shipping.district}</p>
                                                    <p className="text-gray-400">{shipping.pincode}</p>
                                                    <p className="text-gray-400">{shipping.country}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-start items-center mt-5 gap-x-3">
                                <div className="flex">
                                    <h1 className="text-[#575F70] text-lg font-medium">Billing Address</h1>
                                    <FontAwesomeIcon icon={faShippingFast} className="text-sky-400 text-lg" />
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="grid justify-start items-start mt-4">
                                <button onClick={() => setSelectBillingAddress(selectShippingId)} type="submit" className="p-2 flex justify-center items-center cursor-pointer text-orange-600 bg-white h-10 w-56 rounded hover:border-orange-400 border hover:bg-orange-50 hover:shadow-lg transition-all duration-300">Same as Shipping Address</button>
                            </div>
                            {/* <div className=" w-auto border border-solid border-gray-300 hover:border-gray-400 shadow-sm rounded-md mt-3"> */}
                            <div className="border border-solid border-gray-300 hover:border-gray-400 shadow-sm rounded-md flex flex-wrap justify-center py-6 items-start gap-x-4 gap-y-4 mt-3">
                                {
                                    addressesData && addressesData.getCustomerRegister.Addresses.map((billing, index) => {
                                        return (
                                            <div key={index} onClick={() => setSelectBillingAddress(billing._id)} className={` ${selectBillingId === billing._id ? 'border-sky-400 shadow-lg border-2' : 'border-gray-300 shadow-sm'}bg-white grid gap-y-1 border w-52 border-solid  p-3 rounded-md`} >
                                                <h1 className="text-sky-300 font-normal text-lg">{billing.firstName}{billing.lastName}</h1>
                                                <p className="text-gray-500">{billing.phoneNo}</p>
                                                <p className="w-36 text-gray-400">{billing.address}</p>
                                                <p className="text-gray-400">{billing.district}</p>
                                                <p className="text-gray-400">{billing.pincode}</p>
                                                <p className="text-gray-400">{billing.country}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                         
                            {/* </div> */}
                        </div>
                    </div>
                    {/* <div className="pb-10"> */}
                    <div className="bg-white w-auto shadow-md h-full p-5 pb-6 rounded-md border-gray-300 border  hover:border-green-300 border-solid">
                        <div className="flex justify-center items-center bg-[#F5F7FA] h-10 w-80 m-auto rounded-sm mt-3">
                            <h3 className="text-[#51596B] font-normal">Order Summary</h3>
                        </div>
                        <div className="grid justify-center items-center mt-3 overflow-y-scroll custom-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-screen p-2 rounded-2xl">
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
                        <div className="flex justify-center items-center mt-5 w-auto gap-x-36 mx-4 border-b border-solid border-gray-300 p-2 border-t">
                            <label className="text-gray-700 font-medium">Total Amount :</label>
                            <p className="text-orange-400 font-medium">₹{CustomerTotalAmount}</p>
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <button onClick={handlePlaceOrder} className={`bg-white w-80 border border-solid border-gray-400 hover:border-green-300 p-3 h-10 flex justify-center items-center hover:text-white hover:bg-green-400 text-gray-600 font-bold rounded cursor-pointer}`} >PLACE ORDER</button>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}
