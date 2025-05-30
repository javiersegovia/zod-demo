import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ZodHome,
})

function ZodHome() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-gray-950" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center space-y-8">
            {/* Zod Logo */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full scale-150" />
              </div>
            </div>
            
            {/* Title */}
            <div className="space-y-4 flex justify-center flex-col">
              <img src="https://zod.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.39fe259d.png&w=128&q=75" alt="Zod Logo" className="w-20 h-20 block mx-auto" />
              <h1 className="text-6xl font-bold tracking-tight">
                Intro to <span className="text-blue-400">Zod</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                TypeScript-first schema validation with static type inference.
                Define your data's shape and validate it at runtime with confidence.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Runtime Safety Icon">
                    <title>Runtime Safety</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Runtime Safety</h3>
                <p className="text-gray-400 text-sm">Validate data at runtime and catch errors before they break your app</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="TypeScript First Icon">
                    <title>TypeScript First</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">TypeScript First</h3>
                <p className="text-gray-400 text-sm">Automatically infer static types from your schemas</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Zero Dependencies Icon">
                    <title>Zero Dependencies</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Zero Dependencies</h3>
                <p className="text-gray-400 text-sm">Lightweight and fast with no external dependencies</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <Link 
                to="/presentation/1-intro"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25"
              >
                Start Presentation
              </Link>
              <a 
                href="https://zod.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-neutral-800"
              >
                View Docs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Code Preview Section */}
      <div className="border-t border-zinc-700">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Define a schema once, use it everywhere</h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-neutral-900 border border-zinc-700 rounded-lg overflow-hidden">
              <div className="bg-neutral-800 px-4 py-2 border-b border-neutral-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-400 text-sm ml-4">schema.ts</span>
                </div>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400">
                  <span className="text-blue-400">import</span> &#123; <span className="text-yellow-400">z</span> &#125; <span className="text-blue-400">from</span> <span className="text-green-400">"zod"</span>
                </div>
                <br />
                <div className="text-gray-400">
                  <span className="text-blue-400">const</span> <span className="text-yellow-400">UserSchema</span> <span className="text-gray-500">=</span> <span className="text-yellow-400">z</span>.<span className="text-blue-400">object</span>(&#123;
                </div>
                <div className="text-gray-400 pl-4">
                  <span className="text-red-400">name</span>: <span className="text-yellow-400">z</span>.<span className="text-blue-400">string</span>().<span className="text-purple-400">min</span>(<span className="text-green-400">2</span>),
                </div>
                <div className="text-gray-400 pl-4">
                  <span className="text-red-400">email</span>: <span className="text-yellow-400">z</span>.<span className="text-blue-400">string</span>().<span className="text-purple-400">email</span>(),
                </div>
                <div className="text-gray-400 pl-4">
                  <span className="text-red-400">age</span>: <span className="text-yellow-400">z</span>.<span className="text-blue-400">number</span>().<span className="text-purple-400">min</span>(<span className="text-green-400">18</span>),
                </div>
                <div className="text-gray-400">&#125;)</div>
                <br />
                <div className="text-gray-400">
                  <span className="text-gray-500">{/* TypeScript type automatically inferred! */}</span>
                </div>
                <div className="text-gray-400">
                  <span className="text-blue-400">type</span> <span className="text-yellow-400">User</span> <span className="text-gray-500">=</span> <span className="text-yellow-400">z</span>.<span className="text-purple-400">infer</span><span className="text-gray-500">&lt;</span><span className="text-blue-400">typeof</span> <span className="text-yellow-400">UserSchema</span><span className="text-gray-500">&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
