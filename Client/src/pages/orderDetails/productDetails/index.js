import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GET_ORDER_PRODUCT_DETAILS } from "../../../../Grahpql/queries";
import { useQuery } from "@apollo/client";


export default function ProductDetails() {
    const router = useRouter();
    const { orderId } = router.query;
    const [orderDatas, setOrderDatas] = useState([]);
    const [personalData, setPersonalData] = useState('');
    const [shippingData, setShippingData] = useState('');
    const [billingAddress, setBillingDetails] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    // console.log(orderId)
    const { data: orderData, loading: orderLoading, error: orderError } = useQuery(GET_ORDER_PRODUCT_DETAILS, {
        variables: { id: orderId }
    });
    useEffect(() => {
        if (orderData && !orderLoading) {
            // console.log('-----------orderData', orderData)
            setOrderDatas(orderData.getOrderProductDetails.orderedProducts);
            setPersonalData(orderData.getOrderProductDetails.personalDetails);
            setShippingData(orderData.getOrderProductDetails.shippingAddress);
            setBillingDetails(orderData.getOrderProductDetails.billingAddress);
            setTotalPrice(orderData.getOrderProductDetails.totalPrice)
        }
        else {
            console.log('-----------Error order', orderError);
        }

    }, [orderData, orderLoading, orderError]);
    console.log(orderDatas.length)
    return (
        <>
            <div>
                <div className="flex">
                    <div className="my-2 mx-10">
                        <div>
                            <h2 className="leading leading-loose text-3xl text-gray-700">Ordered Products - {orderDatas.length}</h2>
                        </div>
                        <table className="border border-gray-400 rounded-md">
                            <thead>
                                <tr className="border border-gray-400 bg-white rounded-md hover:border-green-300 border-solid">
                                    <th className="px-5 py-2 text-indigo-400">S.No</th>
                                    <th className="px-5 py-2 text-indigo-400">Product Name</th>
                                    <th className="px-5 py-2 text-indigo-400">Category</th>
                                    <th className="px-5 py-2 text-indigo-400">Brand</th>
                                    <th className="px-5 py-2 text-indigo-400">Quantity</th>
                                    <th className="px-5 py-2 text-indigo-400">Price</th>
                                    <th className="px-5 py-2 text-indigo-400">Expanded Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDatas.map((item, index) => {
                                    return (
                                        <tr className="text-center border border-gray-300 bg-white rounded-md hover:bg-green-300 border-solid">
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
                                <h4>Total Price: </h4>
                                <p className="">{totalPrice}</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <h2 className="leading leading-loose text-2xl text-gray-700">Shipping Details</h2>
                        <div className="border border-gray-400 py-3 px-6 flex bg-white rounded-md hover:border-green-300 border-solid">
                            <div>
                                <p className="py-1">firstName</p>
                                <p className="py-1">lastName</p>
                                <p className="py-1">Email</p>
                                <p className="py-1">PhoneNo</p>
                                <p className="py-1">Address</p>
                                <p className="py-1">District</p>
                                <p className="py-1">State</p>
                            </div>
                            <div className="mx-3">
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                            </div>
                            <div>
                                <p className="py-1">{shippingData.firstName}</p>
                                <p className="py-1">{shippingData.lastName}</p>
                                <p className="py-1">{shippingData.email}</p>
                                <p className="py-1">{shippingData.phoneNo}</p>
                                <p className="py-1">{shippingData.address}</p>
                                <p className="py-1">{shippingData.district}</p>
                                <p className="py-1">{shippingData.state}</p>
                            </div>

                        </div>
                        <h2 className="leading leading-loose text-2xl text-gray-700">Billing Details</h2>
                        <div className="border border-gray-400 py-3 px-6 flex bg-white rounded-md hover:border-green-300 border-solid">
                            <div>
                                <p className="py-1">firstName</p>
                                <p className="py-1">lastName</p>
                                <p className="py-1">Email</p>
                                <p className="py-1">PhoneNo</p>
                                <p className="py-1">Address</p>
                                <p className="py-1">District</p>
                                <p className="py-1">State</p>
                            </div>
                            <div className="mx-3">
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                                <p className="py-1">:</p>
                            </div>
                            <div>
                                <p className="py-1">{billingAddress.firstName}</p>
                                <p className="py-1">{billingAddress.lastName}</p>
                                <p className="py-1">{billingAddress.email}</p>
                                <p className="py-1">{billingAddress.phoneNo}</p>
                                <p className="py-1">{billingAddress.address}</p>
                                <p className="py-1">{billingAddress.district}</p>
                                <p className="py-1">{billingAddress.state}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}


// <div className=" border border-gray-400 mx-8">
{/* <div className="flex space-x-96 m-5"> */ }
{/* <div>
                                            <div>
                                                <label>Product Name</label>
                                                <p>{item.productName}</p>
                                            </div>
                                            <div>
                                                <label>Brand</label>
                                                <p>{item.brand}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label>Category</label>
                                                <p>{item.description}</p>
                                            </div>
                                            <div>
                                                <label>Quantity</label>
                                                <p>{item.count}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label>Price</label>
                                            <p>{item.price}</p>
                                        </div>
                                        <div>
                                            <label>Total Price</label>
                                            <p>{item.price}</p>
                                        </div> */}
{/* </div> */ }
// </div>