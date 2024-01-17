import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus, faShoppingCart, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { incrementProductCount, decrementProductCount, removeCartdata, removeAllCartDatas } from "@/Reducer/productReducer";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { toast } from "react-toastify";
import { REMOVE_ALL_CUSTOMER_CART_DATA, DELETE_CUSTOMER_CART_DATA, INCREMENT_CUSTOMER_PRODUCT_QTY, DECREMENT_CUSTOMER_PRODUCT_QTY } from "../../../Grahpql/mutation";
import { GET_CART_ITEMS, GET_CUSTOMER_CART_DATA } from "../../../Grahpql/queries";
import { useQuery } from "@apollo/client";

export default function cartItems() {
    const router = useRouter();

    const cartProducts = useSelector(state => state.productDetails.cartData);
    const loginData = useSelector(state => state.productDetails.LoginData);
    const { data: customerCartData, loading: customerCartLoading, error: customerCartError, refetch: refetchCustomerCartData } = useQuery(GET_CUSTOMER_CART_DATA,
        {
            variables: { userId: loginData.customerId }
        })
    const dispatch = useDispatch()
    const handleRemoveDataFromLocal = (itemId, itemName) => {
        dispatch(removeCartdata(itemId));
        toast.success(`Successfully removed ${itemName} from your cart`, {
            position: 'top-right',
            autoClose: 3000,
        });
    }
    const handleRemoveAllItems = () => {
        dispatch(removeAllCartDatas())
    };

    // const cartData = useSelector(state => state.productDetails.cartData);

    // useEffect(() => {
    //     if (Object.keys(loginData).length === 0 || !loginData.token) {
    //         router.push('/customerLogin');
    //     } else {
    //         router.push('/cartItems');
    //     }
    // }, [cartProducts])
    const CustomerAmountarray = customerCartData && customerCartData.getCustomerCartData.map((expanded) => expanded.expandedPrice)
    const CustomerTotalAmount = CustomerAmountarray ? CustomerAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : [];

    const expandedAmountarray = cartProducts.map((expanded) => expanded.expandedPrice)
    const totalExpandedAmount = expandedAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const handleIncrementCount = (productId) => {
        dispatch(incrementProductCount({ productId }))
    }

    const handleDecrementCount = (productId) => {
        dispatch(decrementProductCount({ productId }))
    }

    const [deleteCustomerCartData] = useMutation(DELETE_CUSTOMER_CART_DATA)
    const [deleteAllCustomerCartData] = useMutation(REMOVE_ALL_CUSTOMER_CART_DATA)
    const [incrementCustomerCartQty] = useMutation(INCREMENT_CUSTOMER_PRODUCT_QTY)
    const [decrementCustomerCartQty] = useMutation(DECREMENT_CUSTOMER_PRODUCT_QTY)
    const removeAllCustomerCartData = async () => {
        try {
            await deleteAllCustomerCartData({ variables: { userId: loginData.customerId } })
            // notification.error({ description: "product successfully removed from your cart" })
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error deleting all items:', error);
        }
    }
    const removeCustomerCartData = async (productId) => {
        try {
            await deleteCustomerCartData({ variables: { cartId: productId, userId: loginData.customerId } })
            toast.success('Successfully removed item from your cart', {
                position: 'top-right',
                autoClose: 3000,
            });
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error deleting item:', error);
        }
    }
    const handleIncrementQuantity = async (productId) => {
        try {
            await incrementCustomerCartQty({ variables: { productId: productId, userId: loginData.customerId } })
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error incrementing the item:', error);
        }
    }
    const handleDecrementQuantity = async (productId) => {
        try {
            await decrementCustomerCartQty({ variables: { productId: productId, userId: loginData.customerId } })
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error decrementing the item:', error);
        }
    }
    // const linkComponent = !loginData.token && cartProducts ? (
    //     <Link href="/productList">
    //         <button className="bg-white w-96 border border-solid border-gray-400 hover:border-orange-300 p-3 h-10 flex justify-center items-center hover:text-orange-400 text-gray-600 font-bold py-2 px-4 rounded">
    //             Back to Shop
    //         </button>
    //     </Link>
    // ) : (
    //     <Link href="/customerHome">
    //         <button className="bg-white w-96 border border-solid border-gray-400 hover:border-orange-300 p-3 h-10 flex justify-center items-center hover:text-orange-400 text-gray-600 font-bold py-2 px-4 rounded">
    //             Back to Shop
    //         </button>
    //     </Link>
    // );

    return (
        <>
            <div className="flex justify-start mt-10 ml-20">
                <h1 className="text-2xl text-start text-gray-700">Your Shopping Cart ( <span className="text-orange-400">{loginData.token ? customerCartData && customerCartData.getCustomerCartData.length : cartProducts.length} items</span>)</h1>
                {/* <Link href={'/productList'}><button className="bg-slate-600 hover:bg-slate-500 hover:text-orange-400 text-white font-bold py-2 px-4 rounded">
                    Back
                </button></Link> */}
            </div>

            <div className="flex justify-between items-start mt-5 pb-10 gap-10">
                <div>
                    <table className="table ml-20 shadow-md bg-white border border-gray-300 border-none rounded">
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
                            loginData.token ?
                                customerCartData && customerCartData.getCustomerCartData.length > 0 ?
                                    customerCartData && customerCartData.getCustomerCartData.map((cartData, index) => {
                                        return (
                                            <tbody className="text-center" key={index}>
                                                <tr className="hover:bg-gray-100 border-t-0">
                                                    <td className="py-2 px-3 border-b">
                                                        <div className="flex justify-start items-center gap-3">
                                                            <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                            <div>
                                                                <p className="text-orange-600 text-start">{cartData.productName}</p>
                                                                <p className="text-start text-gray-500">{cartData.category}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-2 border-b border-t-0 text-gray-500">₹ {cartData.price}</td>
                                                    <td className="py-2 px-4 border-b border-t-0">
                                                        <div className='flex justify-center items-center gap-3'>
                                                            <button disabled={cartData.quantity == 1} >
                                                                <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementQuantity(cartData._id)} className={`${cartData.quantity === 1 ? 'cursor-default' : "cursor-pointer"} text-gray-500 border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs`} />
                                                            </button>
                                                            {
                                                                cartData.quantity > 0 ? (
                                                                    <span className='border border-gray-400 w-10 rounded-sm flex text-gray-500 justify-center items-center'>{cartData.quantity}</span>
                                                                ) : <span className='border border-gray-400 w-10 rounded-sm flex text-gray-500 justify-center items-center'>0</span>

                                                            }
                                                            <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementQuantity(cartData._id)} className='cursor-pointer border border-solid text-gray-500 border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-t-0 font-medium text-gray-500">₹ {cartData.expandedPrice}</td>
                                                    <td className="py-2 px-4 border-b border-t-0">< FontAwesomeIcon icon={faTrash} onClick={() => removeCustomerCartData(cartData._id)} className="hover:text-red-400 cursor-pointer text-gray-600" /></td>
                                                </tr>
                                            </tbody>
                                        )
                                    }) : <div>
                                        <h1>No Items Found</h1>
                                    </div>
                                : cartProducts.length > 0 ?
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
                                                            <button disabled={cartData.quantity == 1} >
                                                                <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(cartData._id)} className={`${cartData.count === 1 ? 'cursor-default' : "cursor-pointer"} text-gray-500 border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs`} />
                                                            </button>
                                                            {
                                                                cartData.quantity > 0 ? (
                                                                    <span className='border border-gray-400 w-10 rounded-sm flex text-gray-500 justify-center items-center'>{cartData.quantity}</span>
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
                        loginData.token ?
                            customerCartData && customerCartData.getCustomerCartData.length > 1 ? <div className="flex justify-end items-end mt-4">
                                <button className="text-red-400 hover:text-red-500 cursor-pointer ml-20 p-1 h-9 rounded w-28 font-normal text-base flex justify-center items-center border border-red-300" onClick={removeAllCustomerCartData}>Clear Cart</button>
                            </div> : ""
                            :
                            cartProducts.length > 1 ? <div className="flex justify-end items-end mt-4">
                                <button className="text-red-400 hover:text-red-500 cursor-pointer ml-20 p-1 h-9 rounded w-28 font-normal text-base flex justify-center items-center border border-red-300" onClick={handleRemoveAllItems}>Clear Cart</button>
                            </div> : ""
                    }
                </div>
                <div className="grid justify-start gap-4 pb-10 pl-10 pr-10 mr-20 bg-white rounded pt-5 shadow-md p-6 mb-6 border-gray-900">
                    <p className="text-green-600 border-b border-gray-400 pb-1">PRICE DETAILS</p>
                    <div className="flex justify-between gap-10">
                        <label className="text-gray-500">Price ({loginData.token ? customerCartData && customerCartData.getCustomerCartData.length : cartProducts.length} - items) :</label>
                        <p className="text-gray-500">₹{loginData.token ? CustomerTotalAmount : totalExpandedAmount}</p>
                    </div>
                    <div className="flex justify-between gap-10">
                        <label className="text-gray-500">Discount :</label>
                        <p className="text-red-400">₹-219</p>
                    </div>
                    <div className="flex justify-between gap-10 border-b-2 border-dotted border-gray-400 pt-2 pb-2 border-t-2">
                        <label className="text-gray-600 font-medium">Total Amount :</label>
                        <p className="text-gray-600 font-medium">₹{loginData.token ? CustomerTotalAmount : totalExpandedAmount}</p>
                    </div>
                    <div className="grid gap-3 pt-2">
                        <Link href={'/placeOrder'}><button className="bg-slate-600 w-96 hover:bg-slate-500 p-3 h-10 flex justify-center items-center hover:text-green-400 text-white font-medium py-2 px-4 rounded">PROCEED TO CHECKOUT</button></Link>
                        <Link href={'/customerHome'}><button className="bg-white w-96 border border-solid border-gray-400 hover:border-orange-300 p-3 h-10 flex justify-center items-center hover:text-orange-400 text-gray-600 font-bold py-2 px-4 rounded">Back to Shop</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}