import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_CUSTOMER_REGISTER_DATA } from "../../../../Grahpql/queries";

function Myaccount() {
    const getCustomerLocalData = useSelector(state => state.productDetails.LoginData);
    const { data, loading, error } = useQuery(GET_CUSTOMER_REGISTER_DATA, {
        variables: { id: getCustomerLocalData.customerId }
    })
 
    return (
        <>
            <div>
                <div className="grid gap-5 ml-28">
                    <div className="flex justify-start items-center mt-5">
                        <h1 className="text-[#575F70] text-lg font-medium">Personal Details</h1>
                    </div>
                    <div className="">
                        <div className='flex p-5 gap-44 w-7/12 hover:border-green-300 justify-between items-center bg-white rounded-md border border-solid'>
                            <div className="flex justify-start items-center gap-8">
                                <FontAwesomeIcon icon={faUser} className="text-green-400 text-lg" />
                                <div className="flex justify-start gap-3">
                                    <h4 className="text-gray-600">{data && data.getCustomerRegister.name}</h4>
                                    <h4 className="text-gray-600">{data && data.getCustomerRegister.email}</h4>
                                </div>
                                <div className="flex justify-start">
                                    <p className="text-gray-400">{data && data.getCustomerRegister.phoneNo}</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <span className="text-blue-400 hover:cursor-pointer hover:text-green-500">Change</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Myaccount;