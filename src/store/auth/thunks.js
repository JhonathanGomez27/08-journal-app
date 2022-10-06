import { loginWithEmailPassword, logOutFireBase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );
        // console.log(result);
        
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        
        if( !ok ) return dispatch( logout(errorMessage) );

        dispatch( login( { uid, displayName, email, photoURL} ) );
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok,displayName, uid, photoURL, errorMessage} = await loginWithEmailPassword({email, password});
       
        if( !ok ) return dispatch( logout(errorMessage) );

        dispatch( login({uid, displayName, email, photoURL}) );
    }
}

export const startLogOut = () => {
    return async(dispatch) => {

        await logOutFireBase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}