import { LOGIN_SUCCESS, LOGOUT, LOGOUT_FAILURE, SET_ACCESS_TOKEN, UPDATE_PROFILE } from '.';

export const setAccessToken = (token) => async (dispatch) => {
    dispatch({
        type: SET_ACCESS_TOKEN,
        payload: token,
    });
};

export const loginSuccess = (user) => async (dispatch) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
    });
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAILURE,
            payload: 'Có lỗi khi đăng xuất: ' + error.message,
        });
    }
};

export const updateUsers = (users) => {
    return {
        type: UPDATE_PROFILE,
        payload: users,
    };
};
