
const localStorageMiddleware = ({ getState }) => (next) => (action) => {
    const result = next(action)
    localStorage.setItem("productData", JSON.stringify(getState()));
    return result
};

export default localStorageMiddleware;