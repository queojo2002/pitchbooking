import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../model/User';



export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
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
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
       
        const user = userCredential.user;
        
        await auth().currentUser.updateProfile({
            displayName: name,
        });
        const userModel = new User(name, email, password);
        const userModelAdd = userModel.toObject();
        await firestore().collection('users').doc(email).set(userModelAdd);


        return { user };
    } catch (error) {
        return { error: error.message };
    }
};


