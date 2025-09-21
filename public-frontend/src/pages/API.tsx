import React, { useState } from 'react'
import { CheckCircle, XCircle, Loader, Copy, ExternalLink } from 'lucide-react'
import { apiClient, authApi } from '../api/client'

interface ApiResponse {
  endpoint: string
  method: string
  description: string
  example: string
  response?: any
  error?: string
}

const API = () => {
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const apiEndpoints: ApiResponse[] = [
    {
      endpoint: '/api/v1/utils/health-check/',
      method: 'GET',
      description: 'Check if the API is running and healthy',
      example: 'curl http://localhost:8000/api/v1/utils/health-check/'
    },
    {
      endpoint: '/api/v1/users/me',
      method: 'GET',
      description: 'Get current user information (requires authentication)',
      example: 'curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/v1/users/me'
    },
    {
      endpoint: '/api/v1/items/',
      method: 'GET',
      description: 'Get all items (requires authentication)',
      example: 'curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/v1/items/'
    },
    {
      endpoint: '/api/v1/login/access-token',
      method: 'POST',
      description: 'Authenticate user and get access token',
      example: 'curl -X POST http://localhost:8000/api/v1/login/access-token -H "Content-Type: application/x-www-form-urlencoded" -d "username=admin@example.com&password=changethis"'
    },
    {
      endpoint: '/api/v1/register',
      method: 'POST',
      description: 'Register a new user',
      example: 'curl -X POST http://localhost:8000/api/v1/register -H "Content-Type: application/json" -d \'{"email":"user@example.com","password":"password123","full_name":"John Doe"}\''
    }
  ]

  const testEndpoint = async (endpoint: ApiResponse) => {
    const key = endpoint.endpoint
    setLoading((prev: Record<string, boolean>) => ({ ...prev, [key]: true }))
    
    try {
      // Use the shared apiClient / authApi so the Authorization interceptor picks up the token from localStorage
      if (endpoint.endpoint.includes('/login/access-token')) {
        // Perform login and persist token
        const loginResp = await authApi.login({ username: 'admin@example.com', password: 'changethis' })
        // Save token so subsequent apiClient requests include it via interceptor
        localStorage.setItem('access_token', loginResp.access_token)

        setResponses((prev: Record<string, any>) => ({
          ...prev,
          [key]: {
            status: 200,
            data: loginResp,
            success: true
          }
        }))
      } else {
        // Generic request using apiClient; apiClient has baseURL set and will attach Authorization
        const axiosResp = await apiClient.request({
          url: endpoint.endpoint,
          method: endpoint.method as any,
        })

        setResponses((prev: Record<string, any>) => ({
          ...prev,
          [key]: {
            status: axiosResp.status,
            data: axiosResp.data,
            success: axiosResp.status >= 200 && axiosResp.status < 300
          }
        }))
      }
    } catch (error) {
      setResponses((prev: Record<string, any>) => ({
        ...prev,
        [key]: {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }))
    } finally {
      setLoading((prev: Record<string, boolean>) => ({ ...prev, [key]: false }))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusIcon = (endpoint: string) => {
    const response = responses[endpoint]
    if (loading[endpoint]) {
      return <Loader className="h-5 w-5 text-blue-500 animate-spin" />
    }
    if (response) {
      return response.success ? 
        <CheckCircle className="h-5 w-5 text-green-500" /> : 
        <XCircle className="h-5 w-5 text-red-500" />
    }
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          API Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Test the FastAPI endpoints directly from this page. Click "Test" to see live responses.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="card hover:shadow-lg transition-shadow duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <ExternalLink className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
            <div>
              <h3 className="font-semibold text-gray-900">Interactive Docs</h3>
              <p className="text-sm text-gray-600">Swagger UI with live testing</p>
            </div>
          </div>
        </a>
        
        <a
          href="http://localhost:8000/redoc"
          target="_blank"
          rel="noopener noreferrer"
          className="card hover:shadow-lg transition-shadow duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <ExternalLink className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
            <div>
              <h3 className="font-semibold text-gray-900">ReDoc</h3>
              <p className="text-sm text-gray-600">Alternative API documentation</p>
            </div>
          </div>
        </a>

        <a
          href="http://localhost:8081"
          target="_blank"
          rel="noopener noreferrer"
          className="card hover:shadow-lg transition-shadow duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <ExternalLink className="h-6 w-6 text-primary-600 group-hover:text-primary-700" />
            <div>
              <h3 className="font-semibold text-gray-900">Database Admin</h3>
              <p className="text-sm text-gray-600">Adminer database interface</p>
            </div>
          </div>
        </a>
      </div>

      {/* API Endpoints */}
      <div className="space-y-6">
        {apiEndpoints.map((endpoint, index) => (
          <div key={index} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                    {endpoint.endpoint}
                  </code>
                  {getStatusIcon(endpoint.endpoint)}
                </div>
                <p className="text-gray-600 mb-3">{endpoint.description}</p>
              </div>
              <button
                onClick={() => testEndpoint(endpoint)}
                disabled={loading[endpoint.endpoint]}
                className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
              >
                {loading[endpoint.endpoint] ? 'Testing...' : 'Test'}
              </button>
            </div>

            {/* Example Code */}
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Example Request</span>
                <button
                  onClick={() => copyToClipboard(endpoint.example)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
                {endpoint.example}
              </pre>
            </div>

            {/* Response */}
            {responses[endpoint.endpoint] && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 text-sm font-medium">Response</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    responses[endpoint.endpoint].success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    Status: {responses[endpoint.endpoint].status || 'Error'}
                  </span>
                </div>
                <pre className="text-gray-800 text-sm overflow-x-auto bg-white p-3 rounded border">
                  {JSON.stringify(responses[endpoint.endpoint].data || responses[endpoint.endpoint].error, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Authentication Note */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Authentication Note</h3>
        <p className="text-blue-800 text-sm">
          Some endpoints require authentication. To test them properly, first call the login endpoint to get an access token, 
          then use that token in the Authorization header for protected endpoints.
        </p>
        <div className="mt-3">
          <p className="text-blue-800 text-sm font-medium mb-1">Default admin credentials:</p>
          <code className="text-blue-700 text-sm bg-blue-100 px-2 py-1 rounded">
            admin@example.com / changethis
          </code>
        </div>
      </div>
    </div>
  )
}

export default API
