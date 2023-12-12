import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus, faShoppingCart, faEye } from '@fortawesome/free-solid-svg-icons';
import { incrementProductCount, decrementProductCount, removeCartdata } from "@/Reducer/productReducer";
import { useRouter } from "next/router";
import Link from "next/link";

export default function cartItems() {

    const cartProducts = useSelector(state => state.productDetails.cartData);
    const dispatch = useDispatch()

    // Total price getting
    const priceGetting = cartProducts.map((total)=>total.price)
    const totalPrice = priceGetting.reduce((accumulator,currentValue)=>accumulator+currentValue, 0);

    // Total quantity
    const quantityGetting = cartProducts.map((total)=>console.log("total---",total)); 

    const handleRemoveDataFromLocal = (itemId) => {
        dispatch(removeCartdata(itemId))
    }

    const handleIncrementCount = (productId) => {
        dispatch(incrementProductCount({ productId }))
    }

    const handleDecrementCount = (productId) => {
        dispatch(decrementProductCount({ productId }))
    }
    return (
        <>
            <h1 className="text-2xl mt-2 ml-10">Good to see you here</h1>
            <div className="flex justify-center">
                <div>
                    {
                        cartProducts.map((listProducts, index) => {
                            // console.log(listProducts.price)
                            return (
                                <div className="border-dashed border-2 border-blue-600 h-auto w-full  my-8 mx-8 rounded-md" key={index}>
                                    <ul className="-my-8">
                                        <li className="flex flex-col space-y-1 py-10 text-left sm:flex-row sm:space-x-5 sm:space-y-1">
                                            <div className="shrink-0 relative">
                                                <img className="h-24 w-24 max-w-full m-2 rounded-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                            </div>
                                            <div className="relative flex flex-1 flex-col justify-between">
                                                <div className="sm:col-gap-3 sm:grid sm:grid-cols-2">
                                                    <div className="pr-8 sm:pr-5">
                                                        <p className="text-base font-semibold text-gray-900">Productname: {listProducts.productName}</p>
                                                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">Category: {listProducts.category}</p>
                                                    </div>
                                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start">
                                                        <p className="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-9 sm:text-right">Price: ₹{listProducts.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className='flex justify-center items-center gap-3'>Quantity :
                                                        <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(listProducts._id)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                        {
                                                            listProducts.count > 0 ? (
                                                                <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>{listProducts.count}</span>
                                                            ) : <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>0</span>
                                                        }
                                                        <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(listProducts._id)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                    </div>
                                                    <div className="ml-12">
                                                        <button type="submit" onClick={() => handleRemoveDataFromLocal(listProducts._id)} className=" hover:text-red-700">
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <Link href={`/adminStore/viewProduct/${listProducts._id}`}><FontAwesomeIcon icon={faEye} className='text-base text-blue-700 cursor-pointer ml-6' id={listProducts._id}></FontAwesomeIcon></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="m-auto">
                    <h2 className="ml-12 leading-loose text-3xl">Order Details</h2>
                    <div className="flex border-2 border-dashed border-blue-600 p-3 rounded-md">
                        <ul className="leading-loose text-xl">
                            <li>Price ({cartProducts.length > 1 ?`${cartProducts.length} - items`:`${cartProducts.length} - item`})</li>
                            <li>Discount</li>
                            <li>Delivery chagres</li>
                            <li>Total amount</li>
                        </ul>
                        <ul className="ml-6 mr-6 leading-loose text-xl">
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                        </ul>
                        <ul className="leading-loose text-xl">
                            <li>{totalPrice}</li>
                            <li>5</li>
                            <li>55</li>
                            <li>6000</li>
                        </ul>
                    </div>
                    <Link href={'placeOrder'}><button className="border-2 border-blue-600 w-52 h-16 ml-9 rounded-xl shadow-lg space-x-4 my-2 bg-sky-500 hover:bg-sky-700 text-2xl">Place Order</button></Link>
                </div>
                <Link href={'productList'} className="border-2 bg-blue-600 rounded-md w-20 h-10 text-xl pt-1 pl-4 mr-4"><button>Back</button></Link>
            </div >
        </>
    )
}