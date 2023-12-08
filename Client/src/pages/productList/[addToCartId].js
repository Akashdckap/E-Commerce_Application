import React from 'react'
import ProductList from '.'
import { useRouter } from 'next/router'
export default function addToCartId() {
    // const router = useRouter()
    // router.push('/productList')
    return (
        <div>
            <ProductList />
        </div>
    )
}
