import * as React from "react";
import { firebaseAuth } from "../../services/firebase";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

interface User {
    displayName: null | string;
    uid: null | string
}

interface UserState {
    user: User |  null;
    isLoading: boolean;
}

interface AuthContextType {
    isLoading: boolean;
    user: User | null;
    signIn?: () => void;
    signOut?: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userState, setUserState] = React.useState<UserState>({
        isLoading: true,
        user: null
    });

    const provider = new GoogleAuthProvider();

    const signIn = async () => {
        return await signInWithPopup(firebaseAuth, provider)
            .then((result) => {})
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })
    };

    const signOut = (callback: VoidFunction) => {
        return firebaseAuth.signOut().then(() => {
            setUserState({isLoading: false, user: null});
            callback();
        });
    };

    firebaseAuth.onAuthStateChanged((user) => {
        setUserState({user, isLoading: false});
    });

    return <AuthContext.Provider value={{
        signIn, signOut,
        user: userState?.user,
        isLoading: userState?.isLoading
    }}>{children}</AuthContext.Provider>;
}
