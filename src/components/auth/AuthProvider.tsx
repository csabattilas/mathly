import { firebaseAuth } from '../../services/firebase'
import { getCurrentPoints } from '../../services/db/points'
import { createContext, useEffect, useState } from 'react'

export interface User {
  displayName: null | string
  uid: string
  points: number
}
interface AuthContextType {
  isLoading: boolean
  user: User | null
  signIn?: () => void
  signOut?: (callback: () => void) => void
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log('hello app provider')

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async user => {
      console.log('hello status change')
      if (user?.uid) {
        console.log('get points')
        const points = await getCurrentPoints(user?.uid)
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          points,
        })
      }
    })

    setIsLoading(false)
  }, [])

  const signOut = async (callback: () => void) => {
    await firebaseAuth.signOut()
    setUser(null)
    callback()
  }

  return (
    <AuthContext.Provider
      value={{
        signOut,
        user,
        isLoading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
