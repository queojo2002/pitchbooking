import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../model/User';



export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email.toLowerCase(), password);
        return { user: userCredential.user };
    } catch (error) {
        return { error: error.message };
    }
};


export const logoutUser = () => {
    return auth().signOut();
}

export const signUpUser = async ({ name, email, password }) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email.toLowerCase(), password);
        const user = userCredential.user;
        await auth().currentUser.updateProfile({
            displayName: name,
        });
        const userModel = new User(name, email);
        const userModelAdd = userModel.toObject();
        await firestore().collection('users').doc(email).set(userModelAdd);
        await user.sendEmailVerification();
        await auth().signOut();

        return { user };
    } catch (error) {
        return { error: error.message };
    }
};


export const getCurrenUser = () => {
    try {

    }catch (error) {
        return { error: error.message };
    }
}