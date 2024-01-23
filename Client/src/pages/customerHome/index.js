
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOutCustomer } from '@/Reducer/productReducer';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { LOGIN_CUSTOMER, CREATE_CART_ITEMS, DELETE_CUSTOMER_CART_DATA, REMOVE_ALL_CUSTOMER_CART_DATA, INCREMENT_CUSTOMER_PRODUCT_QTY, DECREMENT_CUSTOMER_PRODUCT_QTY } from '../../../Grahpql/mutation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart, faSignOut, faGreaterThan, faShoppingBag, faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SolidUser } from '@heroicons/react/solid'
import { GET_ADD_TO_CART_SINGLE_PRODUCT_DATA, GET_ALL_PRODUCTS_DATA, GET_CUSTOMER_CART_DATA } from '../../../Grahpql/queries';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { storeAddToCartProductData, updateCartItemQuantity, removeCartdata, removeAllCartDatas, incrementProductCount, decrementProductCount } from '@/Reducer/productReducer';

import Link from 'next/link';
export default function index() {
    const dispatch = useDispatch();
    const [openProfile, setOpenProfile] = useState(false)
    const [openCart, setCart] = useState(false)
    const router = useRouter();
    const [getProductData, setgetProductData] = useState([])
    const [searchText, setSearchText] = useState('');
    const [allAddToCartId, setAddToCartId] = useState('');
    const [customerCartBulkData, setCustomerCartData] = useState([])

    const loginData = useSelector(state => state.productDetails.LoginData);
    const getCartData = useSelector(state => state.productDetails.cartData);

    const { data: productData, error: productError, loading: productLoading } = useQuery(GET_ALL_PRODUCTS_DATA);

    console.log("allAddToCartId-----------",allAddToCartId);
    const [parseIds, { data: getSingleCartData, error: getSingleCartError, loading: getSingleCartLoading }] = useLazyQuery(GET_ADD_TO_CART_SINGLE_PRODUCT_DATA, {
        variables: { ids: allAddToCartId }
    })

    const [storeCartDatas] = useMutation(CREATE_CART_ITEMS)
    const [deleteCustomerCartData] = useMutation(DELETE_CUSTOMER_CART_DATA)
    const [deleteAllCustomerCartData] = useMutation(REMOVE_ALL_CUSTOMER_CART_DATA)
    const [incrementCustomerCartQty] = useMutation(INCREMENT_CUSTOMER_PRODUCT_QTY)
    const [decrementCustomerCartQty] = useMutation(DECREMENT_CUSTOMER_PRODUCT_QTY)

    const { data: customerCartData, loading: customerCartLoading, error: customerCartError, refetch: refetchCustomerCartData } = useQuery(GET_CUSTOMER_CART_DATA,
        {
            variables: { userId: loginData.customerId }
        })

    const handleAddToCartToken = async (getProductId) => {
        const cart = productData.getAllProductsData.find((cart) => { return cart._id == getProductId })
        const updatObject = {
            ...cart,
            productID: cart._id
        }
        delete updatObject._id
        const { __typename, ...rest } = updatObject
        try {
            const { data } = await storeCartDatas({ variables: { productId: getProductId, userId: loginData.customerId, productCart: rest } })
            if (data.cartItems.quantity > 1) {
                refetchCustomerCartData();
                toast.success(`You changed the ${data.cartItems.productName} quantity to ${data.cartItems.quantity}.`, {
                    position: 'top-center',
                    autoClose: 3000,
                })
            }
            else {
                refetchCustomerCartData();
                toast.success("Item added to your cart", {
                    position: 'top-center',
                    autoClose: 3000,
                })
            }
        }
        catch (error) {
            toast.error("Cart is not added Successfully", {
                position: 'top-center',
                autoClose: 3000,
            })
        }
    }

    const handleAddtoCartBtn = async (getId, productName) => {
        parseIds();
        if (getId) {
            setAddToCartId(getId)
            console.log("firstTime-----------", allAddToCartId);
            // const cartData = getCartData.find((cart) => cart._id === getId)
            // if (cartData === undefined) {
            //     console.log("firstTime-----------", allAddToCartId);
            //     toast.success(`Item added to your cart: ${productName}`, {
            //         position: 'top-center',
            //         autoClose: 3000,
            //     })
            // }
            // else {
            //     console.log("already-----------", allAddToCartId);
                // toast.success(`You increased the quantity of the ${cartData.productName} to ${cartData.quantity}.`, {
                //     position: 'top-center',
                //     autoClose: 3000,
                // })
            // }
        }
        else {
            toast.error("Cart is not added Successfully", {
                position: 'top-center',
                autoClose: 3000,
            })
        }
    }

    const logOutUser = () => {
        dispatch(logOutCustomer());
        router.push('/customerLogin')
        toast.success("User logged out successfully", {
            position: 'top-right',
            autoClose: 3000,
        })
    }

    useEffect(() => {
        if (productData && !productError && !productLoading) {
            setgetProductData(productData.getAllProductsData)
        }
        if (customerCartData && !customerCartLoading && !customerCartError) {
            setCustomerCartData(customerCartData.getCustomerCartData)
        }
        if (getSingleCartData && !getSingleCartLoading && getSingleCartData.addToCartProductData) {
            dispatch(storeAddToCartProductData(getSingleCartData.addToCartProductData));
        }
        if (productError && !productData && !productLoading) {
            console.log("...Product Data Error");
        }
        if (productLoading && !productError && !productData) {
            console.log("...error");
        }

    }, [productData, getSingleCartData, customerCartData, customerCartBulkData]);

    // useEffect(() => {
    //     if (Object.keys(loginData).length === 0 || !loginData.token) {
    //         router.push('/customerLogin')
    //     }
    //     else {
    //         router.push('/customerHome')
    //     }

    const filteredList = getProductData.filter((item) => {
        return item.productName.toLowerCase().includes(searchText.toLowerCase());
    });
    // console.log(getProductData,"--------------");
    const handleRemoveDataFromLocal = (itemId, productName) => {
        dispatch(removeCartdata(itemId))
        toast.success(`${productName} removed from your cart`, {
            position: 'top-right',
            autoClose: 3000,
        });
    }

    const handleIncrementCount = (productId) => {
        const incrementData = getCartData.find((cart) => cart._id === productId)
        toast.success(`You increased the quantity of the ${incrementData.productName} to ${incrementData.quantity + 1}.`, {
            position: 'top-center',
            autoClose: 3000,
        })
        dispatch(incrementProductCount({ productId }))
    }

    const handleDecrementCount = (productId) => {
        const decrementData = getCartData.find((cart) => cart._id === productId)
        toast.success(`You decreased the quantity of the ${decrementData.productName} to ${decrementData.quantity - 1}.`, {
            position: 'top-center',
            autoClose: 3000,
        })
        dispatch(decrementProductCount({ productId }))
    }

    const handleIncrementQuantity = async (productId) => {
        try {
            const { data } = await incrementCustomerCartQty({ variables: { productId: productId, userId: loginData.customerId } })
            toast.success(`You increased the quantity of the ${data.incrementCustomerProductQty.productName} to ${data.incrementCustomerProductQty.quantity}.`, {
                position: 'top-center',
                autoClose: 3000,
            })
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error incrementing the item:', error);
        }
    }
    const handleDecrementQuantity = async (productId) => {
        try {
            const { data } = await decrementCustomerCartQty({ variables: { productId: productId, userId: loginData.customerId } })
            toast.success(`You reduced the quantity of the ${data.decrementCustomerProductQty.productName} to ${data.decrementCustomerProductQty.quantity}.`, {
                position: 'top-center',
                autoClose: 3000,
            })
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error decrementing the item:', error);
        }
    }
    const removeCustomerCartData = async (productId) => {
        try {
            await deleteCustomerCartData({ variables: { cartId: productId, userId: loginData.customerId } })
            toast.success("product successfully removed from your cart", {
                position: 'top-right',
                autoClose: 3000,
            });
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    const removeAllCustomerCartData = async () => {
        try {
            await deleteAllCustomerCartData({ variables: { userId: loginData.customerId } });
            toast.success("Your cart is currently empty now.", {
                position: 'top-right',
                autoClose: 3000,
            });
            refetchCustomerCartData();
        }
        catch (error) {
            console.error('Error deleting all items:', error);
        }
    }
    const removeAllCartData = () => {
        toast.success("Your cart is currently empty now.", {
            position: 'top-right',
            autoClose: 3000,
        });
        dispatch(removeAllCartDatas())
        setCart(false)
    }
    const myOrders = () => {
        router.push("/customerHome/myOrders")
    }
    const CustomerAmountarray = customerCartBulkData.map((expanded) => expanded.expandedPrice)
    const CustomerTotalAmount = CustomerAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const ExpandedAmountarray = getCartData.map((expanded) => expanded.expandedPrice)
    const totalExpandedAmount = ExpandedAmountarray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return (
        <>
            <div>
                <div>
                    <div className='flex justify-between p-10'>
                        <h1>Welcome to our site <span className='text-sky-400'>{loginData.name}</span></h1>
                        <div className='flex justify-between items-center gap-10'>
                            <input type='text' onChange={(e) => setSearchText(e.target.value)} placeholder='Search products' className='h-10 bg-gray-50 border-solid border border-gray-300 text-gray-600 text-sm rounded-lg hover:border-gray-500 focus:border-gray-500 outline-0 ps-5' />
                            <div className='relative bottom-3'>
                                <p className='relative left-4 top-1 text-white bg-yellow-600 text-base font-medium rounded-full h-6 w-6 flex justify-center items-center'>
                                    {
                                        loginData.token ? (customerCartData && customerCartData.getCustomerCartData.length || 0) : (getCartData.length)
                                    }
                                </p>
                                <FontAwesomeIcon onClick={() => setCart(true)} icon={faShoppingCart} className='text-gray-700 hover:text-gray-600 text-2xl cursor-pointer' />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faUserCircle} className='text-3xl text-gray-500 hover:cursor-pointer ' onClick={() => !openProfile ? setOpenProfile(true) : setOpenProfile(false)} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: openProfile ? 'block' : 'none' }}>
                        <div>{loginData.token ? <div className='grid justify-center items-center gap-3 z-10 bg-gray-200 absolute top-24 right-5 py-3 pl-10 w-56 rounded-sm shadow-lg'>
                            <div className='flex justify-start items-center gap-5 mr-10 bg-white p-2 w-44 pl-4 rounded-md'>
                                <Image src={"/Images/Balaprofile.png"} alt="Profile Image" width="40" height="40" className='rounded-full' />
                                <div>
                                    <span className='text-gray-900'>Hello,</span>
                                    <h1 className='text-gray-600'>{loginData.name}</h1>
                                </div>
                            </div>
                            <Link href={'/customerHome/myAccount'}>
                                <div className='flex justify-between items-center border border-solid hover:border-orange-400  w-44 bg-white py-2 px-3 rounded-md hover:cursor-pointer'>
                                    <span className="text-orange-400">My account</span>
                                    <FontAwesomeIcon icon={faGreaterThan} className='text-orange-400 font-mono' />
                                </div>
                            </Link>
                            <div onClick={myOrders} className='flex border border-solid hover:border-emerald-400 justify-around items-center w-44 bg-white p-2 rounded-md hover:cursor-pointer'>
                                <FontAwesomeIcon icon={faShoppingBag} className='text-emerald-400' />
                                <span className="text-emerald-400">My Orders</span>
                                <FontAwesomeIcon icon={faGreaterThan} className='text-emerald-400 font-mono' />
                            </div>
                            <div onClick={logOutUser} className='border cursor-pointer border-solid  flex justify-between w-44 items-center px-4 py-1 text-red-400 hover:text-white hover:bg-red-400 border-red-400 rounded-md'>
                                <FontAwesomeIcon icon={faSignOut} />
                                <span>LogOut</span>
                            </div>
                        </div> :
                            <div className='z-10 bg-gray-200 grid gap-y-3 items-center justify-center  absolute top-24 right-5 py-3 w-56 rounded-sm shadow-lg' >
                                <div onClick={myOrders} className='flex border border-solid hover:border-emerald-400 justify-around items-center w-44 bg-white p-2 rounded-md hover:cursor-pointer'>
                                    <FontAwesomeIcon icon={faShoppingBag} className='text-emerald-400' />
                                    <span className="text-emerald-400">My Orders</span>
                                    <FontAwesomeIcon icon={faGreaterThan} className='text-emerald-400 font-mono' />
                                </div>
                                <Link href={`/customerLogin`}>
                                    <div className='flex justify-around items-center w-44 bg-white p-2 border border-solid hover:border-emerald-400 rounded-md hover:cursor-pointer'>
                                        <FontAwesomeIcon icon={faShoppingBag} className='text-emerald-400' />
                                        <span className="text-emerald-400">Login</span>
                                        <FontAwesomeIcon icon={faGreaterThan} className='text-emerald-400 font-mono' />
                                    </div>
                                </Link>
                            </div>}
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
                                                <button onClick={() => { loginData.token ? handleAddToCartToken(item._id, item.productName) : handleAddtoCartBtn(item._id, item.productName) }} id={item._id} className="cursor-pointer flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
                <section className='h-screen py-12 sm:py-16 lg:py-20 absolute top-0 right-10' style={{ display: openCart ? 'block' : 'none' }}>
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mt-8 max-w-md md:mt-12">
                            <div className="rounded-3xl bg-white shadow-lg">
                                <div className='flex justify-between pl-8 pt-4 pr-8'>
                                    <h1 className='text-yellow-500'>SHOPPING CART</h1>
                                    <FontAwesomeIcon onClick={() => openCart ? setCart(false) : setCart(true)} icon={faClose} className='text-xl cursor-pointer hover:text-red-400' />
                                </div>
                                <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-96 p-2">
                                    {
                                        loginData.token ?
                                            customerCartBulkData.length > 0 ? (
                                                customerCartBulkData.map((listCartData, index) => {
                                                    return (
                                                        <div className="flow-root" key={listCartData._id}>
                                                            <ul className="-my-8">
                                                                <li className="flex flex-col space-y-1 py-10 text-left sm:flex-row sm:space-x-5 sm:space-y-1">
                                                                    <div className="shrink-0 relative">
                                                                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                                    </div>
                                                                    <div className="relative flex flex-1 flex-col justify-between">
                                                                        <div className="sm:col-gap-3 sm:grid sm:grid-cols-2">
                                                                            <div className="pr-8 sm:pr-5">
                                                                                <p className="text-base font-semibold text-gray-600">{listCartData.productName}</p>
                                                                                <p className="mx-0 mt-1 mb-0 text-base text-gray-500">₹{listCartData.price}</p>
                                                                            </div>
                                                                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                                                <p className="shrink-0 w-20 text-base font-semibold text-gray-700 sm:order-2 sm:ml-8 sm:text-right">₹{listCartData.expandedPrice}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-center items-center gap-32">
                                                                            <div className='flex justify-center items-center gap-3'>
                                                                                <button disabled={listCartData.quantity == 1} >
                                                                                    <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementQuantity(listCartData._id)} className={`${listCartData.quantity === 1 ? 'cursor-default' : "cursor-pointer"} border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs`} />
                                                                                </button>
                                                                                {
                                                                                    <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>{listCartData.quantity}</span>
                                                                                    // <input type='text' id={listCartData._id} className='flex justify-center hover:border-blue-300 items-center pl-3.5 border border-gray-400 w-10 rounded-sm' value={listCartData.count} onChange={handleQuantityChange} />
                                                                                }
                                                                                <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementQuantity(listCartData._id, listCartData.price)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                                            </div>
                                                                            <button type="submit" onClick={() => removeCustomerCartData(listCartData._id, listCartData.productName)} className="flex rounded p-2 text-center text-gray-700 transition-all duration-200 ease-in-out focus:shadow hover:text-red-500">
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
                                            :
                                            getCartData.length > 0 ? (
                                                getCartData.map((listCartData, index) => {
                                                    return (
                                                        <div className="flow-root" key={listCartData._id}>
                                                            <ul className="-my-8">
                                                                <li className="flex flex-col space-y-1 py-10 text-left sm:flex-row sm:space-x-5 sm:space-y-1">
                                                                    <div className="shrink-0 relative">
                                                                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                                                    </div>
                                                                    <div className="relative flex flex-1 flex-col justify-between">
                                                                        <div className="sm:col-gap-3 sm:grid sm:grid-cols-2">
                                                                            <div className="pr-8 sm:pr-5">
                                                                                <p className="text-base font-semibold text-gray-600">{listCartData.productName}</p>
                                                                                {/* <span>{listCartData.category}</span> */}
                                                                                <p className="mx-0 mt-1 mb-0 text-base text-gray-500">₹{listCartData.price}</p>
                                                                            </div>
                                                                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                                                <p className="shrink-0 w-20 text-base font-semibold text-gray-700 sm:order-2 sm:ml-8 sm:text-right">₹{listCartData.expandedPrice}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-center items-center gap-32">
                                                                            <div className='flex justify-center items-center gap-3'>
                                                                                <button disabled={listCartData.quantity == 1} >
                                                                                    <FontAwesomeIcon icon={faMinus} onClick={() => handleDecrementCount(listCartData._id)} className={`${listCartData.quantity === 1 ? 'cursor-default' : "cursor-pointer"} border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs`} />
                                                                                </button>
                                                                                {
                                                                                    <span className='border border-gray-400 w-10 rounded-sm flex justify-center items-center'>{listCartData.quantity}</span>
                                                                                    // <input type='text' id={listCartData._id} className='flex justify-center hover:border-blue-300 items-center pl-3.5 border border-gray-400 w-10 rounded-sm' value={listCartData.count} onChange={handleQuantityChange} />
                                                                                }
                                                                                <FontAwesomeIcon icon={faPlus} onClick={() => handleIncrementCount(listCartData._id, listCartData.price)} className='cursor-pointer border border-solid border-blue-300 font-thin rounded-xl p-1 text-xs' />
                                                                            </div>
                                                                            <button type="submit" onClick={() => handleRemoveDataFromLocal(listCartData._id, listCartData.productName)} className="flex rounded p-2 text-center text-gray-700 transition-all duration-200 ease-in-out focus:shadow hover:text-red-500">
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
                                        ) : ""

                                    }
                                    {
                                        customerCartBulkData.length > 1 ? (
                                            <div div className='flex justify-end'>
                                                <span onClick={removeAllCustomerCartData} className='cursor-pointer hover:text-red-600'>Remove All</span>
                                            </div>
                                        ) : ""
                                    }

                                </div>
                                <div className='flex justify-around'>
                                    <h5>Total Amount: </h5>
                                    <p>₹{loginData.token ? CustomerTotalAmount : totalExpandedAmount}</p>
                                </div>
                                <div className="flex justify-center place-items-center gap-2 pb-8">
                                    <div className='flex justify-center items-center pt-5'>
                                        <button type='button' onClick={() => { setCart(false) }} className='bg-transparent  text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded hover:text-cyan-600 hover:border-cyan-600'>Continue Shopping</button>
                                    </div>
                                    <div className='flex justify-center items-center pt-5'>
                                        <Link href="/cartItems">
                                            <button type="button" className="items-center justify-center rounded-md bg-orange-500 py-2 px-4 text-sm font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                                View Cart
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </>

    )
}
