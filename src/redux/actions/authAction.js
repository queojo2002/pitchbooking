import firestore from '@react-native-firebase/firestore';
import { loginUser, logoutUser } from '../../api/auth-api';
import { CLEAR_ERROR, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, LOGOUT_FAILURE } from '.';




export const login = ({ email, password }) => async (dispatch) => {
    try {
        const result = await loginUser({ email, password });
        if (result.user) {
            const userDoc = await firestore().collection('users').doc(email).get();
            if (userDoc._exists) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: userDoc._data,
                });
            } else {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: "Không thể lấy dữ liệu người dùng",
                });
            }

        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: result.error,
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.message,
        });
    }
};


export const logout = () => async (dispatch) => {
    try {
        await logoutUser();
        dispatch({ type: LOGOUT });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAILURE, 
            payload: "Có lỗi khi đăng xuất: " + error.message
        })
    }
};

export const clearError = () => ({
    type: CLEAR_ERROR,
});

