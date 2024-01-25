import React, { useEffect, useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { CREATE_PRODUCTS, DELETE_PRODUCT, UPLOAD_FILE } from '../../../Grahpql/mutation';
import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_DATA, GET_TOTAL_PRODUCT_COUNT, ORDER_COUNT } from '../../../Grahpql/queries';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faGreaterThan, faL, faLessThan, faSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

//  const people = [
//     { name: 'Wade Cooper' },
//     { name: 'Arlene Mccoy' },
//     { name: 'Devon Webb' },
//     { name: 'Tom Cook' },
//     { name: 'Tanya Fox' },
//     { name: 'Hellen Schmidt' },
// ];

export default function AdminStore() {
    // const [selected, setSelected] = useState(people[0]);
    const [formOpen, setFormOpen] = useState(false);
    const router = useRouter();
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [getProductData, setgetProductData] = useState([])
    const [totalPages, setTotalPages] = useState();
    const [image, setImage] = useState('');

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
        productName: "",
        category: "",
        brand: "",
        price: "",
        weight: "",
        color: "",
        description: ""
    });

    function validate() {
        let newErrors = { ...productErrors };
        let isVaild = true;
        if (productData.productName === "") {
            newErrors.productName = 'product name is required';
            isVaild = false;
        }
        if (productData.category === "") {
            newErrors.category = 'category is required';
            isVaild = false;
        }
        if (productData.brand === "") {
            newErrors.brand = 'brand is required';
            isVaild = false;
        }
        if (productData.price === "") {
            newErrors.price = 'price is required';
            isVaild = false;
        }
        if (productData.weight === "") {
            newErrors.weight = 'weight is required';
            isVaild = false;
        }
        if (productData.color === "") {
            newErrors.color = 'color is required';
            isVaild = false;
        }
        if (productData.description === "") {
            newErrors.description = 'description is required';
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

    // const [file, setFile] = useState(null);
    // const [uploadFile] = useMutation(UPLOAD_FILE)

    // const handleSingleImage = async (e) => {
    //     const selectedFile = e.target.files[0];
    //     // console.log("targeted-----------",selectedFile);
    //     setFile(selectedFile);
    // }
    // console.log("checking file----------------", file);
    // const handleUpload = async () => {
    //     // console.log("upload--------",file)
    //     try {
    //         if (!file) {
    //             console.log("No file is here")
    //         }
    //         else {
    //             const result = await uploadFile({
    //                 variables: { file: file },
    //             })
    //             console.log("variables------", result.data.uploadFile.message)
    //         }

    //     }
    //     catch (error) {
    //         // console.log("upload file----------------", file);
    //         console.log('Error in uploading Image', error)
    //     }
    // }

    const [createProducts] = useMutation(CREATE_PRODUCTS)
    const [deleteProduct] = useMutation(DELETE_PRODUCT)
    const { data: getData, error: getError, loading: getLoading, fetchMore, refetch: refetchProducts } = useQuery(GET_ALL_PRODUCTS, {
        variables: { page: currentPage, pageSize: pageSize },
    });
    const handleProductForm = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                await (createProducts({ variables: { productDatas: productData } }));
                refetchCountOfProduct();
                toast.success("product successfully added", {
                    position: 'top-right',
                    autoClose: 3000,
                })
                setProductData({
                    productName: "",
                    category: "",
                    brand: "",
                    price: "",
                    weight: "",
                    color: "",
                    description: ""
                })
                setFormOpen(false)
            }
            catch (error) {
                console.error("product creation error :", error);
            }
        }
    }

    const { data: getCountData, loading: getCountLoading, error: getCountError, refetch: refetchCountOfProduct } = useQuery(GET_TOTAL_PRODUCT_COUNT);
    const { data: orderCount, loading: CountLoading, error: countError } = useQuery(ORDER_COUNT)

    useEffect(() => {
        if (getData && !getLoading) {
            setgetProductData(getData.getAllProducts);
        }
        if (getCountData && !getCountLoading) {
            const totalItemCount = getCountData.getTotalProductCount || 0;
            setTotalPages(Math.ceil(totalItemCount / pageSize));
        }
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, getCountData, getData, getProductData]);
    // console.log("pageSize------", pageSize);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        fetchMore({
            variables: { page: currentPage + 1, pageSize }
        })
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            fetchMore({
                variables: { page: currentPage - 1, pageSize },
            });
        }

    };
    const calculateSI = (index) => {
        return (currentPage - 1) * pageSize + index + 1;
    };

    const startItem = (currentPage - 1) * pageSize + 1;

    const endItem = Math.min(currentPage * pageSize, getCountData && getCountData.getTotalProductCount);

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct({ variables: { id: productId } });
            refetchProducts();
            refetchCountOfProduct();
            toast.success("Successfully removed the product", {
                position: 'top-right',
                autoClose: 3000,
            })
        }
        catch (error) {
            console.error('Error deleting item:', error);
        }
    }
    return (
        <>
            <div className='overflow-y-scroll custom-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-screen p-2 mr-1 rounded-2xl'>
                <div className='flex justify-between p-10'>
                    <h1>Welcome to our site Balamurugan</h1>
                    <div className='flex justify-center gap-10'>
                        <Link href='/login'><button className='bg-red-400 hover:bg-grey-700 text-white font-bold py-2 px-4 border border-white-700 rounded'>Log Out</button></Link>
                        <Link href="/orderDetails" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Order Details
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                            <span className='ml-2 w-6 h-7 font-medium text-sm text-yellow-500 bg-white flex justify-center items-center px-3.5 rounded-full'>{orderCount ? orderCount.getOrderCount : '0'}</span>
                        </Link>
                        <button className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' onClick={() => setFormOpen(true)}>Add Product</button>
                    </div>
                </div>
                <div>
                    {/* <div>
                    <h1>upload File</h1>
                    <input type='file' onChange={handleSingleImage} value={setFile.filename} name='image' />
                    <button onClick={handleUpload} type='submit' className="rounded bg-blue-300 text-white-600 py-2 px-4 border border-green-700">Upload</button>
                </div> */}
                    <form onSubmit={handleProductForm} style={{ display: formOpen ? 'block' : 'none' }} className='z-10 absolute bottom-25 ml-20 left-10 w-9/12 bg-emerald-100 p-4 m-auto h-auto rounded'>
                        <div className="imageContainer">
                            <input type="file" className="block w-full text-red-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-blue-400
                             hover:file:bg-violet-100" value={setImage.image} onChange={handleChangeFile} name='image' />
                        </div>
                        <div className='flex items-center justify-evenly p-2'>
                            <div>
                                <label>Product name <span className='text-red-500'>*</span></label>
                                <input type='text' value={productData.productName} onChange={handleChange} placeholder="Enter the product name..." name='productName' className="mt-2 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" />
                                {productErrors.productName ? <span className="text-red-600">{productErrors.productName}</span> : ""}
                            </div>
                            <div>
                                <label>Category <span className='text-red-500'>*</span></label>
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
                                {productErrors.category ? <span className="text-red-600">{productErrors.category}</span> : ""}
                            </div>
                        </div>
                        <div className='flex items-center justify-evenly p-2'>
                            <div>
                                <label>Brand <span className='text-red-500'>*</span></label>
                                <input type='text' value={productData.brand} onChange={handleChange} placeholder="Enter the brand name..." name='brand' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                                {productErrors.brand ? <span className="text-red-600">{productErrors.brand}</span> : ""}
                            </div>
                            <div>
                                <label>Price <span className='text-red-500'>*</span></label>
                                <input type='number' value={productData.price} onChange={handleChange} placeholder="Enter the price name..." name='price' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                                {productErrors.price ? <span className="text-red-600">{productErrors.price}</span> : ""}
                            </div>

                        </div>
                        <div className='flex items-center justify-evenly p-2'>
                            <div>
                                <label>Weight <span className='text-red-500'>*</span></label>
                                <input type='number' value={productData.weight} onChange={handleChange} placeholder="Enter the weight..." name='weight' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                                {productErrors.weight ? <span className="text-red-600">{productErrors.weight}</span> : ""}
                            </div>
                            <div>
                                <label>Color <span className='text-red-500'>*</span></label>
                                <input type='text' value={productData.color} onChange={handleChange} placeholder="Enter the Color name..." name='color' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                                {productErrors.color ? <span className="text-red-600">{productErrors.color}</span> : ""}
                            </div>
                        </div>
                        <div className='flex items-center justify-evenly p-2'>
                            <div>
                                <label>Description <span className='text-red-500'>*</span></label>
                                <textarea value={productData.description} onChange={handleChange} name='description' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder='Write something......'>

                                </textarea>
                                {productErrors.description ? <span className="text-red-600">{productErrors.description}</span> : ""}
                            </div>
                            <div className='flex justify-center gap-5 mt-7'>
                                <span className='rounded bg-cyan-50 py-2 px-4 border border-red-700 text-rose-500 cursor-pointer' onClick={() => setFormOpen(false)}>cancel</span>
                                <button className="rounded bg-blue-300 text-white-600 py-2 px-4 border border-green-700" type='submit'>save</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-10 overflow-x-auto rounded-md">
                    <table className="w-full text-sm text-left rtl:text-right text-white-700 dark:text-white-700">
                        <thead className="text-xs text-white-900 uppercase bg-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    S:NO
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
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
                                    Actions
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    View
                                </th>
                            </tr>
                        </thead>
                        {
                            getProductData.map((item, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr key={item._id} className="bg-white border-b border-stone-300 white:bg-gray-800">
                                            <th className='text-base px-6 py-4 text-blue-500'>
                                                {calculateSI(index)}
                                            </th>
                                            <th>
                                                <img className="h-20 p-1 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-lg text-gray-900 whitespace-nowrap white:text-white">
                                                {item.productName}
                                            </th>
                                            <td className="text-base px-6 py-4 text-blue-500">
                                                {item.color}
                                            </td>
                                            <td className="text-base px-6 py-4 text-blue-500">
                                                {item.category}
                                            </td>
                                            <td className="text-base px-6 py-4 text-blue-500">
                                                {item.price}
                                            </td>
                                            <td className="text-base px-6 py-4 text-blue-500">
                                                {item.brand}
                                            </td>
                                            <td className="text-base px-6 py-9 text-blue-500 flex items-center justify-items-center gap-4">
                                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteProduct(item._id)} className='text-base text-red-400 cursor-pointer' id={item._id} />
                                                <Link href={`/adminStore/editProduct/${item._id}`}><FontAwesomeIcon icon={faEdit} className='text-base text-green-400 cursor-pointer' id={item._id} /></Link>
                                            </td>
                                            <td className="px-6 py-4 text-base text-blue-500">
                                                <Link href={`/adminStore/viewProduct/${item._id}`}><FontAwesomeIcon icon={faEye} className='text-base text-blue-700 cursor-pointer' id={item._id} /></Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                    </table>

                    <div className='flex justify-between gap-6 items-center pr-5 pt-5'>
                        <div>
                            <p className='text-gray-700 text-base'>Showing {startItem} to {endItem} of {getCountData && getCountData.getTotalProductCount} results</p>
                        </div>
                        <div className='flex justify-between items-center gap-8'>
                            <div className="border border-solid border-blue-400 rounded-md flex justify-between items-center h-9 w-32 gap-3 p-2">
                                <p className="text-gray-800">Show :</p>
                                <select className="pl-3 outline-0 bg-transparent" onChange={(e) => { setPageSize(parseInt(e.target.value)), currentPage === 1 ? setCurrentPage(1) : currentPage }}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="25">25</option>
                                    <option value="30">30</option>
                                </select>
                            </div>
                            <div className='flex gap-4 items-center justify-center'>
                                <FontAwesomeIcon icon={faLessThan} onClick={prevPage} disabled={currentPage === 1} className='hover:text-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-semibold rounded-lg text-sm px-2.5 py-1.5 dark:bg-transparent dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' style={{ cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }} />
                                <span className='bg-blue-400 border border-teal-500 hover:bg-blue-300 text-white font-bold py-1.5 px-3.5 rounded-full'>{currentPage}</span>
                                <button disabled={currentPage === totalPages}><FontAwesomeIcon onClick={nextPage} icon={faGreaterThan} className='hover:text-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-semibold rounded-lg text-sm px-2.5 py-1.5 dark:bg-transparent dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' style={{ cursor: currentPage == totalPages ? 'not-allowed' : 'pointer' }} /></button>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
            {/* <form onSubmit={handleDeleteProduct}>
                <div className='absolute inset-0 flex mt-20 items-center justify-center m-auto w-2/6 px-4 py-5 rounded' style={{ display: deletePopUpOpen ? "block" : "none" }}>
                    <div className='bg-blue-200 p-8 shadow-lg rounded-lg grid gap-4'>
                        <div>
                            <h3 className='text-red-400'>Delete product</h3>
                            <p className=''>Are you sure to delete this product</p>
                        </div>
                        <div className="flex justify-last">
                            <button onClick={closeDeletePopUp} className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0">Cancel</button>
                            <button type="submit" className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3">Delete</button>
                        </div>
                    </div>
                </div>
            </form> */}
        </>
    )
}

