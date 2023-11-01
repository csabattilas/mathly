import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { AuthContext } from './AuthProvider';

function AuthStatus() {
    const authContext = React.useContext(AuthContext);
    const navigate = useNavigate();

    return (
        (<header>
            {!authContext?.isLoading && <>
                Welcome {authContext?.user.displayName}
                <button
                    onClick={() => {
                        authContext.signOut && authContext.signOut(() => navigate('/'));
                    }}
                >
                    Sign out
                </button>
                </>}
        </header>)
    );
}

export default AuthStatus
