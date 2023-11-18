import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../Grahpql/mutation'
export default function login() {
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [createUsers, { data, loading, error }] = useMutation(CREATE_USER)
    // console.log(data);
    // console.log(error);
    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [addUser] = useMutation(CREATE_USER)
    const handleSubmit = (e) => {
        e.preventDefault()
        addUser({ variables: { name: users.name, email: users.email, password: users.password } })
        console.log(users);
        // console.log("email---------", email);
        // console.log("password--------", password);
    }
    // useEffect(() => {
    //     console.log(name);
    //     // console.log(email);
    //     // console.log(password);
    // }, [])

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const { data } = await (createUser({ variables: { name: name, email: email, password: password } }))
    //         // console.log("user created", data.createUser);
    //     }
    //     catch (error) {
    //         console.error('Error creating users:', error);
    //         console.error('GraphQL Error Details:', error.message, error.graphQLErrors, error.networkError);
    //     }
    // }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>userName</label>
                        <input type='text' value={users.name} placeholder='enter a name' onChange={(e) => setUsers({ ...users, name: e.target.value })} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type='text' value={users.email} placeholder='enter a email' onChange={(e) => setUsers({ ...users, email: e.target.value })} />
                    </div>
                    <div>
                        <label>password</label>
                        <input type='text' value={users.password} placeholder='enter a password' onChange={(e) => setUsers({ ...users, password: e.target.value })} />
                    </div>
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}
