export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const SET_ERROR = 'SET_ERROR';

/** @namespace Sicca/Store/Sicca/Sicca/Action/isSubmitted */
export const isAuthenticated = (login, id, name, ip) => ({
    type: IS_AUTHENTICATED,
    payload: {
        login,
        id,
        name,
        ip

    }
});

/** @namespace Sicca/Store/Sicca/Sicca/Action/setError */
export const setError = (error) => ({
    type: SET_ERROR,
    payload: {
        error

    }
});