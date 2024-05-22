const initialState = {
    isAuthenticated: false,
    userData: null,
    error: null,
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                error: null,
            };
        case 'LOGOUT_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
