import React, { useEffect, useState } from 'react'
import { Upload, notification } from 'antd';
// import { useMutation } from '@apollo /client'
import Link from 'next/link';
import { CREATE_PRODUCTS, UPLOAD_FILE } from '../../Grahpql/mutation';
// import { getProductList } from '../../Grahpql/queries';
import { GET_ALL_PRODUCTS } from '../../Grahpql/queries';
import { useMutation, useQuery } from '@apollo/client';

export default function adminStore() {
    const [formOpen, setFormOpen] = useState(false);
    const [image, setImage] = useState('')

    const [productData, setProductData] = useState({
        productName: "",
        category: "",
        brand: "",
        price: "",
        weight: "",
        color: "",
        description: ""
    });
    const [productErrors, setProductErrors] = useState({
        image: "",
        productName: "",
        category: "",
        brand: "",
        price: "",
        weight: "",
        color: "",
        description: ""
    });
    const [createProducts, { data, loading, error }] = useMutation(CREATE_PRODUCTS)

    const validate = () => {
        let newErrors = { ...productErrors };
        let isVaild = true;
        if (productData.productName.trim() === "" && productData.category.trim() === "" && productData.description.trim() === "" && productData.price.trim === "") {
            newErrors.productName = 'product name is required';
            newErrors.category = 'category is required';
            newErrors.description = 'description is required';
            newErrors.price = 'price is required';
            isVaild = false;
        }
        setProductErrors(newErrors)
        return isVaild
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
        delete productErrors[name]
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

    }

    // useEffect(() => {
    //     console.log(data);
    //     console.log(error);
    // }, [])
    // console.log(error);  

    // const handleUploadImage = (e) => {
    //     const file = e.target.files[0]
    //     setImage(file)
    //     // console.log(file);
    // }
    // productData.append('image', file)
    // console.log(productData);

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })
    const handleSingleImage = (e) => {
        const file = e.target.files[0]
        console.log(file);
        if (!file) return
        uploadFile({ variables: file })
    }
    const [createProducts, { data, loading, error }] = useMutation(CREATE_PRODUCTS)
    console.log(error);
    const handleProductForm = async (e) => {
        e.preventDefault()
        // setFormOpen(false)
        if (validate()) {
            try {
                await (createProducts({ variables: { productDatas: productData } }))
            }
            catch (error) {
                console.log(error);
            }
            // alert("okay")
        }
        // setFormOpen(false)
        // else {
        //     alert("not okay")
        // }
    }
    // console.log("-----------------------",productData)

    const { data: getDataError, error: getError, loading: getLoading } = useQuery(GET_ALL_PRODUCTS);
    useEffect(() => {
        // console.log(typeof getDataError);
    }, [getDataError])

    if (getLoading) {
        return <div>loading.......</div>
    }
    if (getError) {
        // return <div>error</div>
        console.log("getting data error-----------------------------", getError);
    }
    else {

    }
    const productList = getDataError.getAllProducts

    return (
        <>
            <div className='flex justify-between p-10'>
                <h1>Welcome to our site Balamurugan</h1>
                <div className='flex justify-center gap-10'>
                    <Link href='/login'><button className='bg-red-400 hover:bg-grey-700 text-white font-bold py-2 px-4 border border-white-700 rounded'>Log Out</button></Link>
                    <Link href="/users" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        View Products
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <button className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' onClick={() => setFormOpen(true)}>Add Product</button>
                </div>
            </div>
            <div>
                <div>
                    <h1>upload File</h1>
                    <input type='file' onChange={handleSingleImage} />
                </div>
                <form onSubmit={handleProductForm} style={{ display: formOpen ? 'block' : 'none' }} className='z-10 absolute bottom-25 ml-20 left-10 w-9/12 bg-emerald-100 p-4 m-auto h-full rounded'>
                    <div className="imageContainer">
                        <input type="file" className="block w-full text-red-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-blue-400
                                hover:file:bg-violet-100" value={setImage.image} onChange={handleChangeFile} name='image'/>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Product name</label>
                            <input type='text' value={productData.productName} onChange={handleChange} placeholder="Enter the product name..." name='productName' className="mt-2 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" />
                        </div>
                        {productErrors.productName && <span className="text-red-600">{productErrors.productName}</span>}

                        <div>
                            <label>Category</label>
                            <select name="category" value={productData.category} onChange={handleChange} id='Category' className="mt-2 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm">
                                <option value='Select a categroy'>Select a categroy</option>
                                <option value='Cameras & Optics'>Cameras & Optics</option>
                                <option value='Hardware'>Hardware</option>
                                <option value='Luggage & Bags'>Luggage & Bags</option>
                                <option value='Electronics'>Electronics</option>
                                <option value='Furniture'>Furniture</option>
                                <option value='Software'>Software</option>
                                <option value='Sporting Goods'>Sporting Goods</option>
                                <option value='Toys & Games'>Toys & Games</option>
                                <option value='Vehicles & Parts'>Vehicles & Parts</option>
                                <option value='Gift Cards'>Gift Cards</option>
                                <option value='Health & Beauty'>Health & Beauty</option>
                            </select>
                            {productErrors.category && <span className="text-red-600">{productErrors.category}</span>}

                        </div>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Brand</label>
                            <input type='text' value={productData.brand} onChange={handleChange} placeholder="Enter the brand name..." name='brand' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type='number' value={productData.price} onChange={handleChange} placeholder="Enter the price name..." name='price' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        {productErrors.price && <span className="text-red-600">{productErrors.price}</span>}

                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Weight</label>
                            <input type='number' value={productData.weight} onChange={handleChange} placeholder="Enter the weight..." name='weight' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        <div>
                            <label>Color</label>
                            <input type='text' value={productData.color} onChange={handleChange} placeholder="Enter the Color name..." name='color' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Description</label>
                            <textarea value={productData.description} onChange={handleChange} name='description' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder='Write something......'>

                            </textarea>
                            {productErrors.description && <span className="text-red-600">{productErrors.description}</span>}
                        </div>
                        <div className='flex justify-center gap-5 mt-7'>
                            <button className='rounded bg-cyan-50 py-2 px-4 border border-red-700 text-rose-500' onClick={() => setFormOpen(false)}>cancel</button>
                            <button className="rounded bg-blue-300 text-white-600 py-2 px-4 border border-green-700" type='submit'>save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='z-0 flex w-full justify-between flex-wrap flex-row gap-30'>
                {
                    productList.map((item, index) =>
                        <div key={index} className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
                            <a>
                                <img className="h-60 rounded-t-lg object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                            </a>
                            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">Sale</span>
                            <div className="mt-4 px-5 pb-5">
                                <a>
                                    <h5 className="text-xl font-semibold tracking-tight text-slate-900">{item.productName}</h5>
                                </a>
                                <div className="flex items-center gap-6">
                                    <label className='text-blue-400'>Brand:</label>
                                    <span>{item.brand}</span>
                                </div>
                                <div className='flex items-center gap-6'>
                                    <label className='text-blue-400'>Description</label>
                                    <p>{item.description}.....</p>
                                </div>
                                <div className='flex items-center gap-6'>
                                    <label className='text-blue-400'>Colors</label>
                                    <p>{item.color}.....</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>
                                        <span className="text-3xl font-bold text-slate-900">₹{item.price}</span>
                                    </p>
                                    <a className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to cart</a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="p-10 overflow-x-auto rounded-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white-400 uppercase bg-gray-50 dark:bg-gray-700 white:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Brand
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Brand
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b white:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap white:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4 text-blue-500">
                                Silver
                            </td>
                            <td className="px-6 py-4 text-blue-500">
                                Laptop
                            </td>
                            <td className="px-6 py-4 text-blue-500">
                                ₹2999
                            </td>
                            <td className="px-6 py-4 text-blue-500">
                                Apple
                            </td>
                            <td className="px-6 py-4 text-blue-500">
                                ₹2999
                            </td>
                            <td className="px-6 py-4 text-blue-500">
                                Apple
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
