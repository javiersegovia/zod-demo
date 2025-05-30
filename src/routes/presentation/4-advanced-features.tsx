import { Link, createFileRoute } from '@tanstack/react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const Route = createFileRoute('/presentation/4-advanced-features')({
  component: AdvancedFeaturesPage,
})

function AdvancedFeaturesPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              <span className="text-yellow-400">4.</span> Advanced Features
            </h1>
            <p className="text-xl text-gray-400 mt-4">
              Unlock Zod's full potential with these powerful features for complex validation scenarios.
            </p>
          </div>

          <div className="space-y-8 mt-16">
            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Transformations</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">Data Transformations & Preprocessing</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Zod allows you to transform data after validation with <code className="text-sm bg-neutral-700/50 px-1 rounded">.transform()</code>, or preprocess it before validation with <code className="text-sm bg-neutral-700/50 px-1 rounded">z.preprocess()</code>. This is useful for sanitization, casting types, or setting defaults.
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
{`// Example 1: Preprocessing a string to a number, then validating
const stringToNumber = z.preprocess((val) => {
  if (typeof val === 'string') return Number.parseInt(val, 10);
  return val;
}, z.number().positive("Must be a positive number after conversion"));

stringToNumber.parse("42"); // Output: 42 (number)

try {
  stringToNumber.parse("-5")
} catch(e) {
  console.log(e) // Throws ZodError
}

// Example 2: Transforming a string to uppercase after validation
const upperCaseStringSchema = z.string().min(1).transform((val) => val.toUpperCase());

upperCaseStringSchema.parse("hello"); // Output: "HELLO"`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Custom Validations</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">Custom Validations with Refinements</h2>
              </div>
              <p className="text-gray-400 mb-6">
                For complex rules, use <code className="text-sm bg-neutral-700/50 px-1 rounded">.refine()</code> for single field checks or <code className="text-sm bg-neutral-700/50 px-1 rounded">.superRefine()</code> for multi-field (object-level) validations. <code className="text-sm bg-neutral-700/50 px-1 rounded">.superRefine()</code> gives more control over adding issues.
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
{`// Example 1: .refine() for a single field
const usernameSchema = z.string()
  .refine((val) => val.length >= 5, {
    message: "Username must be at least 5 characters"
  });

// Example 2: .superRefine() for cross-field validation (password confirmation)
const passwordSchema = z.object({
  password: z.string().min(8, "Password too short"),
  confirmPassword: z.string().min(8, "Password too short"),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: "Passwords do not match",
    });
  }
});

const result = passwordSchema.safeParse({
  password: "test1234",
  confirmPassword: "test1235"
});

if (!result.success) {
  console.log(result.error.flatten().fieldErrors);
  /* { confirmPassword: ["Passwords do not match"] } */
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Schema Composition</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">Schema Composition</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Build complex schemas by combining simpler ones. Methods like <code className="text-sm bg-neutral-700/50 px-1 rounded">.extend()</code>, <code className="text-sm bg-neutral-700/50 px-1 rounded">.merge()</code>, <code className="text-sm bg-neutral-700/50 px-1 rounded">.pick()</code>, <code className="text-sm bg-neutral-700/50 px-1 rounded">.omit()</code>, <code className="text-sm bg-neutral-700/50 px-1 rounded">.union()</code>, and <code className="text-sm bg-neutral-700/50 px-1 rounded">.discriminatedUnion()</code> offer powerful ways to structure your validations.
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
{`// Example 1: .extend() to add fields
const baseUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
});

const detailedUser = baseUserSchema.extend({
  email: z.string().email()
});

// Example 2: .pick() to select fields
const userIdentity = detailedUser.pick({
  id: true,
  username: true
});

// Example 3: .discriminatedUnion() for different object shapes based on a field
const adminUserSchema = baseUserSchema.extend({
  role: z.literal('admin'),
  permissions: z.array(z.string()),
});

const editorUserSchema = baseUserSchema.extend({
  role: z.literal('editor'),
  canEditPages: z.array(z.string()),
});

const viewerUserSchema = baseUserSchema.extend({
  role: z.literal('viewer'),
});

