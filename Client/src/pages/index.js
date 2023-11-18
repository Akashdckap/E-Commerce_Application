import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserList from '../../Components/UserList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <UserList />
    </>
  )
}
