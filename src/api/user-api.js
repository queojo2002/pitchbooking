import { axiosApis } from '.';

///////////////////////////////////////// API User /////////////////////////////////////////
export const loadUser = async () => {
    try {
        const user = await axiosApis.get('/userApi.php');
        if (user.status === 200 && user.data) {
            return user.data;
        } else {
            throw new Error('Không thể lấy dữ liệu người dùng.');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (user) => {
    try {
        const userUpdate = await axiosApis.post('/userApi.php', user);
        if (userUpdate.status === 200) {
            if (userUpdate.data.status === 1) {
                return userUpdate.data;
            } else {
                throw new Error(userUpdate.data.message);
            }
        } else {
            throw new Error('Không thể cập nhật người dùng.');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const loadInfoAdmin = async () => {
    try {
        const load = await axiosApis.get('/userApi.php?cmd=getAdmin');
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(userUpdate.data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

///////////////////////////////////////// API ADMIN /////////////////////////////////////////

export const loadAllUsers = async () => {
    try {
        const load = await axiosApis.get('/userApi.php?cmd=getUser');
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(userUpdate.data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};
