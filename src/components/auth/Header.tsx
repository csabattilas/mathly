import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { AuthContext } from './AuthProvider';

function Header() {
    const authContext = React.useContext(AuthContext);
    const navigate = useNavigate();

    return (
        (<header>
            { !authContext.isLoading && authContext.user &&
                <>Welcome {authContext.user?.displayName}
                <button
                    onClick={() => {
                        authContext.signOut && authContext.signOut(() => navigate('/'));
                    }}
                >
                    Sign out
                </button>
                </>
            }
        </header>)
    );
}

export default Header
