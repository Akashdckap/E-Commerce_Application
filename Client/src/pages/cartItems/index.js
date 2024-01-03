import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus, faShoppingCart, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { incrementProductCount, decrementProductCount, removeCartdata, removeAllCartDatas } from "@/Reducer/productReducer";
import { useRouter } from "next/router";
import Link from "next/link";
import { notification } from "antd";

export default function cartItems() {
    const router = useRouter();
    const cartProducts = useSelector(state => state.productDetails.cartData);
    const dispatch = useDispatch()
    const handleRemoveDataFromLocal = (itemId, itemName) => {
        dispatch(removeCartdata(itemId))
        notification.success({ message: `Successfully removed ${itemName} from your cart` })
    }
    const handleRemoveAllItems = () => {
        dispatch(removeAllCartDatas())
    };

    // useEffect(() => {
    //     if (cartProducts.length < 1) {
    //         router.push("/productList")
    //     }
    // }, [cartProducts])

    const expandedAmountarray = cartProducts.map((expanded) => expanded.expandedPrice)
    const totalExpandedAmount = expandedAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const handleIncrementCount = (productId) => {
        dispatch(incrementProductCount({ productId }))
    }

    const handleDecrementCount = (productId) => {
        dispatch(decrementProductCount({ productId }))
    }
    return (
        <>
            <div className="flex justify-start mt-10 ml-20">
                <h1 className="text-2xl text-start text-gray-700">Your Shopping Cart ( <span className="text-orange-400">{cartProducts.length} items</span>)</h1>
                {/* <Link href={'/productList'}><button className="bg-slate-600 hover:bg-slate-500 hover:text-orange-400 text-white font-bold py-2 px-4 rounded">
                    Back
                </button></Link> */}
            </div>

            <div className="flex justify-between items-start mt-5 pb-10">
                <div>
                    <table className="table-auto bg-white border border-gray-300 ml-20 border-none rounded">
                        <thead className="text-center">
                            <tr>
                                <th className="py-2 px-4 border-b text-left pl-8 text-indigo-400 font-medium">Item</th>
                                <th className="py-2 px-4 border-b text-indigo-400 font-medium">Price</th>
                                <th className="py-2 px-4 border-b text-indigo-400 font-medium">Quantity</th>
                                <th className="py-2 px-4 border-b text-indigo-400 font-medium w-20">Expanded Price</th>
                                <th className="py-2 px-4 border-b text-indigo-400 font-medium">Action</th>
                            </tr>
                        </thead>
                        {
                            cartProducts.length > 0 ?
                                cartProducts.map((cartData, index) => {
                                    return (
                                        <tbody className="text-center" key={index}>
                                            <tr className="hover:bg-gray-100 border-t-0">
                                                <td className="py-2 px-4 border-b">
                                                    <div className="flex justify-start items-center gap-3">
                                                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                        <div>
                                                            <p className="text-orange-600 text-start">{cartData.productName}</p>
                                                            <p className="text-start text-gray-500">{cartData.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4 border-b border-t-0 text-gray-500">₹ {cartData.price}</td>
                                                <td className="py-2 px-4 border-b border-t-0">
                                                    <div className='flex justify-center items-center gap-3'>
                                                        <button disabled={cartData.count == 1} >
                                                            <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(cartData._id)} className={`${cartData.count === 1 ? 'cursor-default' : "cursor-pointer"} text-gray-500 border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs`} />
                                                        </button>
                                                        {
                                                            cartData.count > 0 ? (
                                                                <span className='border border-gray-400 w-10 rounded-sm flex text-gray-500 justify-center items-center'>{cartData.count}</span>
                                                            ) : <span className='border border-gray-400 w-10 rounded-sm flex text-gray-500 justify-center items-center'>0</span>

                                                        }
                                                        <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(cartData._id)} className='cursor-pointer border border-solid text-gray-500 border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4 border-b border-t-0 font-medium text-gray-500">₹ {cartData.expandedPrice}</td>
                                                <td className="py-2 px-4 border-b border-t-0">< FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveDataFromLocal(cartData._id, cartData.productName)} className="hover:text-red-400 cursor-pointer text-gray-600" /></td>
                                            </tr>
                                        </tbody>
                                    )
                                }) : <div>
                                    <h1>No Items Found</h1>
                                </div>
                        }
                    </table>
                    {
                        cartProducts.length > 1 ? <div className="flex justify-end items-end mt-4">
                            <button className="text-red-400 hover:text-red-500 cursor-pointer ml-20 p-1 h-9 rounded w-28 font-normal text-base flex justify-center items-center border border-red-300" onClick={handleRemoveAllItems}>Clear Cart</button>
                        </div> : ""
                    }
                </div>
                <div className="grid justify-start gap-4 pb-10 pl-10 pr-10 mr-20 bg-white rounded pt-5 shadow-sm p-6 mb-6 border-gray-900">
                    <p className="text-green-600 border-b border-gray-400 pb-1">PRICE DETAILS</p>
                    <div className="flex justify-between gap-10">
                        <label className="text-gray-500">Price ({cartProducts.length} - items) :</label>
                        <p className="text-gray-500">₹{totalExpandedAmount}</p>
                    </div>
                    <div className="flex justify-between gap-10">
                        <label className="text-gray-500">Discount :</label>
                        <p className="text-red-400">₹-219</p>
                    </div>
                    <div className="flex justify-between gap-10 border-b-2 border-dotted border-gray-400 pt-2 pb-2 border-t-2">
                        <label className="text-gray-600 font-medium">Total Amount :</label>
                        <p className="text-gray-600 font-medium">₹{totalExpandedAmount}</p>
                    </div>
                    <div className="grid gap-3 pt-2">
                        <Link href={`${cartProducts.length === 0 ? '/productList' : '/placeOrder'} `}><button className="bg-slate-600 w-96 hover:bg-slate-500 p-3 h-10 flex justify-center items-center hover:text-green-400 text-white font-medium py-2 px-4 rounded">{cartProducts.length === 0 ? "GO TO HOME" : "PROCEED TO CHECKOUT"}</button></Link>
                        <Link href={'/productList'}><button className="bg-white w-96 border border-solid border-gray-400 hover:border-orange-300 p-3 h-10 flex justify-center items-center hover:text-orange-400 text-gray-600 font-bold py-2 px-4 rounded">Back to Shop</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}