import * as React from "react";
import { firebaseAuth } from "../../services/firebase";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {getCurrentPoints} from '../../services/db/points';

export interface User {
    displayName: null | string;
    uid: string,
    points: number,
}

export interface UserState {
    user: User |  null;
    isLoading: boolean;
}

interface AuthContextType {
    isLoading: boolean;
    user: User | null;
    signIn?: () => void;
    signOut?: (callback: VoidFunction) => void;
    setUser: (user: User | null) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    console.log('hello app provider');

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<User | null>(null)

    const signOut = async (callback: VoidFunction) => {
        await firebaseAuth.signOut();
        setUser(null);
        callback();
    };

    console.log(user);

    if(!user?.uid) {
        firebaseAuth.onAuthStateChanged(async (user) => {
            console.log('hello status change');
            if(user?.uid) {
                const points = await getCurrentPoints(user?.uid);
                setUser({displayName: user.displayName, uid: user.uid, points});
            }
        });
    }

    if(isLoading) {
        setIsLoading(false);
    }

    return <AuthContext.Provider value={{
        signOut,
        user,
        isLoading,
        setUser,
    }}>{children}</AuthContext.Provider>;
}
