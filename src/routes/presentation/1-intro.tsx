import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/presentation/1-intro')({
  component: IntroPage,
})

function IntroPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold">
            <span className="text-blue-400">1.</span> Introduction to Zod
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Welcome to the Zod presentation! Let's explore how this TypeScript-first 
            validation library can improve your development workflow.
          </p>

          <div className="mt-16 text-left max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">What We'll Cover</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-400 text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">What is Zod?</h3>
                  <p className="text-gray-400 text-sm">Schema validation for TypeScript and JavaScript</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-400 text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Core Concepts</h3>
                  <p className="text-gray-400 text-sm">Schemas, validation, and type inference</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-400 text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Common Use Cases</h3>
                  <p className="text-gray-400 text-sm">Real-world applications and examples</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-yellow-400 text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Advanced Features</h3>
                  <p className="text-gray-400 text-sm">Transforms, custom validations, and more</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Link 
              to="/presentation/2-core-concepts"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25"
            >
              Start with Core Concepts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
