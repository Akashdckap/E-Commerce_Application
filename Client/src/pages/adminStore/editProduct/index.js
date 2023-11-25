import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { notification } from 'antd'
import { GET_EDIT_PRODUCT_DATA } from '../../../../Grahpql/queries'
import { UPDATE_PRODUCT } from '../../../../Grahpql/mutation'

export default function EditProduct() {
    const router = useRouter()
    const { productId } = router.query
    const { data: getData, loading, error } = useQuery(GET_EDIT_PRODUCT_DATA, {
        variables: { id: productId }
    })
    const [productName, setProductName] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')
    const [color, setColor] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (getData && getData.getEditProductData) {
            setProductName(getData.getEditProductData.productName)
            setCategory(getData.getEditProductData.category)
            setBrand(getData.getEditProductData.brand)
            setPrice(getData.getEditProductData.price)
            setWeight(getData.getEditProductData.weight)
            setColor(getData.getEditProductData.color)
            setDescription(getData.getEditProductData.description)
        }
    }, [getData])
    // console.log(getData)
    const [updateProduct] = useMutation(UPDATE_PRODUCT)

    const handleUpdateProductForm = async (e) => {
        e.preventDefault()
        const updateFormData = {
            productName: productName,
            category: category,
            brand: brand,
            price: price,
            weight: weight,
            color: color,
            description: description
        }
        try {
            await updateProduct({ variables: { id: productId, input: updateFormData } })
            notification.success({ description: "product successfully updated" })
            router.push("/adminStore")
        }
        catch (error) {
            console.error('Error updating product:', error.message);
        }
    }

    // data.getEditProductData.map((item, index) => {
    //     console.log(item);
    // })
    // const product = getData.map((item)=>{
    //     return item
    // })
    // useEffect(() => {

    //     const product = getData.getEditProductData
    // }, [getData])
    // console.log(typeof getData);
    // console.log(getData.getEditProductData.bra);
    // console.log(product);
    // console.log(data);
    // console.log(product);
    // console.log(error);

    return (
        <>
            <div>
                <h1>Edit product page</h1>
            </div>
            <div>
                <form onSubmit={handleUpdateProductForm} className='z-10 absolute bottom-25 ml-20 left-10 w-9/12 bg-emerald-100 p-4 m-auto h-full rounded'>
                    <div>
                        <h1 className='flex justify-center'>Edit product</h1>
                    </div>
                    {/* <div className="imageContainer">
                    <input type="file" className="block w-full text-red-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-blue-400
                                hover:file:bg-violet-100" value={setImage.image} onChange={handleChangeFile} name='image' />
                </div> */}
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Product name</label>
                            <input type='text' value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter the product name..." name='productName' className="mt-2 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" />
                        </div>
                        {/* {productErrors.productName && <span className="text-red-600">{productErrors.productName}</span>} */}

                        <div>
                            <label>Category</label>
                            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} id='Category' className="mt-2 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm">
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
                            {/* {productErrors.category && <span className="text-red-600">{productErrors.category}</span>} */}
                        </div>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Brand</label>
                            <input type='text' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Enter the brand name..." name='brand' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter the price name..." name='price' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        {/* {productErrors.price && <span className="text-red-600">{productErrors.price}</span>} */}

                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Weight</label>
                            <input type='text' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter the weight..." name='weight' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        <div>
                            <label>Color</label>
                            <input type='text' value={color} onChange={(e) => setColor(e.target.value)} placeholder="Enter the Color name..." name='color' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder='Write something......'>

                            </textarea>
                            {/* {productErrors.description && <span className="text-red-600">{productErrors.description}</span>} */}
                        </div>
                        <div className='flex justify-center gap-5 mt-7'>
                            <button className="rounded bg-blue-300 text-white-600 py-2 px-4 border border-green-700" type='submit'>Update Product</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
