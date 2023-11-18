import React, { useState } from 'react'

export default function adminStore() {
    const [formOpen, setFormOpen] = useState(false)
    const handleProductForm = (e) => {
        e.preventDefault()
        setFormOpen(false)
    }
    return (
        <>
            <div className='flex justify-between p-10'>
                <h1>Welcome to our site Balamurugan</h1>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' onClick={() => setFormOpen(true)}>Add Product</button>
            </div>
            <div>
                <form onSubmit={handleProductForm} style={{ display: formOpen ? 'block' : 'none' }} className='w-9/12 bg-emerald-100 p-4 m-auto h-full rounded'>
                    <div className="imageContainer">
                        <input type="file" className="block w-full text-red-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-blue-400
                                hover:file:bg-violet-100"  />
                        {/* <input type='file' className='flex m-auto items-center justify-center'/> */}
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Product name</label>
                            <input type='text' placeholder="Enter the product name..." name='productName' className="mt-2 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" />
                        </div>
                        <div>
                            <label>Category</label>
                            <select name="Category" id='Category' className="mt-2 placeholder:text-slate-400 block bg-white w-80 border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm">
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
                        </div>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Brand</label>
                            <input type='text' placeholder="Enter the brand name..." name='brand' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type='number' placeholder="Enter the price name..." name='price' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div>
                            <label>Quantity</label>
                            <input type='number' placeholder="Enter the quantity name..." name='quantity' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                        <div>
                            <label>Type</label>
                            <input type='text' placeholder="Enter the type name..." name='type' className='w-80 mt-2 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </div>
                    </div>
                    <div className='flex items-center justify-evenly p-2'>
                        <div className='grid w-80 pr-16 mr-40'>
                            <label>Description</label>
                            <textarea className='w-80 mt-2 mr-10 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder='Write something......'>

                            </textarea>
                        </div>
                        <div className='flex justify-center gap-5'>
                            <button className='rounded bg-cyan-50 py-2 px-4 border border-red-700 text-rose-500' onClick={() => setFormOpen(false)}>cancel</button>
                            <button className="rounded bg-blue-300 text-white-600 py-2 px-4 border border-green-700" type='submit'>save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
