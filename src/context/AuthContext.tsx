import { createContext, Dispatch, SetStateAction, useState } from "react"

type AuthProviderProps = {
    children : JSX.Element | JSX.Element[]
}

type AuthProps = {
    accessToken? : string
}

type AuthContext = {
    auth : AuthProps
    setAuth : Dispatch<SetStateAction<AuthProps>>
    userName : string
    setUser : Dispatch<SetStateAction<string>>
    userId : string
    setUserId : Dispatch<SetStateAction<string>>
}

const AuthContext = createContext({} as AuthContext)

export const AuthProvider = ({ children } : AuthProviderProps) => {
    const [auth, setAuth] = useState({});
    const [ userName, setUser ] = useState<string>('')
    const [ userId, setUserId ] = useState<string>('')

    return (
        <AuthContext.Provider value={ { auth, setAuth, userName, setUser, userId, setUserId } }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;