import { axiosAuth } from './index';

export const loginUser = async ({ email, password }) => {
    try {
        const loginApi = await axiosAuth.post('/login.php', {
            email: email,
            password: password,
        });

        if (loginApi.status === 200 && loginApi.data) {
            return loginApi.data;
        } else {
            throw new Error('An error has occurred');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const signUpUser = async ({ fullname, email, password }) => {
    try {
        console.log(fullname, email, password);
        const signUpApi = await axiosAuth.put('/userApi.php', {
            fullname: fullname,
            email: email,
            password: password,
        });
        console.log(signUpApi.data);

        if (signUpApi.data) {
            return signUpApi.data;
        } else {
            throw new Error('An error has occurred');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
