import { logOutFireBase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLogOut } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks() );

    test('Debe de invocar el checkingAuthentication ', async() => {
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });
    

    test('startGoogleSignIn debe de invocar el checkingcredentials y el login - Exito', async() => {
        const loginData={ ok:true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn() (dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe de invocar el checkingcredentials y el logout - Error', async() => {
        const loginData={ ok:false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn() (dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startCreatingUserWithEmailPassword debe de invocar el checkingcredentials y el login - Exito ', async() => {
        const loginData={ ok:true, ...demoUser };
        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword({...demoUser, password:'123'}) ( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );
    });

    test('startCreatingUserWithEmailPassword debe de invocar el checkingcredentials y el logout - Error ', async() => {
        const loginData={ ok:false, ...demoUser, errorMessage: 'Un error en Google' };
        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword({...demoUser, password:'123'}) ( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });
    
    test('startLogOut debe de invocar el logOutFireBase, clearNotesLogout y el logout - Exito ', async() => {
        
        await startLogOut() ( dispatch );
        expect( logOutFireBase ).toHaveBeenCalled( );
        expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() );
        expect(dispatch).toHaveBeenCalledWith( logout() );
    });

});