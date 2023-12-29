import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_PRODUCT_DETAILS } from "../../../../Grahpql/queries";
import Link from 'next/link';

export default function viewProductId() {
    const router = useRouter()
    const { viewProductId } = router.query
    const { data: getData, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
        variables: { id: viewProductId }
    })
    const [productName, getProductName] = useState('')
    const [category, getCategory] = useState('')
    const [brand, getBrand] = useState('')
    const [price, getPrice] = useState('')
    const [weight, getWeight] = useState('')
    const [color, getColor] = useState('')
    const [description, getDescription] = useState('')

    useEffect(() => {
        if (getData && getData.getProductDetails) {
            getProductName(getData.getProductDetails.productName)
            getCategory(getData.getProductDetails.category)
            getBrand(getData.getProductDetails.brand)
            getPrice(getData.getProductDetails.price)
            getWeight(getData.getProductDetails.weight)
            getColor(getData.getProductDetails.color)
            getDescription(getData.getProductDetails.description)
        }
    }, [getData])
    // console.log(getData)
    return (
        <>
            <div className="flex justify-end float-right pr-3">
                <Link href={`/adminStore`}><button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-7 w-24 rounded">Back</button></Link>
            </div>
            <div className="mt-3">
                <h2 className="leading-loose text-2xl text-center text-gray-700">Product Details</h2>
            </div>
            <div className="flex mx-28 my-24 items-center">
                <div className="border border-green-300 rounded-md shadow-xl w-auto h-72 p-10 bg-white">
                    <p><img className="h-48 border text-sm" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" /></p>
                    <p className="my-1 flex justify-center text-gray-700">Image</p>
                </div>
                <div className="flex items-center border border-green-300 w-3/5 rounded-md mx-20 shadow-xl h-auto bg-white">
                    <div className="ml-8 leading-loose text-xl text-gray-700">
                        <p>ProductName</p>
                        <p>Category</p>
                        <p>Brand</p>
                        <p>Price</p>
                        <p>Weight</p>
                        <p>Color</p>
                        <p>Description</p>
                    </div>
                    <div className="m-10 leading-loose text-xl text-gray-700">
                        <ul>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                        </ul>
                    </div>
                    <div className="mr-8 leading-loose text-xl text-gray-700">
                        <p className="h-10">{productName}</p>
                        <p className="h-10">{category}</p>
                        <p className="h-10">{brand}</p>
                        <p className="h-10">{price}</p>
                        <p className="h-10">{weight}</p>
                        <p className="h-10">{color}</p>
                        <p className={`${description.length > 5 ? "h-10 truncate w-72" : "h-10"}`}>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
