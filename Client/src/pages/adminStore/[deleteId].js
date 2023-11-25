import React from 'react'
import AdminStore from '.'
import { useRouter } from 'next/router'
export default function DeleteId() {
    const router = useRouter()
    const id = router.query.deleteId
    // return id
    return (
        <div>
            <AdminStore />
        </div>
    )
}
