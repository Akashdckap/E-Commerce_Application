
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOutCustomer } from '@/Reducer/productReducer';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faShoppingCart, faSignOut, faGreaterThan, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { GET_ADD_TO_CART_SINGLE_PRODUCT_DATA, GET_ALL_PRODUCTS_DATA } from '../../../Grahpql/queries';
import { useLazyQuery, useQuery } from '@apollo/client'
export default function index() {
    const dispatch = useDispatch();
    const [openProfile, setOpenProfile] = useState(false)
    const router = useRouter();
    const [getProductData, setgetProductData] = useState([])
    const [searchText, setSearchText] = useState('');
    const [allAddToCartId, setAddToCartId] = useState('');

    const getCartData = useSelector(state => state.productDetails.cartData);

    const { data: productData, error: productError, loading: productLoading } = useQuery(GET_ALL_PRODUCTS_DATA);

    const loginData = useSelector(state => state.productDetails.LoginData);

    const logOutUser = () => {
        dispatch(logOutCustomer());
        router.push('/customerLogin')
        notification.success({ message: "User logged out successfully  " })
    }

    useEffect(() => {
        if (productData && !productError && !productLoading) {
            setgetProductData(productData.getAllProductsData)
        }
        if (productError && !productData && !productLoading) {
            console.log("...Product Data Error");
        }
        if (productLoading && !productError && !productData) {
            console.log("...error");
        }

    }, [productData, productError, productLoading]);

    useEffect(() => {
        if (Object.keys(loginData).length === 0 || !loginData.token) {
            router.push('/customerLogin')
        }
        else {
            router.push('/customerHome')
        }
    }, [])
    console.log("loginData----------", loginData.token);

    const filteredList = getProductData.filter((item) => {
        return item.productName.toLowerCase().includes(searchText.toLowerCase());
    });

    const handleAddtoCartBtn = (getId) => {
        if (getId) {
            setAddToCartId(getId)
        }
        else {
            console.log("Not get the Id to store in cart");
        }
    }
    const { data: getSingleCartData, error: getSingleCartError, loading: getSingleCartLoading } = useLazyQuery(GET_ADD_TO_CART_SINGLE_PRODUCT_DATA, {
        variables: { ids: allAddToCartId }
    })
    console.log("cartData-------",getSingleCartData)
    return (
        <>
            <div>
                <div>
                    <div className='flex justify-between p-10'>
                        <h1>Welcome to our site <span className='text-sky-400'>{loginData.name}</span></h1>
                        <div className='flex justify-between items-center gap-10'>
                            <input type='text' onChange={(e) => setSearchText(e.target.value)} placeholder='Search products' className='h-10 bg-gray-50 border-solid border border-gray-300 text-gray-600 text-sm rounded-lg hover:border-gray-500 focus:border-gray-500 outline-0 ps-5' />
                            <div className='relative bottom-3'>
                                <p className='relative left-4 top-1 text-white bg-yellow-600 text-base font-medium rounded-full h-6 w-6 flex justify-center items-center'>{getCartData.length}</p>
                                <FontAwesomeIcon icon={faShoppingCart} className='text-gray-700 hover:text-gray-600 text-2xl cursor-pointer' />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faUserCircle} className='text-3xl text-gray-500 hover:cursor-pointer ' onClick={() => !openProfile ? setOpenProfile(true) : setOpenProfile(false)} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: openProfile ? 'block' : 'none' }}>
                        <div className='grid justify-center items-center gap-3 z-10 bg-gray-200 absolute top-24 right-5 py-3 pl-10 w-56 rounded-sm shadow-lg' >
                            <div className='flex justify-start items-center gap-5 mr-10 bg-white p-2 w-44 pl-4 rounded-md'>
                                <Image src={"/Images/Balaprofile.png"} alt="Profile Image" width="40" height="40" className='rounded-full' />
                                <div>
                                    <span className='text-gray-900'>Hello,</span>
                                    <h1 className='text-gray-600'>{loginData.name}</h1>
                                </div>
                            </div>
                            <div className='flex justify-around items-center w-44 bg-white p-2 rounded-md hover:cursor-pointer'>
                                <FontAwesomeIcon icon={faShoppingBag} className='text-emerald-400' />
                                <span className="text-emerald-400">My Orders</span>
                                <FontAwesomeIcon icon={faGreaterThan} className='text-emerald-400 font-mono' />
                            </div>
                            <div onClick={logOutUser} className='border cursor-pointer border-solid  flex justify-between w-44 items-center px-4 py-1 text-red-400 hover:text-white hover:bg-red-400 border-red-400 rounded-md'>
                                <FontAwesomeIcon icon={faSignOut} />
                                <span>LogOut</span>
                            </div>
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
        </>

    )
}
