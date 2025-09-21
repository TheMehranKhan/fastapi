import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi, type LoginRequest, type RegisterRequest, type User } from '../api/client'

export const useAuth = () => {
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

  // Check if user is logged in on mount
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

  return {
    user,
    loading,
    error,
    isLoggedIn: isLoggedIn(),
    isAdmin: isAdmin(),
    login,
    register,
    logout,
    setError: () => setError(null),
  }
}
