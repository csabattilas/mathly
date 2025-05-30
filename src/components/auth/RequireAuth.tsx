import { useLocation, Navigate } from 'react-router-dom'
import * as React from 'react'
import { AuthContext } from './AuthProvider'

function RequireAuth({ children }: { children: React.JSX.Element }) {
  const authContext = React.useContext(AuthContext)
  let location = useLocation()
  if (!authContext?.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
