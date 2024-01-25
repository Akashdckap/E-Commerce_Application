import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GET_ORDER_PRODUCT_DETAILS } from "../../../../Grahpql/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
export default function ProductDetails() {
    const router = useRouter();
    const { orderId } = router.query;
    const [orderDatas, setOrderDatas] = useState([]);
    const [personalData, setPersonalData] = useState('');
    const [shippingData, setShippingData] = useState('');
    const [billingAddress, setBillingDetails] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const { data: orderData, loading: orderLoading, error: orderError } = useQuery(GET_ORDER_PRODUCT_DETAILS, {
        variables: { id: orderId }
    });
    useEffect(() => {
        if (orderData && !orderLoading) {
            setOrderDatas(orderData.getOrderProductDetails.orderedProducts);
            setPersonalData(orderData.getOrderProductDetails.personalDetails);
            setShippingData(orderData.getOrderProductDetails.shippingAddress);
            setBillingDetails(orderData.getOrderProductDetails.billingAddress);
            setTotalPrice(orderData.getOrderProductDetails.totalPrice)
        }
        if (orderError) {
            return orderError
        }

    }, [orderData, orderLoading, orderError]);
    return (
        <>
            <div className="flex overflow-y-scroll custom-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-screen p-2 mr-1 rounded-2xl">
                <div className="my-2 mx-10">
                    <div>
                        <h2 className="leading leading-loose text-3xl text-gray-700 ">Ordered Products - {orderDatas.length}</h2>
                    </div>
                    <table className="border border-gray-400 rounded-md hover:border-green-300">
                        <thead>
                            <tr className="border border-gray-300 rounded-md hover:border-green-300 border-solid bg-slate-300">
                                <th className="px-5 py-2 text-blue-400">S.No</th>
                                <th className="px-5 py-2 text-blue-400">Product Name</th>
                                <th className="px-5 py-2 text-blue-400">Category</th>
                                <th className="px-5 py-2 text-blue-400">Brand</th>
                                <th className="px-5 py-2 text-blue-400">Quantity</th>
                                <th className="px-5 py-2 text-blue-400">Price</th>
                                <th className="px-5 py-2 text-blue-400">Expanded Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDatas.map((item, index) => {
                                return (
                                    <tr className="text-center border border-gray-300 bg-white rounded-md hover:bg-green-300 border-solid" key={index}>
                                        <td className="py-2 text-gray-700">{index + 1}</td>
                                        <td className="py-2 text-gray-700">{item.productName}</td>
                                        <td className="py-2 text-gray-700">{item.category}</td>
                                        <td className="py-2 text-gray-700">{item.brand}</td>
                                        <td className="py-2 text-gray-700">{item.count}</td>
                                        <td className="py-2 text-gray-700">{item.price}</td>
                                        <td className="py-2 text-gray-700">{item.expandedPrice}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <div className="flex gap-3 items-center border border-gray-400 rounded-md py-3 px-3 bg-white hover:bg-green-300">
                            <h4 className="text-gray-700">Total Price: </h4>
                            <p className="text-gray-700">{totalPrice}</p>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="flex gap-36">
                        <h2 className="leading leading-loose text-2xl text-gray-700">Shipping Details</h2>
                        <Link href={`/orderDetails`}><button className="border border-green-300 w-20 h-10 bg-blue-300 hover:bg-blue-700 rounded-md text-gray-700">Back</button></Link>
                    </div>
                    <div className="border border-gray-400 py-3 px-6 flex bg-white rounded-md hover:border-green-300 border-solid">
                        <div>
                            <p className="py-1 text-gray-700">firstName</p>
                            <p className="py-1 text-gray-700">lastName</p>
                            <p className="py-1 text-gray-700">Email</p>
                            <p className="py-1 text-gray-700">PhoneNo</p>
                            <p className="py-1 text-gray-700">Address</p>
                            <p className="py-1 text-gray-700">District</p>
                            <p className="py-1 text-gray-700">State</p>
                        </div>
                        <div className="mx-3">
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                        </div>
                        <div>
                            <p className="py-1 text-gray-700">{shippingData.firstName}</p>
                            <p className="py-1 text-gray-700">{shippingData.lastName}</p>
                            <p className="py-1 text-gray-700">{shippingData.email}</p>
                            <p className="py-1 text-gray-700">{shippingData.phoneNo}</p>
                            <p className="py-1 text-gray-700">{shippingData.address}</p>
                            <p className="py-1 text-gray-700">{shippingData.district}</p>
                            <p className="py-1 text-gray-700">{shippingData.state}</p>
                        </div>

                    </div>
                    <h2 className="leading leading-loose text-2xl text-gray-700">Billing Details</h2>
                    <div className="border border-gray-400 py-3 px-6 flex bg-white rounded-md hover:border-green-300 border-solid">
                        <div>
                            <p className="py-1 text-gray-700">firstName</p>
                            <p className="py-1 text-gray-700">lastName</p>
                            <p className="py-1 text-gray-700">Email</p>
                            <p className="py-1 text-gray-700">PhoneNo</p>
                            <p className="py-1 text-gray-700">Address</p>
                            <p className="py-1 text-gray-700">District</p>
                            <p className="py-1 text-gray-700">State</p>
                        </div>
                        <div className="mx-3">
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                            <p className="py-1 text-gray-700">:</p>
                        </div>
                        <div>
                            <p className="py-1 text-gray-700">{billingAddress.firstName}</p>
                            <p className="py-1 text-gray-700">{billingAddress.lastName}</p>
                            <p className="py-1 text-gray-700">{billingAddress.email}</p>
                            <p className="py-1 text-gray-700">{billingAddress.phoneNo}</p>
                            <p className="py-1 text-gray-700">{billingAddress.address}</p>
                            <p className="py-1 text-gray-700">{billingAddress.district}</p>
                            <p className="py-1 text-gray-700">{billingAddress.state}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
