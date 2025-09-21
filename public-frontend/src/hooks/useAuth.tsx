import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, type LoginRequest, type RegisterRequest, type User } from '../api/client'

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  isLoggedIn: boolean
  isAdmin: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  setError: (msg?: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const isLoggedIn = () => {
    return localStorage.getItem('access_token') !== null
  }

  const isAdmin = () => {
    return user?.is_superuser || false
  }

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn()) {
        try {
          const userData = await authApi.getCurrentUser()
          setUser(userData)
        } catch (err) {
          localStorage.removeItem('access_token')
          setUser(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (data: LoginRequest) => {
    try {
      setError(null)
      const response = await authApi.login(data)
      localStorage.setItem('access_token', response.access_token)

      // Get user data after successful login
      const userData = await authApi.getCurrentUser()
      setUser(userData)

      // Redirect based on user role
      if (userData.is_superuser) {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed')
      throw err
    }
  }

  const register = async (data: RegisterRequest) => {
    try {
      setError(null)
      await authApi.register(data)
      navigate('/login')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed')
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
    navigate('/')
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    isLoggedIn: isLoggedIn(),
    isAdmin: isAdmin(),
    login,
    register,
    logout,
    setError: (msg?: string | null) => setError(msg ?? null),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
