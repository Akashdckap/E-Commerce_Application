import { useState } from 'react';

const useCartIdState = () => {
    const [allAddToCartId, setAddToCartId] = useState([]);
    const addToCartArray = (item) => {
        setAddToCartId([...allAddToCartId, item]);
    };
    const removeIdFromArray = (id) => {
        setAddToCartId((preState) => preState.filter((item) => item !== id))
    }
    const removeAllItems = () => {
        setAddToCartId([]);
    };
    return { allAddToCartId, addToCartArray, removeIdFromArray, removeAllItems };
};

export default useCartIdState;
