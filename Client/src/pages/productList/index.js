import React, { useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { notification } from 'antd';
import { useEffect } from 'react';
import { GET_ADD_TO_CART_SINGLE_PRODUCT_DATA, GET_ALL_PRODUCTS_DATA } from '../../../Grahpql/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { storeAddToCartProductData, updateCartItemQuantity, removeCartdata, removeAllCartDatas, incrementProductCount, decrementProductCount } from '@/Reducer/productReducer';
// import useCartIdState from './useAddToCartId';
export default function ProductList() {
    const getCartData = useSelector(state => state.productDetails.cartData);

    const dispatch = useDispatch()
    const [openCart, setCart] = useState()
    const [getProductData, setgetProductData] = useState([])
    // const [allAddToCartId, setAddToCartId] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [allAddToCartId, setAddToCartId] = useState('');
    const [quantity, setQuantity] = useState(0);
    // const { allAddToCartId, addToCartArray, removeIdFromArray, removeAllItems } = useCartIdState()

    // const { data: getSingleData, error: getSingleError, loading: getSingleLoading } = useQuery(GET_ADD_TO_CART_SINGLE_PRODUCT_DATA, {
    //     variables: { ids: allAddToCartId }
    // })
    const [parseIds, { data: getSingleData, error: getSingleError, loading: getSingleLoading }] = useLazyQuery(GET_ADD_TO_CART_SINGLE_PRODUCT_DATA, {
        variables: { ids: allAddToCartId }
    });
    const { data: getDataError, error: getError, loading: getLoading } = useQuery(GET_ALL_PRODUCTS_DATA);

    console.log("allAddToCartId----------------", allAddToCartId);
    const handleAddtoCartBtn = (getId, Qty) => {
        parseIds()
        console.log("getids-----------", getId);
        if (getId) {
            setAddToCartId(getId)
        }
        notification.success({ message: 'Successfully added to cart' });
        console.log("getSingleData-------", getSingleData);
        // const datas = JSON.parse(localStorage.getItem('productData'))
        // datas.productDetails.cartData.map((list) => {
        //     if (list._id === getId) {
        //         if (list.count !== list.count) {
        //             notification.success({ message: 'Successfully added to cart' })
        //         }
        //         else {
        //             notification.success({ message: `You ve changed ${list.productName} QUANTITY to ${list.count + 1}` })
        //         }
        //     }
        // })
    }
    useEffect(() => {
        if (getDataError && !getLoading) {
            setgetProductData(getDataError.getAllProductsData);
        }
        console.log("getSingleData-----------", getSingleData);
        if (getSingleData && !getLoading) {
            dispatch(storeAddToCartProductData(getSingleData.addToCartProductData));
        }
        if (getLoading) return console.log('Loading...');
        if (getSingleData) return console.log('Loading...');
        if (getSingleError) return console.error('Error fetching data:', getSingleError);
        if (getError) return console.error('Error fetching data:', getSingleError);
    }, [getError, getDataError, getSingleData]);

    const handleRemoveDataFromLocal = (itemId) => {
        dispatch(removeCartdata(itemId))
    }

    const removeAllCartData = () => {
        dispatch(removeAllCartDatas())
        setCart(false)
    }
    const filteredList = getProductData.filter((item) => {
        return item.productName.toLowerCase().includes(searchText.toLowerCase());
    });

    const handleIncrementCount = (productId) => {
        dispatch(incrementProductCount({ productId }))
    }

    const handleDecrementCount = (productId) => {
        dispatch(decrementProductCount({ productId }))
    }
    console.log("quantity", quantity);

    // const handleQuantityChange = (e) => {
    //     console.log(e.target.value);
    //     const newQuantity = parseInt(e.target.value, 10) || 1;
    //     dispatch(updateCartItemQuantity({ productId: e.target.id, newQuantity }));
    // };

    const valuesArray = getCartData.map((total) => total.price)
    const totalAmount = valuesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return (
        <>
            <div>
                <div className='flex justify-between item-center mt-10 pl-10 pr-20'>
                    <h1 className='mb-4 text-4xl font-normal p-4 flex justify-center items-center text-gray-900 dark:text-cyan-600'>Product list</h1>
                    <div className='flex justify-center item-center'>
                        <div className='flex justify-center item-center gap-10'>
                            <input type="text" onChange={(e) => setSearchText(e.target.value)} className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full ps-5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Search products..." />
                            <Link href="adminStore"><button type="button" className="h-10 w-40 py-2.5 px-5 me-2 mb-2 mr-10 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Go to Store</button></Link>
                        </div>
                        <div className='relative bottom-4'>
                            <p className='relative left-5 top-2 text-yellow-500 text-lg font-semibold'>{getCartData.length}</p>
                            <FontAwesomeIcon onClick={() => setCart(true)} icon={faShoppingCart} className='text-white-400  mb-10 text-2xl cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className='ml-6'>
                    <div className='z-0 flex w-auto justify-start item-center flex-wrap flex-row'>
                        {
                            filteredList.length > 0 ? (
                                filteredList.map((item, index) =>
                                    <div key={index} className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
                                        <a>
                                            <img className="h-60 rounded-t-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                        </a>
                                        <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                                        <div className="mt-4 px-5 pb-5">
                                            <div className="flex items-center gap-2">
                                                <label className='text-blue-400'>Name :</label>
                                                <h5 className='text-xl font-semibold tracking-tight text-slate-900'>{item.productName}</h5>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className='text-blue-400'>Brand :</label>
                                                <span>{item.brand}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <label className='text-blue-400'>Description </label>
                                                <span>{item.description}.....</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <label className='text-blue-400'>Color : </label>
                                                <p>{item.color}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p>
                                                    <span className="text-3xl font-bold text-slate-900">₹{item.price}</span>
                                                </p>
                                                <button onClick={() => handleAddtoCartBtn(item._id)} id={item._id} className="cursor-pointer flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (<div className='flex mt-20 items-center justify-center mb-24 m-auto w-2/6 px-4 py-5'>
                                    <h3 className='text-red-500 mb-10'>{searchText} Not found</h3>
                                </div>)
                        }
                    </div>
                </div>
            </div>
            <section className='h-screen py-12 sm:py-16 lg:py-20 absolute top-0 right-10' style={{ display: openCart ? 'block' : 'none' }}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mt-8 max-w-md md:mt-12">
                        <div className="rounded-3xl bg-white shadow-lg">
                            <div className='flex justify-between pl-8 pt-4 pr-8'>
                                <h1 className='text-yellow-500'>SHOPPING CART</h1>
                                <FontAwesomeIcon onClick={() => setCart(false)} icon={faClose} className='text-xl cursor-pointer hover:text-red-400' />
                            </div>
                            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-96 p-2">
                                {
                                    getCartData.length > 0 ? (
                                        getCartData.map((listCartData, index) => {
                                            // console.log(listCartData.price.sum());
                                            return (
                                                // setTotalAmount(listCartData.price),
                                                <div className="flow-root" key={listCartData._id}>
                                                    <ul className="-my-8">
                                                        <li className="flex flex-col space-y-1 py-10 text-left sm:flex-row sm:space-x-5 sm:space-y-1">
                                                            <div className="shrink-0 relative">
                                                                <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                            </div>
                                                            <div className="relative flex flex-1 flex-col justify-between">
                                                                <div className="sm:col-gap-3 sm:grid sm:grid-cols-2">
                                                                    <div className="pr-8 sm:pr-5">
                                                                        <p className="text-base font-semibold text-gray-900">{listCartData.productName}</p>
                                                                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{listCartData.category}</p>
                                                                    </div>
                                                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                                        <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">₹{listCartData.price}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-center items-center gap-32">
                                                                    <div className='flex justify-center items-center gap-3'>
                                                                        <button disabled={listCartData.count == 1} >
                                                                            <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(listCartData._id)} className={`${listCartData.count === 1 ? 'cursor-default' : "cursor-pointer"} border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs`} />
                                                                        </button>
                                                                        {
                                                                            <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>{listCartData.count}</span>
                                                                            // <input type='text' id={listCartData._id} className='flex justify-center hover:border-blue-300 items-center pl-3.5 border border-gray-400 w-10 rounded-sm' value={listCartData.count} onChange={handleQuantityChange} />
                                                                        }
                                                                        <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(listCartData._id, listCartData.price)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                                    </div>
                                                                    <button type="submit" onClick={() => handleRemoveDataFromLocal(listCartData._id, listCartData.productName)} className="flex rounded p-2 text-center text-gray-950 transition-all duration-200 ease-in-out focus:shadow hover:text-red-500">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    ) : <div>
                                        <Image
                                            src="/Images/noCart.png"
                                            alt="No Carts Found Image"
                                            style={{ paddingTop: '30px', padding: '50px' }}
                                            width={400}
                                            height={200}
                                        />
                                    </div>
                                }
                                {
                                    getCartData.length > 1 ? (
                                        <div className='flex justify-end'>
                                            <span onClick={removeAllCartData} className='cursor-pointer hover:text-red-600'>Remove All</span>
                                        </div>
                                    ) : ''
                                }

                            </div>
                            <div className='flex justify-around'>
                                <h5>Total Amount: </h5>
                                <p>₹{totalAmount}</p>
                            </div>
                            <div className="flex justify-center place-items-center gap-2 pb-8">
                                <div className='flex justify-center items-center pt-5'>
                                    <button type='button' onClick={() => { setCart(false) }} className='bg-transparent  text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded hover:text-cyan-600 hover:border-cyan-600'>Continue Shopping</button>
                                </div>
                                <div className='flex justify-center items-center pt-5'>
                                    <Link href="cartItems">
                                        <button type="button" className="items-center justify-center rounded-md bg-orange-500 py-2 px-4 text-sm font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                            View Cart
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
