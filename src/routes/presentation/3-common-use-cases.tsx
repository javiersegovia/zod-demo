import { Link, createFileRoute } from '@tanstack/react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const Route = createFileRoute('/presentation/3-common-use-cases')({
  component: CommonUseCasesPage,
})

function CommonUseCasesPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              <span className="text-purple-400">3.</span> Common Use Cases
            </h1>
            <p className="text-xl text-gray-400 mt-4">
              Real-world applications where Zod helps maintain data integrity and improve developer experience.
            </p>
          </div>

          <div className="grid gap-8 mt-16">
            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Form Validation</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">Form Validation</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Client-side and server-side form validation with Zod provides a great user experience by giving clear, specific error messages and ensures data quality before it reaches your backend.
              </p>
              <div className="rounded-md overflow-hidden">
                <SyntaxHighlighter 
                  language="typescript" 
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                >
{`const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// Example: Validating form data (e.g., from React state)
const formData = { name: "Jane", email: "jane@example", message: "Hi" };
const result = contactFormSchema.safeParse(formData);

if (!result.success) {
  const errors = z.flattenError(result.error);
  console.log("Form errors:", errors.fieldErrors);
  
  /* Example output for fieldErrors:
     {
       email: [ "Please enter a valid email." ],
       message: [ "Message must be at least 10 characters." ]
     }
  */
} else {
  console.log("Form data is valid:", result.data);
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Environment Variables</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">Environment Variables</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Validate and parse environment variables at application startup to catch configuration errors early and ensure your app has the settings it needs.
              </p>
              <div className="rounded-md overflow-hidden">
                <SyntaxHighlighter 
                  language="typescript" 
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                >
{`const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url("Invalid DATABASE_URL, must be a valid URL."),
  API_KEY: z.string().optional(),
});

// Typically at the start of your application
try {
  const parsedEnv = envSchema.parse(process.env);
  console.log("Environment variables loaded successfully:", parsedEnv.NODE_ENV);
  // Now use parsedEnv.DATABASE_URL, parsedEnv.API_KEY etc.
} catch (error) {
  console.error("Invalid environment variables:", error.errors);
  process.exit(1);
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>API Validation</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">API Request/Response Validation</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Ensuring data flowing into and out of your API endpoints is correctly structured and typed is crucial for robust applications. Zod makes this straightforward.
              </p>
              <div className="rounded-md overflow-hidden">
                <SyntaxHighlighter 
                  language="typescript" 
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                >
{`// Define schema for request body
const createUserRequestSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const userResponseSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
});

// In your route handler (e.g., Express)
app.post('/users', (req, res) => {
  const validation = createUserRequestSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.issues });
  }
  
  // Process validated data: validation.data
  // ... create user ...
  const user = { id: 'uuid-v4-string', ...validation.data };
  return res.json(userResponseSchema.parse(user)); // Validate response too!
});`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-16">
            <Link 
              to="/presentation/2-core-concepts"
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-neutral-800"
            >
              ← Back to Core Concepts
            </Link>
            <Link 
              to="/presentation/4-advanced-features"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-600/25"
            >
              Next: Advanced Features →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
