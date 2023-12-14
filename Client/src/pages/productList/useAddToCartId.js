import { useState } from 'react';

const useCartIdState = () => {
    const [allAddToCartId, setAddToCartId] = useState([]);
    const addToCartArray = (item) => {
        setAddToCartId([...allAddToCartId, item]);
    };
    const removeIdFromArray = (id) => {
        // const updateId = allAddToCartId.filter((item)=>item._id !== id );
        setAddToCartId((preState) => preState.filter((item) => item !== id))
        // setAddToCartId(updateId)
    }
    const removeAllItems = () => {
        setAddToCartId([]);
    };
    return { allAddToCartId, addToCartArray, removeIdFromArray, removeAllItems };
};

export default useCartIdState;
