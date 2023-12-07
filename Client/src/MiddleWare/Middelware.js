
// const localStorageMiddleware = ({ getState }) => (next) => (action) => {
//     const result = next(action)
//     localStorage.setItem("productData", JSON.stringify(getState()));
//     return result
// };

// export default localStorageMiddleware;

const localStorageMiddleware = ({ getState }) => {
    try {
        return (next) => (action) => {
            const result = next(action)
            if (typeof localStorage != 'undefined') {
                localStorage.setItem("productData", JSON.stringify(getState()));
            }
            return result
        }
    }
    catch (error) {
        console.log(error);
        return (next) => (action) => {
            const result = next(action)
            return result
        }
    }
}
export default localStorageMiddleware