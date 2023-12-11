import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { incrementProductCount, decrementProductCount, removeCartdata } from "@/Reducer/productReducer";

export default function placeOrder() {

    const cartProducts = useSelector(state => state.productDetails.cartData);
    const dispatch = useDispatch()

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
                            return (
                                <div className="border-dashed border-2 border-blue-600 h-auto my-8 mx-8 rounded-md" key={index}>
                                    <ul className="-my-8">
                                        <li className="flex flex-col space-y-1 py-10 text-left sm:flex-row sm:space-x-5 sm:space-y-1">
                                            <div className="shrink-0 relative">
                                                <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                            </div>
                                            <div className="relative flex flex-1 flex-col justify-between">
                                                <div className="sm:col-gap-3 sm:grid sm:grid-cols-2">
                                                    <div className="pr-8 sm:pr-5">
                                                        <p className="text-base font-semibold text-gray-900">{listProducts.productName}</p>
                                                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{listProducts.category}</p>
                                                    </div>
                                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start">
                                                        <p className="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">₹{listProducts.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center gap-x-12">
                                                    <div className='flex justify-center items-center gap-3'>
                                                        <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(listProducts._id)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                        {
                                                            listProducts.count > 0 ? (
                                                                <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>{listProducts.count}</span>
                                                            ) : <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>0</span>
                                                        }
                                                        <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(listProducts._id)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                    </div>
                                                    <button type="submit" onClick={() => handleRemoveDataFromLocal(listProducts._id)} className="pr-4 hover:text-red-700">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="border-dashed border-2 border-blue-600 h-auto p-1 m-auto rounded-md flex justify-center">
                    <form>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Name</label>
                            <span className="ml-20">:</span>
                            <input type="text" placeholder="Name" className="border-2 border-blue-600 rounded-lg ml-20 mt-6 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Email</label>
                            <span className="mx-20">:</span>
                            <input type="text" placeholder="Email" className="border-2 border-blue-600 rounded-lg ml-2 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">PhoneNo</label>
                            <span className="mx-10">:</span>
                            <input type="Number" placeholder="Phone No..." className="border-2 border-blue-600 rounded-lg ml-12 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Address</label>
                            <span className="mx-14">:</span>
                            <input type="Address" placeholder="Address" className="border-2 border-blue-600 rounded-lg ml-8 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">District</label>
                            <span className="mx-16">:</span>
                            <input type="District" placeholder="District" className="border-2 border-blue-600 rounded-lg ml-6 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">Pincode</label>
                            <span className="mx-14">:</span>
                            <input type="Pincode" placeholder="Pincode" className="border-2 border-blue-600 rounded-lg ml-8 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <label className="leading-loose text-2xl ml-6">State</label>
                            <span className="mx-20">:</span>
                            <input type="State" placeholder="State" className="border-2 border-blue-600 rounded-lg ml-4 mr-8 mt-4 h-12 pl-2"></input>
                        </div>
                        <div>
                            <button className="border-4 border-blue-600 pl-20 w-60 h-16 mx-auto rounded-xl shadow-lg flex items-center space-x-4 my-4 text-2xl">Submit</button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}