import React from 'react'
import { GET_ALL_PRODUCTS } from '../Grahpql/queries'
import { useQuery } from '@apollo/client'
import AdminStore from '@/pages/adminStore';
export default function PaginatedList() {
    const { loading, error, data, fetchMore } = useQuery(GET_ALL_PRODUCTS, {
        variables: { page: 1, pageSize: 5 }
    });

    const handlePageChange = (newpage) => {
        fetchMore({
            variables: { page: newpage }
        })
    }

    return (
        <div>
            <AdminStore
                currentPage={1}
                totalPages={Math.ceil(data.getAllProducts.length / 5)}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
