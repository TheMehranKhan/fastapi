import React, { useState, useEffect } from 'react'
import { ArrowRight, Zap, Shield, Rocket, Code, Database, Mail } from 'lucide-react'

const Home = () => {
  const [apiStatus, setApiStatus] = useState<'loading' | 'online' | 'offline'>('loading')

  useEffect(() => {
    // Check API status
    fetch('http://localhost:8000/api/v1/utils/health-check/')
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'))
  }, [])

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: 'Fast & Modern',
      description: 'Built with FastAPI for high performance and modern Python features.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Secure',
      description: 'JWT authentication, password hashing, and secure by default.'
    },
    {
      icon: <Database className="h-8 w-8 text-primary-600" />,
      title: 'Database Ready',
      description: 'PostgreSQL with SQLModel ORM and Alembic migrations.'
    },
    {
      icon: <Code className="h-8 w-8 text-primary-600" />,
      title: 'Auto Documentation',
      description: 'Interactive API docs with OpenAPI/Swagger integration.'
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary-600" />,
      title: 'Production Ready',
      description: 'Docker, Traefik, CI/CD, and deployment configurations.'
    },
    {
      icon: <Mail className="h-8 w-8 text-primary-600" />,
      title: 'Email Support',
      description: 'Password recovery and email notifications built-in.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              FastAPI Full Stack Template
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              A complete, production-ready template with FastAPI backend and React frontend
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                View API Docs
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </a>
              <a
                href="http://localhost:8081"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary bg-primary-500 hover:bg-primary-400 text-white text-lg px-8 py-3"
              >
                Database Admin
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* API Status */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                apiStatus === 'online' ? 'bg-green-500' : 
                apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm font-medium">
                API Status: {
                  apiStatus === 'online' ? 'Online' : 
                  apiStatus === 'offline' ? 'Offline' : 'Checking...'
                }
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This template includes all the modern tools and patterns you need to build a production-ready full-stack application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Start
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get up and running in minutes with our pre-configured setup.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Try the API</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Check API Health</p>
                    <p className="text-gray-600">Visit the health check endpoint to verify the API is running</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Explore Documentation</p>
                    <p className="text-gray-600">Interactive API docs with request/response examples</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Test Endpoints</p>
                    <p className="text-gray-600">Try out the authentication and data endpoints</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">Terminal</span>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`# Check API health
curl http://localhost:8000/api/v1/utils/health-check/

# Get API docs
open http://localhost:8000/docs

# Test authentication
curl -X POST http://localhost:8000/api/v1/login/access-token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "username=admin@example.com&password=changethis"`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
