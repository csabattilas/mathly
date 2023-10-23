import {useNavigate} from 'react-router-dom';
import * as React from 'react';
import {AuthContext} from './AuthProvider';

function AuthStatus() {
    const authContext = React.useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext?.user) {
        return <header></header>;
    }

    return  (
           (<header>
                Welcome {authContext?.user.displayName}
                <button
                    onClick={() => {
                        authContext.signOut && authContext.signOut(() => navigate('/'));
                    }}
                >
                    Sign out
                </button>
            </header>)
    );
}

export default AuthStatus
