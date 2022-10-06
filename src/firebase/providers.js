import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FireBaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FireBaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log(credentials);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorCode, errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        
        await updateProfile( FireBaseAuth.currentUser, {
            displayName
        } );

        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        return {
            ok: false, errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {

        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password);

        const { displayName, photoURL, uid } = resp.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        return {
            ok: false, errorMessage: error.message
        }
    }
}

export const logOutFireBase = async () => {
    return await FireBaseAuth.signOut();
}