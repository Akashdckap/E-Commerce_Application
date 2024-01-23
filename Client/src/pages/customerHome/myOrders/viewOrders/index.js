import React from 'react'
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS } from '../../../../../Grahpql/queries';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
export default function ViewOrders() {
    const router = useRouter();
    const { orderId } = router.query
    const loginData = useSelector(state => state.productDetails.LoginData);
    const { data: customerOrders, loading: customerLoading, error: customerError } = useQuery(GET_CUSTOMER_ORDERS, {
        variables: { userId: orderId }
    });

    // const orderedList = customerOrders && customerOrders.getCustomerOrders.find((orders) => orders._id === orderId)
    // console.log("orderedProducts--------", orderedList && orderedList.orderedProducts);
    return (
        <>
            {/* <div className='flex justify-between items-center px-4 mx-28 py-5 '>
                <h1 className='text-amber-600 text-xl'>Your Orders (<span className='text-slate-600'>{orderedList && orderedList.orderedProducts.length}</span>)</h1>
                <Link href={'/customerHome/myOrders'} className="flex justify-start items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                    <p className="cursor-pointer text-blue-500">Back to Orders</p>
                </Link>
                className="border border-gray-300 rounded-md hover:border-green-300 border-solid bg-slate-300"
            </div> */}
            <div className='flex'>
                <div className="my-2 mx-10">
                    <div>
                        <h2 className="leading leading-loose text-3xl text-gray-700 ">Ordered Products - {customerOrders && customerOrders.getCustomerOrders.length}</h2>
                    </div>
                    <table>
                        <thead>
                            <tr className='bg-teal-100 border rounded-md'>
                                <th className='px-5 py-2 text-blue-400'>S.no</th>
                                <th className='px-5 py-2 text-blue-400'>Product Name</th>
                                <th className='px-5 py-2 text-blue-400'>Category</th>
                                <th className='px-5 py-2 text-blue-400'>Brand</th>
                                <th className='px-5 py-2 text-blue-400'>quantity</th>
                                <th className='px-5 py-2 text-blue-400'>Price</th>
                                <th className='px-5 py-2 text-blue-400'>Expanded Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerOrders && customerOrders.getCustomerOrders.map((orderProducts, index) => (
                                orderProducts.orderedProducts.map((orderData, indexData) => {
                                    return (
                                        <tr className="text-center border border-gray-300 bg-white rounded-md hover:bg-green-300 border-solid" key={index}>
                                            <td className="py-2 text-gray-700">{indexData + 1}</td>
                                            <td className="py-2 text-gray-700">{orderData.productName}</td>
                                            <td className="py-2 text-gray-700">{orderData.category}</td>
                                            <td className="py-2 text-gray-700">{orderData.brand}</td>
                                            <td className="py-2 text-gray-700">{orderData.quantity}</td>
                                            <td className="py-2 text-gray-700">{orderData.price}</td>
                                            <td className="py-2 text-gray-700">{orderData.expandedPrice}</td>
                                        </tr>
                                    )
                                })
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <div className="flex gap-3 items-center border border-gray-400 rounded-md py-3 px-3 bg-white hover:bg-green-300">
                            <h4 className="text-gray-700">Total Price: </h4>
                            <p className="text-gray-700">{customerOrders && customerOrders.getCustomerOrders[0].totalPrice}</p>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="flex gap-36">
                        <h2 className="leading leading-loose text-2xl text-gray-700">Shipping Details</h2>
                        <Link href={`/customerHome/myOrders`}><button className="border border-green-300 w-20 h-10 bg-blue-300 hover:bg-blue-700 rounded-md text-gray-700">Back</button></Link>
                    </div>
                    <div>
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
                            <div>{
                                customerOrders && customerOrders.getCustomerOrders.map((shippingData) => {
                                    {
                                        return (
                                            <>
                                                <p className="py-1 text-gray-700">{shippingData.shippingAddress.firstName}</p>
                                                <p className="py-1 text-gray-700">{shippingData.shippingAddress.lastName}</p>
                                                <p className="py-1 text-gray-700">{shippingData.shippingAddress.email}</p>
                                                <p className="py-1 text-gray-700">{shippingData.shippingAddress.phoneNo}</p>
                                                <p className="py-1 text-gray-700">{shippingData.shippingAddress.address}</p>
                                                <p className="py-1 text-gray-700">{shippingData.shippingAddress.district}</p>
                                                <p className="py-1 text-gray-700">{shippingData.shippingAddress.state}</p>
                                            </>
                                        )
                                    }
                                })}
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
                            <div>{
                                customerOrders && customerOrders.getCustomerOrders.map((billingData) => {
                                    {
                                        return (
                                            <>
                                                <p className="py-1 text-gray-700">{billingData.billingAddress.firstName}</p>
                                                <p className="py-1 text-gray-700">{billingData.billingAddress.lastName}</p>
                                                <p className="py-1 text-gray-700">{billingData.billingAddress.email}</p>
                                                <p className="py-1 text-gray-700">{billingData.billingAddress.phoneNo}</p>
                                                <p className="py-1 text-gray-700">{billingData.billingAddress.address}</p>
                                                <p className="py-1 text-gray-700">{billingData.billingAddress.district}</p>
                                                <p className="py-1 text-gray-700">{billingData.billingAddress.state}</p>
                                            </>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='grid gap-4'>
                {
                    customerOrders && customerOrders.getCustomerOrders.map((item, index) => (
                        <div key={index} className='flex justify-between items-start hover:shadow-lg px-6 bg-white hover:border-green-200 hover:cursor-pointer border border-solid py-3 mx-32 rounded-md'>
                            <div className='flex justify-between gap-6'>
                                <div>
                                    <img className="h-16 rounded-md object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                </div>
                                <div className='grid'>
                                    <h1 className='text-gray-900 '>{item.productName}</h1>
                                    <p className='text-gray-400 font-light'>Color: {item.color}</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-gray-700'>₹{item.expandedPrice}</p>
                            </div>
                            <div className='grid justify-center gap-1'>
                                <p className='text-gray-700'>Delivered on Jul 04,2023</p>
                                <p className='text-green-700 font-light'>Your item has been delivered</p>
                            </div>
                        </div>
                    ))
                }
            </div> */}
        </>
    )
}
