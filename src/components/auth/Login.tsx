import React from 'react'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getCurrentPoints } from '../../services/db/points'

function Login() {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, provider)
    }

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export default Login
