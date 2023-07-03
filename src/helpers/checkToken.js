// Check Bearer Token Expiration
export const checkToken = () => {

    const timeout = localStorage.getItem('expiration');

    if (Date.now() >= timeout) {
        return false;
    }
    else {
        return true;
    }
};