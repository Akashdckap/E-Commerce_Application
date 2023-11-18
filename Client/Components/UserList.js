import React from 'react'
import { useUserList } from '../Grahpql/queries'
import { useQuery } from '@apollo/client'
export default function UserList() {
    const { error, data, loading } = useUserList()
    if (loading) {
        return <div>loading.....</div>
    }
    if (error) return <div>Data fetching error..</div>
    console.log(data);
    return (
        <div>

        </div>
    )
}
