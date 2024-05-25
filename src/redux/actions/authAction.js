import { CLEAR_ERROR, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, LOGOUT_FAILURE, UPDATE_PROFILE } from '.';
import { loginUser, logoutUser } from '../../api/auth-api';
import { loadUser } from '../../api/user-api';




export const login = ({ email, password }) => async (dispatch) => {
    try {
        const result = await loginUser({ email, password });
        if (result.user) {

            if (result.user.emailVerified === false) {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: "Email của bạn chưa được xác thực, vui lòng kiểm tra email của bạn để xác thực tài khoản.",
                });
            }else {
                const userDoc = await loadUser();
                if (userDoc) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            emailVerified: result.user.emailVerified,
                            ...userDoc
                        },
                    });
                } else {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: "Không thể lấy dữ liệu người dùng",
                    });
                }
                
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

export const updateUsers = users => ({
    type: UPDATE_PROFILE,
    payload: users,
  });


export const clearError = () => ({
    type: CLEAR_ERROR,
});

