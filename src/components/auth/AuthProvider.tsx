import * as React from "react";
import { firebaseAuth } from "../../services/firebase";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

interface User {
    displayName: null | string;
    uid: null | string
}

interface AuthContextType {
    isActive: boolean;
    user: User | null;
    signIn?: () => void;
    signOut?: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>({
        isLoading: false,
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
            setUser(null);
            callback();
        });
    };

    firebaseAuth.onAuthStateChanged((user) => {
        console.log(user);
        setUser({user, isLoading: false});
    });

    return <AuthContext.Provider value={{
        signIn, signOut,
        user: user.user,
        isLoading: user.isLoading
    }}>{children}</AuthContext.Provider>;
}
