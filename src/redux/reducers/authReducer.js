import { LOGIN_SUCCESS, LOGOUT, SET_ACCESS_TOKEN } from '../actions';

const initialState = {
    isAuthenticated: false,
    userData: null,
    error: null,
    accessToken: null,
    refreshToken: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload,
                error: null,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                error: null,
            };
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        default:
            return state;
    }
};

export default authReducer;
