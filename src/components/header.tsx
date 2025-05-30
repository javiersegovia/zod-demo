import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-neutral-900 border-b border-zinc-700 sticky top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <Link 
            to="/" 
            className="text-white font-bold text-xl hover:text-blue-400 transition-colors"
          >
            <span className="text-blue-400">Zod</span> Demo
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {/* Presentation Section */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm font-medium">Presentation:</span>
              <Link 
                to="/presentation/1-intro" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-neutral-800"
                activeProps={{ className: 'text-blue-400 bg-neutral-800' }}
              >
                1. Intro
              </Link>
              <Link 
                to="/presentation/2-core-concepts" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-neutral-800"
                activeProps={{ className: 'text-blue-400 bg-neutral-800' }}
              >
                2. Core Concepts
              </Link>
              <Link 
                to="/presentation/3-common-use-cases" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-neutral-800"
                activeProps={{ className: 'text-blue-400 bg-neutral-800' }}
              >
                3. Use Cases
              </Link>
              <Link 
                to="/presentation/4-advanced-features" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-neutral-800"
                activeProps={{ className: 'text-blue-400 bg-neutral-800' }}
              >
                4. Advanced
              </Link>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-neutral-700" />

            {/* Demo Examples Section */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm font-medium">Examples:</span>
              <Link 
                to="/form/vanilla" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-neutral-800"
                activeProps={{ className: 'text-blue-400 bg-neutral-800' }}
              >
                Vanilla
              </Link>
              <Link 
                to="/form/zod" 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-neutral-800"
                activeProps={{ className: 'text-blue-400 bg-neutral-800' }}
              >
                Zod
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
