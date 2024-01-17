import React, { use, useEffect, useState } from "react";
import { GET_ALL_ORDER_DATA_WITH_PAGE, ORDER_COUNT } from "../../../Grahpql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLessThan, faGreaterThan, faStreetView, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { toast } from "react-toastify";
export default function OrderDetails() {
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [countOrderData, setCountOrderData] = useState(null)
    const [totalPages, setTotalPages] = useState(null);
    // const [balance, setBalance] = useState(0);

    const { data: orderedProducts, loading: dataLoading, error: dataError } = useQuery(GET_ALL_ORDER_DATA_WITH_PAGE, {
        variables: { page: currentPage, pageSize: pageSize }
    })
    const { data: orderCount, loading: CountLoading, error: countError } = useQuery(ORDER_COUNT)

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    };
    const calculateSI = (index) => {
        return (currentPage - 1) * pageSize + index + 1;
    };
    useEffect(() => {
        if (orderedProducts && orderedProducts.getAllOrderDatas && orderCount && orderCount.getOrderCount) {
            setCountOrderData(orderCount.getOrderCount)
            setTotalPages(Math.ceil(countOrderData / pageSize));
        }
    }, [orderedProducts, countOrderData, orderCount, pageSize, currentPage]);

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, countOrderData);

    return (
        <>
            <div>
                <div className="py-10 px-16">
                    <div className="flex justify-between items-center pr-4">
                        <h1 className="text-start pl-4 text-2xl text-orange-400">Order Details</h1>
                        <Link href={"/adminStore"} className="text-teal-400 hover:bg-teal-50  border-teal-400 flex justify-center items-center border border-solid h-10 w-40 rounded-md"><FontAwesomeIcon icon={faArrowLeft} className="pr-2" />Back to Product</Link>
                    </div>
                    <div className="mx-4 mt-4 bg-white rounded-md border border-solid">
                        <table className="w-full rounded-md overflow-hidden border border-solid border-gray-400">
                            <thead>
                                <tr className="bg-slate-300">
                                    <th scope="col" className="text-center text-gray-700  px-6 py-4">S.No</th>
                                    <th scope="col" className="text-start text-gray-700">Name</th>
                                    <th scope="col" className="text-start text-gray-700">Email</th>
                                    <th scope="col" className="text-start text-gray-700">PhoneNo</th>
                                    <th scope="col" className="text-start text-gray-700">Order Time</th>
                                    <th scope="col" className="text-center text-gray-700">View Products</th>
                                    <th scope="col" className="text-center text-gray-700">Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderedProducts && orderedProducts.getAllOrderDatas && orderedProducts.getAllOrderDatas.map((entireData, index) => {
                                        return (
                                            <tr className="border hover:bg-gray-100 hover:rounded-t-full transition-all duration-300 ease-in-out" key={index}>
                                                <td className="text-center py-3.5 text-gray-700 font-medium" role="cell">{calculateSI(index)}</td>
                                                <td className="text-start text-cyan-600">{entireData.personalDetails.name}</td>
                                                <td className="text-start text-cyan-600">{entireData.personalDetails.email}</td>
                                                <td className="text-start text-gray-600">{entireData.personalDetails.phoneNo}</td>
                                                <td className="text-start text-gray-600">{entireData.OrderTime}</td>
                                                <td className="text-center" ><Link href={`/orderDetails/productDetails/${entireData._id}`}><FontAwesomeIcon icon={faEye} className="hover:text-green-400 text-gray-600" /></Link></td>
                                                <td className="text-center text-gray-600">₹ {entireData.totalPrice}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between pr-4 items-center pt-5'>
                        <div>
                            <p className='text-gray-700 text-base pl-4'>Showing {startItem} to {endItem} of {countOrderData} results</p>
                        </div>
                        <div className="flex justify-between items-center gap-8">
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
                            <div className='flex gap-4 items-center justify-center'>
                                <FontAwesomeIcon icon={faLessThan} onClick={prevPage} disabled={currentPage === 1} className='hover:text-white border border-gray-300 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-200 font-semibold rounded-lg text-sm px-2.5 py-1.5 dark:bg-transparent dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' style={{ cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }} />
                                <span className='bg-cyan-400 border border-teal-500 hover:bg-cyan-300 text-white font-bold py-1.5 px-3.5 rounded-full'>{currentPage}</span>
                                {/* <input value={currentPage} type="number" onChange={(e) => setCurrentPage(parseInt(e.target.value, currentPage))} className='bg-cyan-400 flex justify-center items-center outline-0 border border-teal-500 hover:bg-cyan-300 text-white font-bold py-1.5 px-3.5 rounded-full' /> */}
                                {/* {console.log("currentPage-------------------------", currentPage)} */}
                                <button disabled={currentPage === totalPages}><FontAwesomeIcon onClick={nextPage} icon={faGreaterThan} className='hover:text-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-semibold rounded-lg text-sm px-2.5 py-1.5 dark:bg-transparent dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }} /></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}