import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { z } from 'zod/v4'

export const Route = createFileRoute('/presentation/2-core-concepts')({
  component: CoreConceptsPage,
})

// Simple schema for the interactive example
const stringSchema = z.string().min(3, { message: "String must be at least 3 characters long." });

function CoreConceptsPage() {
  const [inputValue, setInputValue] = useState('');
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleValidate = () => {
    const result = stringSchema.safeParse(inputValue);
    if (result.success) {
      setValidationResult('Valid!');
    } else {
      setValidationResult(result.error.issues.map(issue => issue.message).join(', '));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              <span className="text-green-400">2.</span> Core Concepts
            </h1>
            <p className="text-xl text-gray-400 mt-4">
              Understanding the fundamentals of Zod validation
            </p>
          </div>

          <div className="space-y-12 mt-16">
            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Schema Definition</h2>
              <p className="text-gray-400 mb-6">
                Schemas are the heart of Zod. They describe the shape of your data. Here are some common primitive types:
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
{`import { z } from 'zod';

const nameSchema = z.string(); // Basic string

const ageSchema = z.number().positive(); // Positive number

const isAdminSchema = z.boolean(); // Boolean

const tagsSchema = z.array(z.string()); // Array of strings

const statusSchema = z.enum(['pending', 'processing', 'completed']); // Enum

// Object schema
const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().optional(),
});`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Validation Methods</h2>
              <p className="text-gray-400 mb-6">
                Zod provides several ways to validate data against a schema.
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
{`const stringSchema = z.string().min(3, { message: "String must be at least 3 characters long." });

// .parse() - throws an error on invalid data
stringSchema.parse("Hello World"); // OK - returns "Hello World"

try { 
  stringSchema.parse("Hi")
} catch (e) { 
 console.error(e) // Throws ZodError: "String must be at least 3 characters long."
} 

// .safeParse() - returns a result object (success: true/false)
const result = stringSchema.safeParse("Hi");

if (!result.success) { 
  console.log(result.error.issues[0].message); // "String must be at least 3 characters long."
} else {
  console.log("Valid input:", result.data);
}`}
                </SyntaxHighlighter>
              </div>
              <p className="text-gray-400 my-6">
                Enter some text below (min 3 chars):
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter text..."
                  className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 flex-grow"
                />
                <button
                  onClick={handleValidate}
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200"
                >
                  Validate
                </button>
              </div>
              {validationResult && (
                <div className={`mt-4 p-3 rounded-md text-sm ${validationResult === 'Valid!' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                  {validationResult}
                </div>
              )}
            </div>

            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Type Inference</h2>
              <p className="text-gray-400 mb-6">
                Zod automatically creates TypeScript types from your schemas, ensuring your data types stay in sync with your validation logic.
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
{`const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3),
  email: z.string().email(),
  isAdmin: z.boolean().default(false),
  registeredAt: z.date().optional(),
});

type User = z.infer<typeof userSchema>;

// Hovering over User type would show:
// type User = {
//   id: string;
//   username: string;
//   email: string;
//   isAdmin: boolean;
//   registeredAt?: Date | undefined;
// }`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-16">
            <Link 
              to="/presentation/1-intro"
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-neutral-800"
            >
              ← Back to Intro
            </Link>
            <Link 
              to="/presentation/3-common-use-cases"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-green-600/25"
            >
              Next: Use Cases →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
