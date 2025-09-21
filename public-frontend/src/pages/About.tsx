import { Code, Database, Shield, Zap, Users, Github } from 'lucide-react'

const About = () => {
  const techStack = [
    {
      category: 'Backend',
      icon: <Code className="h-6 w-6 text-primary-600" />,
      technologies: [
        { name: 'FastAPI', description: 'Modern, fast web framework for building APIs' },
        { name: 'SQLModel', description: 'SQL databases in Python, designed for simplicity' },
        { name: 'PostgreSQL', description: 'Advanced open source relational database' },
        { name: 'Alembic', description: 'Database migration tool for SQLAlchemy' },
        { name: 'Pydantic', description: 'Data validation using Python type annotations' }
      ]
    },
    {
      category: 'Frontend',
      icon: <Zap className="h-6 w-6 text-primary-600" />,
      technologies: [
        { name: 'React', description: 'A JavaScript library for building user interfaces' },
        { name: 'TypeScript', description: 'Typed superset of JavaScript' },
        { name: 'Vite', description: 'Next generation frontend tooling' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
        { name: 'React Router', description: 'Declarative routing for React' }
      ]
    },
    {
      category: 'DevOps',
      icon: <Database className="h-6 w-6 text-primary-600" />,
      technologies: [
        { name: 'Docker', description: 'Containerization platform' },
        { name: 'Docker Compose', description: 'Multi-container Docker applications' },
        { name: 'Traefik', description: 'Cloud native application proxy' },
        { name: 'GitHub Actions', description: 'CI/CD automation' },
        { name: 'Nginx', description: 'Web server and reverse proxy' }
      ]
    },
    {
      category: 'Security',
      icon: <Shield className="h-6 w-6 text-primary-600" />,
      technologies: [
        { name: 'JWT', description: 'JSON Web Token authentication' },
        { name: 'bcrypt', description: 'Password hashing' },
        { name: 'CORS', description: 'Cross-Origin Resource Sharing' },
        { name: 'HTTPS', description: 'Secure communication' },
        { name: 'Environment Variables', description: 'Secure configuration management' }
      ]
    }
  ]

  const features = [
    {
      title: 'Production Ready',
      description: 'Includes everything needed for production deployment with proper security, monitoring, and scalability considerations.'
    },
    {
      title: 'Developer Experience',
      description: 'Hot reload, automatic API client generation, comprehensive testing setup, and excellent documentation.'
    },
    {
      title: 'Modern Architecture',
      description: 'Follows current best practices with clean separation of concerns, type safety, and maintainable code structure.'
    },
    {
      title: 'Comprehensive Testing',
      description: 'Unit tests, integration tests, and end-to-end tests with Playwright for complete test coverage.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About This Project
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A complete full-stack web application template built with modern technologies, 
          designed to help you quickly start your next project with best practices built-in.
        </p>
      </div>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technology Stack</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {techStack.map((category, index) => (
            <div key={index} className="card">
              <div className="flex items-center space-x-3 mb-6">
                {category.icon}
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.category}
                </h3>
              </div>
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <div key={techIndex}>
                    <h4 className="font-medium text-gray-900">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Structure */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Project Structure</h2>
        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm ml-2">Project Structure</span>
          </div>
          <pre className="text-green-400 text-sm">
{`fastapi/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core functionality
│   │   ├── models.py       # Database models
│   │   └── main.py         # FastAPI app
│   ├── tests/              # Backend tests
│   └── Dockerfile
├── frontend/               # Admin dashboard (React)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── routes/         # Page routes
│   │   └── hooks/          # Custom hooks
│   └── Dockerfile
├── public-frontend/        # Public website (React)
│   ├── src/
│   │   ├── components/     # Public components
│   │   └── pages/          # Public pages
│   └── package.json
├── docker-compose.yml      # Production setup
├── docker-compose.override.yml  # Development setup
└── .env                    # Environment variables`}
          </pre>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Getting Started</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">For Developers</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Clone the repository and explore the codebase</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Check out the API documentation at <code className="bg-gray-100 px-1 rounded">/docs</code></span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Run the test suite to understand functionality</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Customize the configuration in <code className="bg-gray-100 px-1 rounded">.env</code> files</span>
              </li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">For Users</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Explore the public API endpoints</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Test authentication and data operations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Access the admin panel for user management</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-600">•</span>
                <span>Use the database admin interface</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Resources</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/fastapi/full-stack-fastapi-template"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center space-x-2"
          >
            <Github className="h-5 w-5" />
            <span>View Source</span>
          </a>
          <a
            href="https://fastapi.tiangolo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center space-x-2"
          >
            <Users className="h-5 w-5" />
            <span>FastAPI Docs</span>
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
