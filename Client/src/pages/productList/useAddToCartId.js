import { useState } from 'react';

const useCartIdState = () => {
    const [allAddToCartId, setAddToCartId] = useState();
    const addToCartArray = (item) => {
        // const checkIds = allAddToCartId.filter((check) => check !== item)

        setAddToCartId(item);
        // console.log("allAddToCartId-----------", allAddToCartId);
        // console.log("checkIds-------------", checkIds);
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
