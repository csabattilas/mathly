import Login from '../components/auth/Login'
import { AuthContext } from '../components/auth/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'

const Home = () => {
  const authContext = useContext(AuthContext)
  let location = useLocation()

  return (
    <div>
      <h1>Mathly</h1>
      {!authContext.isLoading ? (
        authContext.user === null ? (
          <Login></Login>
        ) : (
          <Navigate to={location.state?.from ? location.state?.from?.pathname : 'dashboard'} />
        )
      ) : (
        <p>loading ...</p>
      )}
    </div>
  )
}
export default Home
