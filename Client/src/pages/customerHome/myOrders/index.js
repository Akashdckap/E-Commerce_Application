import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS, GET_CUSTOMER_PERSONAL_ORDER_COUNT, GET_GUEST_ORDERS, GET_GUEST_PERSONAL_ORDER_COUNT, GET_PERSONAL_DETAILS_ORDER } from '../../../../Grahpql/queries';
import { useSelector } from 'react-redux';

export default function Myorders() {
    const loginData = useSelector(state => state.productDetails.LoginData);
    const [customerPersonalData, setCustomerPersonalData] = useState([]);
    const [activeSection, setActiveSection] = useState("order")
    const [guestPersonalData, setGuestPersonalData] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchText, setSearchText] = useState("");
    const [totalPages, setTotalPages] = useState();



    const { data: customerPersonalDetails, loading: customerPersonalLoading, error: customerPersonalError, refetch: refetchCustomerData } = useQuery(GET_PERSONAL_DETAILS_ORDER, {
        variables: { userId: loginData.customerId, page: currentPage, pageSize: pageSize },
    });
    const { data: guestOrders, loading: guestLoading, error: guestError, refetch: refetchGuestData } = useQuery(GET_GUEST_ORDERS, {

        variables: { page: currentPage, pageSize: pageSize }
    })

    let filterCustomerPersonal;
    if (loginData.customerId !== undefined) {
        filterCustomerPersonal = customerPersonalData.filter((item) => {
            return item.orderTime.toLowerCase().includes(searchText.toLowerCase());
        });
    } else {
        filterCustomerPersonal = guestPersonalData.filter((item) => {
            return item.orderTime.toLowerCase().includes(searchText.toLowerCase());
        });
    }

    const { data: orderCount, loading: orderLoading, error: orderError, refetch: refetchCustomerOrderCount } = useQuery(GET_CUSTOMER_PERSONAL_ORDER_COUNT, {
        variables: { userId: loginData.customerId }
    });

    const { data: guestOrderCount, loading: guestOrderLoading, error: guestOrderError, refetch: refetchGuestOrderCount } = useQuery(GET_GUEST_PERSONAL_ORDER_COUNT)


    useEffect(() => {
        if (customerPersonalDetails && !customerPersonalLoading) {
            setCustomerPersonalData(customerPersonalDetails.getCustomerPersonalDetails);
            refetchCustomerData();
        }
        if (guestOrders && !guestLoading) {
            setGuestPersonalData(guestOrders.getGuestOrders);
            refetchGuestData();
        }
        if (orderCount && !orderLoading || guestOrderCount && !guestOrderLoading) {
            refetchCustomerOrderCount();
            refetchGuestOrderCount();
            if (loginData.customerId === undefined) {
                setTotalPages(Math.ceil(guestOrderCount && guestOrderCount.getGuestOrderCount / pageSize))
            }
            else {
                setTotalPages(Math.ceil(orderCount && orderCount.getCustomerOrderCount / pageSize));
            }
        }
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [customerPersonalDetails, orderCount, guestPersonalData, guestOrders, guestOrderCount, customerPersonalData, customerPersonalLoading, totalPages, searchText]);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const calculateSI = (index) => {
        return (currentPage - 1) * pageSize + index + 1;
    };

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, loginData.customerId === undefined ? guestOrderCount && guestOrderCount.getGuestOrderCount : orderCount && orderCount.getCustomerOrderCount);

    return (
        <>
            {/* <ReactTooltip place="top" effect="solid" multiline /> */}
            <div className='overflow-y-scroll custom-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 max-h-screen p-2 mr-1 rounded-2xl'>
                <div className='grid grid-cols-3 items-center'>
                    <div className='pl-14'>
                        <p className='text-gray-500 text-lg'>Welcome to orders page <span className='text-teal-600 text-2xl'>{loginData.name}</span></p>
                    </div>
                    <div className='ml-48'>
                        <input type='text' className='bg-white h-10 border rounded-md p-3 m-4 focus:border-teal-400 hover:border-teal-200 outline-none text-gray-500' onChange={(e) => setSearchText(e.target.value)} placeholder='Search by date .....'></input>
                    </div>
                    <div className='ml-60'>
                        <Link href={'/customerHome'} className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-blue-500" />
                            <p className="cursor-pointer text-blue-500">Back to Home</p>
                        </Link>
                    </div>
                </div>
                <h1 className='text-amber-600 text-xl pl-16'>Your Orders</h1>
                <div className='mx-16 mt-4 bg-stone-100 rounded-md border border-solid mb-10 shadow-sm'>
                    <table className="w-full rounded-md overflow-hidden border border-solid border-green-600 min-h-[200px]">
                        <thead>
                            <tr className="bg-teal-100">
                                <th scope="col" className="text-center text-gray-700 py-3.5 px-7">S.No</th>
                                <th scope="col" className="text-center text-gray-700 py-3.5">Name</th>
                                <th scope="col" className="text-center text-gray-700 py-3.5">Email</th>
                                <th scope="col" className="text-center text-gray-700 py-3.5">PhoneNo</th>
                                <th scope="col" className="text-center text-gray-700 py-3.5">OrderTime</th>
                                <th scope="col" className="text-center text-gray-700 py-3.5">View Product</th>
                                <th scope="col" className="text-center text-gray-700 py-3.5">Total Price</th>
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                filterCustomerPersonal.length > 0 ? (
                                    filterCustomerPersonal.map((orders, index) => {
                                        return (
                                            <tr className="border hover:bg-white hover:rounded-t-full border-b-gray-300 transition-all duration-300 ease-in-out" key={index}>
                                                <td className="text-center text-gray-700 font-medium" role="cell">{calculateSI(index)}</td>
                                                <td className="text-center text-gray-700 font-medium py-3 px-10" role="cell">{orders.personalDetails.name}</td>
                                                <td className="text-center text-gray-700 font-medium px-10" role="cell">{orders.personalDetails.email}</td>
                                                <td className="text-center text-gray-700 font-medium px-10" role="cell">{orders.personalDetails.phoneNo}</td>
                                                <td className="text-center text-gray-700 font-medium" role="cell">{orders.orderTime}</td>
                                                <td className="text-center" role="cell"><Link href={`/customerHome/myOrders/viewOrders/${orders._id}`}><FontAwesomeIcon icon={faEye} className='text-base text-gray-700 cursor-pointer hover:text-teal-500' /></Link></td>
                                                <td className="text-center text-gray-700 font-medium px-10" role="cell">₹ {orders.totalPrice}</td>
                                            </tr>
                                        )
                                    })
                                ) :
                                    (<tr className='flex mt-20 items-center justify-center mb-24 m-auto w-2/6 px-4 py-5'>
                                        <td className='text-red-500 mb-10' colSpan='5'>{searchText} Not found</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-between items-center mb-10'>
                    <div>
                        <p className='pl-16 text-gray-700 '>Showing {startItem} to {endItem} of {loginData.customerId === undefined ? guestOrderCount && guestOrderCount.getGuestOrderCount : orderCount && orderCount.getCustomerOrderCount} results</p>
                        {/* <h1 className='text-amber-600 text-xl pl-16'>Your Orders</h1> */}
                        <div className='flex items-start justify-between mx-14'>
                            <div className='grid justify-start gap-y-2'>
                                <h1 className={`${activeSection === 'order' ? 'text-orange-500' : 'text-gray-500'}`}>My Orders</h1>
                                {
                                    loginData.customerId !== undefined ?
                                        <Link href={'/customerHome/myAccount'} className='text-gray-500'>My Account</Link>
                                        : ''
                                }
                            </div>
                            <div className='grid' style={{ display: activeSection === "order" ? 'block' : 'none' }}>
                                <div className='bg-stone-100 rounded-md border border-solid mb-10 shadow-sm'>
                                    <table className="w-full rounded-md overflow-hidden border border-solid border-green-600 min-h-[200px]">
                                        <thead>
                                            <tr className="bg-teal-100">
                                                <th scope="col" className="text-center text-gray-700 py-3.5 px-7">S.No</th>
                                                <th scope="col" className="text-center text-gray-700 py-3.5">Name</th>
                                                <th scope="col" className="text-center text-gray-700 py-3.5">Email</th>
                                                <th scope="col" className="text-center text-gray-700 py-3.5">PhoneNo</th>
                                                <th scope="col" className="text-center text-gray-700 py-3.5">OrderTime</th>
                                                {/* <th scope="col" className="text-center text-gray-700 py-3.5">Status</th> */}
                                                <th scope="col" className="text-center text-gray-700 py-3.5">View Product</th>
                                                <th scope="col" className="text-center text-gray-700 py-3.5">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {
                                                filterCustomerPersonal.length > 0 ? (
                                                    filterCustomerPersonal.map((orders, index) => {
                                                        return (
                                                            <tr className="border hover:bg-white hover:rounded-t-full border-b-gray-300 transition-all duration-300 ease-in-out" key={index}>
                                                                <td className="text-center text-gray-700 font-medium" role="cell">{calculateSI(index)}</td>
                                                                <td className="text-center text-gray-700 font-medium py-3 px-10" role="cell">{
                                                                    orders.personalDetails.name.length > 13 ?
                                                                        `${orders.personalDetails.name.slice(0, 13)}....` :
                                                                        orders.personalDetails.name
                                                                }</td>
                                                                <td data-tooltip-content={orders.personalDetails.email} className="text-center text-gray-700 font-medium px-10" role="cell">{
                                                                    orders.personalDetails.email.length > 17 ?
                                                                        `${orders.personalDetails.email.slice(0, 17)}....` :
                                                                        orders.personalDetails.email

                                                                }</td>
                                                                <td className="text-center text-gray-700 font-medium px-10" role="cell">{orders.personalDetails.phoneNo}</td>
                                                                <td className="text-center text-gray-700 font-medium" role="cell">{orders.orderTime}</td>
                                                                <td className="text-center" role="cell"><Link href={`/customerHome/myOrders/viewOrders/${orders._id}`}><FontAwesomeIcon icon={faEye} className='text-base text-gray-700 cursor-pointer hover:text-teal-500' /></Link></td>
                                                                <td className="text-center text-gray-700 font-medium px-10" role="cell">₹ {orders.totalPrice}</td>
                                                            </tr>)
                                                    })
                                                ) :
                                                    (<tr className='flex w-2/6 mt-20 items-center justify-center mb-24 m-auto px-4 py-5'>
                                                        <td className='text-red-500 mb-10' colSpan='7'>{searchText} Not found</td>
                                                    </tr>
                                                    )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='flex justify-between items-center mb-10'>
                                    <div>
                                        <p className='text-gray-700'>Showing {startItem} to {endItem} of {loginData.customerId === undefined ? guestOrderCount && guestOrderCount.getGuestOrderCount : orderCount && orderCount.getCustomerOrderCount} results</p>
                                    </div>
                                    <div className='flex justify-between items-center gap-8'>
                                        <div className="border border-solid border-teal-600 rounded-md flex justify-between items-center h-9 w-32 gap-3 p-2">
                                            <p className="text-gray-800">Show :</p>
                                            <select className="pl-3 outline-0 bg-transparent" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="30">30</option>
                                            </select>
                                        </div>
                                        <div className='flex gap-4 items-center justify-end'>
                                            <button disabled={currentPage === 1} ><FontAwesomeIcon icon={faLessThan} onClick={prevPage} style={{ cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }} className='border px-1.5 py-1.5 border-gray-400 rounded-md w-8 hover:bg-teal-100' /></button>
                                            <span className='bg-teal-200 border border-teal-500 hover:bg-teal-100 font-bold py-1 px-3.5 rounded-full'>{currentPage}</span>
                                            <button disabled={currentPage === totalPages} ><FontAwesomeIcon icon={faGreaterThan} onClick={nextPage} style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }} className={`border px-1.5 py-1.5 border-gray-400 rounded-md w-8 hover:bg-teal-100 `} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </>

    )
}