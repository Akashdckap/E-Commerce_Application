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
        }
        else {
            console.log('-----------Error order', orderError);
        }

    }, [orderData, orderLoading, orderError]);
    console.log(orderDatas)
    return (
        <>
            <div>
                <div>
                    <div>
                        {orderDatas.map((item, index) => {
                            return (
                                <div className=" border border-gray-400 my-10 mx-8">
                                    <div className="flex space-x-96 m-5">
                                        <div>
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
                                                <label>Description</label>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="m-auto">
                                                <label>Quantity</label>
                                                <p>{item.count}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label>Category</label>
                                            <p>{item.category}</p>
                                        </div>
                                        <div>
                                            <label>Total Price</label>
                                            <p>{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )

}