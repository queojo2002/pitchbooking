import axios from 'axios';
import { loginSuccess, setAccessToken } from '../redux/actions/authAction';
import { store } from '../redux/store';
import { loadUser } from './user-api';

export const axiosAuth = axios.create({
    baseURL: 'https://vanduc.top/pitchesBookingApi',
    headers: {
        'Content-Type': 'application/json',
    },
});

const axiosApis = axios.create({
    baseURL: 'https://vanduc.top/pitchesBookingApi',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosApis.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosApis.interceptors.response.use(async (response) => {
    const originalRequest = response.config;
    if (response.data.status === 2 && !originalRequest._retry) {
        try {
            originalRequest._retry = false;
            const payloadToken = await axiosApis.post('/refreshAccessToken.php', {
                refreshToken: store.getState().auth.refreshToken,
            });
            if (payloadToken.data.status === 0) {
                await store.dispatch(logout());
                return Promise.reject('Refresh token failed');
            }
            await store.dispatch(
                setAccessToken({
                    accessToken: payloadToken.data.data.accessToken,
                    refreshToken: payloadToken.data.data.refreshToken,
                }),
            );
            const user = await loadUser();
            await store.dispatch(loginSuccess(user.data));
            originalRequest.headers['Authorization'] = `Bearer ${store.getState().auth.accessToken}`;
            const newAxiosInstance = axios.create();
            return newAxiosInstance(originalRequest);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return response;
});

export { axiosApis };
