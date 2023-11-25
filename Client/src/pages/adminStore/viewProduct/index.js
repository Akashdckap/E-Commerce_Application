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
            <div className="flex items-center justify-end float-right pr-3">
                <Link href={`/adminStore`}><button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-7 w-24 rounded">Back</button></Link>
            </div>
            <div className="border-dashed border-2 border-blue-600 w-2/3 h-auto mt-10 p-1 m-auto rounded-md">
                <div className="flex justify-center">
                    <p className="text-center"><img className="h-48 py-3 text-sm" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" /><span>Image</span></p>
                </div>
                <div className="flex justify-center">
                    <div className="ml-8 leading-loose text-2xl">
                        <p>ProductName</p>
                        <p>Category</p>
                        <p>Brand</p>
                        <p>Price</p>
                        <p>Weight</p>
                        <p>Color</p>
                        <p>Description</p>
                    </div>
                    <div className="ml-10 leading-loose text-2xl">
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
                    <div className="ml-8 leading-loose text-2xl">
                        <p>{productName}</p>
                        <p>{category}</p>
                        <p>{brand}</p>
                        <p>{price}</p>
                        <p>{weight}</p>
                        <p>{color}</p>
                        <p>{description}</p>
                    </div>
                    {/* <div>
                        <p className="text-center"><span className="mr-2">Product name : </span>{productName}</p>
                    </div>
                    <div>
                        <p className="text-center"><span className="mr-2">Category : </span>{category}</p>
                    </div>
                    <div>
                        <p className="text-center"><span>Brand : </span>{brand}</p>
                    </div>
                    <div>
                        <p className="text-center"><span>Price : </span>{price}</p>
                    </div>
                    <div>
                        <p className="text-center"><span>Weight : </span>{weight}</p>
                    </div>
                    <div>
                        <p className="text-center"><span>color : </span>{color}</p>
                    </div>
                    <div>
                        <p className="text-center"><span>description : </span>{description}</p>
                    </div> */}
                </div>
            </div>
        </>
    )
}
