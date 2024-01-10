import React from 'react'
import { useSelector } from 'react-redux';
import UserPlaceOrder from '../UserPlaceOrder';
import GuestPlaceOrder from '../GuestPlaceOrder';

export default function PlaceOrder() {
    const loginData = useSelector(state => state.productDetails.LoginData);
    return (
        <div>
            {
                loginData.token ? <UserPlaceOrder /> : <GuestPlaceOrder />
            }
        </div>
    )
}