const userRoleSchema = z.discriminatedUnion('role', [
  adminUserSchema,
  editorUserSchema,
  viewerUserSchema,
]);

userRoleSchema.parse({
  role: 'admin',
  id: 'uuid-admin-1',
  username: 'AdminUser',
  permissions: ['manage_users', 'view_reports']
}); // OK, matches adminUserSchema

userRoleSchema.parse({
  role: 'editor',
  id: 'uuid-editor-1',
  username: 'EditorUser',
  canEditPages: ['home', 'about'],
}); // OK, matches editorUserSchema

userRoleSchema.parse({
  role: 'viewer',
  id: 'uuid-viewer-1',
  username: 'ViewerUser',
}); // OK, matches viewerUserSchema

try {
  userRoleSchema.parse({
    role: 'guest', // Invalid role
    id: 'uuid-guest-1',
    username: 'GuestUser',
  });
} catch (e) {
  // console.log(e.message) // Throws ZodError: Invalid discriminator value. Expected 'admin' | 'editor' | 'viewer', received 'guest'
}

try {
  userRoleSchema.parse({
    role: 'admin',
    id: 'uuid-admin-2',
    username: 'AdminMissingPerms',
    // 'permissions' field is missing for admin role
  });
} catch (e) {
  // console.log(e.flatten().fieldErrors) // Throws ZodError, e.g. { permissions: [ 'Required' ] }
}

try {
  userRoleSchema.parse({
    role: 'editor',
    id: 'uuid-editor-2',
    username: 'EditorMissingPages',
    // 'canEditPages' field is missing for editor role
  });
} catch (e) {
  // console.log(e.flatten().fieldErrors) // Throws ZodError, e.g. { canEditPages: [ 'Required' ] }
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Chaining with Pipe</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">Chaining Operations with .pipe()</h2>
              </div>
              <p className="text-gray-400 mb-6">
                The <code className="text-sm bg-neutral-700/50 px-1 rounded">.pipe()</code> method chains a Zod schema with a subsequent validation or transformation that operates on the successful output of the first. This is powerful for multi-stage data processing pipelines. The input of the second schema is the output of the first.
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
{`// Example 1: Parsing a CSV string of numbers, then validating each is positive
const stringToPositiveNumbersArray = z.string()
  .transform((val) => val.split(',').map(s => s.trim())) // Stage 1: CSV string to string[]
  .pipe( // Stage 2: Validate/transform string[] to number[] (positive)
    z.array(
      z.preprocess( // For each item in the array from Stage 1
        (item) => Number(item), // Attempt to convert to number
        z.number().positive("Each number must be positive") // Validate as positive number
      )
    )
  );

stringToPositiveNumbersArray.parse("1, 2, 3");
// Output: [1, 2, 3] (all numbers)

stringToPositiveNumbersArray.parse(" 10 ,20, 30 ");
// Output: [10, 20, 30] (trimmed and converted)

try {
  stringToPositiveNumbersArray.parse("1, -2, 3");
} catch(e) {
  // console.log(e.issues[0].message); // ZodError: "Each number must be positive"
}

try {
  stringToPositiveNumbersArray.parse("1, two, 3");
} catch(e) {
  // console.log(e.issues[0].message); // ZodError: Expected number, received NaN (for "two" after Number("two"))
}

// Example 2: Ensure a string is a valid URL, then check if it's a specific domain
const ensureExampleComUrl = z.string()
  .url({ message: "Invalid URL format" })
  .pipe(
    z.string().refine(
      (url) => new URL(url).hostname === 'example.com',
      { message: "URL must be from example.com" }
    )
  );

ensureExampleComUrl.parse("https://example.com/path"); // OK

try {
  ensureExampleComUrl.parse("ftp://notaurl");
} catch(e) {
  // console.log(e.issues[0].message); // "Invalid URL format"
}

try {
  ensureExampleComUrl.parse("https://another.com/path");
} catch(e) {
  // console.log(e.issues[0].message); // "URL must be from example.com"
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-16">
            <Link
              to="/presentation/3-common-use-cases"
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-neutral-800"
            >
              ← Back to Use Cases
            </Link>
            <Link
              to="/"
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-yellow-600/25"
            >
              🎉 Finish Presentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
