import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Zap, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { authApi } from '../api/client'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState<'loading' | 'online' | 'offline'>('loading')

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'API Demo', href: '/api' },
    { name: 'Contact', href: '/contact' },
  ]
  const { isLoggedIn, logout, user } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      // Check API status when user is logged in
      authApi.getHealthCheck()
        .then(() => setApiStatus('online'))
        .catch(() => setApiStatus('offline'))
    }
  }, [isLoggedIn])

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">FastAPI Demo</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                API Docs
              </a>
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <div className="flex items-center space-x-2 mr-4">
                    <div className={`w-2 h-2 rounded-full ${
                      apiStatus === 'online' ? 'bg-green-500' : 
                      apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm text-gray-600">
                      API: {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : 'Checking...'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mr-4">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{user?.full_name}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="space-y-2 mt-2">
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary block w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                API Docs
              </a>
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary block w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className={`w-2 h-2 rounded-full ${
                      apiStatus === 'online' ? 'bg-green-500' : 
                      apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm text-gray-600">
                      API: {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : 'Checking...'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{user?.full_name}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="btn-secondary block w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      logout()
                    }}
                    className="btn-secondary block w-full text-center"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
