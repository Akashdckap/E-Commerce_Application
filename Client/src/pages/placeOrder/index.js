import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { incrementProductCount,decrementProductCount,removeCartdata } from "@/Reducer/productReducer";

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
            <h1>Good to see you</h1>
            <div>
                <div className="border-dashed border-2 border-blue-600 w-2/3 h-auto p-1 m-auto rounded-md">
                    {
                        cartProducts.map((listProducts, index) => {
                            return (
                                <div className="flow-root" key={index}>
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
                                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                        <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">₹{listProducts.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center gap-32">
                                                    <div className='flex justify-center items-center gap-3'>
                                                        <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(listProducts._id)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                        {
                                                            listProducts.count > 0 ? (
                                                                <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>{listProducts.count}</span>
                                                            ) : <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>0</span>
                                                        }
                                                        <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(listProducts._id)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                    </div>
                                                    <button type="submit" onClick={() => handleRemoveDataFromLocal(listProducts._id)} className="flex rounded p-2 text-center text-gray-950 transition-all duration-200 ease-in-out focus:shadow hover:text-red-500">
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
                <div>
                    <form>
                        <div>
                            <label>Name: </label>
                            <input type="text" placeholder="Name"></input>
                        </div>
                        <div>
                            <label>Email: </label>
                            <input type="text" placeholder="Email"></input>
                        </div>
                        <div>
                            <label>PhoneNo: </label>
                            <input type="Number" placeholder="Phone No..."></input>
                        </div>
                        <div>
                            <label>Addres: </label>
                            <input type="Address" placeholder="Address"></input>
                        </div>
                        <div>
                            <label>District</label>
                            <input type="District" placeholder="District"></input>
                        </div>
                        <div>
                            <label>Pincode</label>
                            <input type="Pincode" placeholder="District"></input>
                        </div>
                        <div>
                            <label>State</label>
                            <input type="State" placeholder="State"></input>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}