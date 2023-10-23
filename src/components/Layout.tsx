import {Link, Outlet} from 'react-router-dom';
import * as React from 'react';
import AuthStatus from './auth/Header';

function Layout() {
    return (
        <div>
            <AuthStatus />
            <Outlet />
        </div>
    );
}

export default Layout;
