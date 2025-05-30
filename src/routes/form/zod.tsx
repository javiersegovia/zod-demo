import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod/v4'

export const Route = createFileRoute('/form/zod')({
  component: ZodForm,
})

const userRegistrationSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      "Password must contain uppercase, lowercase, and number"),

  confirmPassword: z.string()
    .min(1, "Please confirm your password"),

  accountType: z.enum(["Personal", "Business"], { error: 'Account type is required' }),

  companyName: z.string().optional(),

  age: z.string()
    .min(1, "Age is required")
    .transform(val => Number.parseInt(val))
    .refine(age => !Number.isNaN(age) && age >= 18 && age <= 120, 
      "Age must be between 18 and 120"),

  website: z.url("Website must be a valid URL").optional().or(z.literal("")),

  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
})
.check((ctx) => {
  if (ctx.value.password !== ctx.value.confirmPassword) {
    ctx.issues.push({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
      input: ctx.value.confirmPassword,
    });
  }
  if (ctx.value.accountType === "Business") {
    if (!ctx.value.companyName || ctx.value.companyName.trim().length < 2) {
      ctx.issues.push({
        code: "custom",
        message: "Company name is required for business accounts and must be at least 2 characters",
        path: ["companyName"],
        input: ctx.value.companyName,
      });
    }
  }
})

type FormData = z.infer<typeof userRegistrationSchema>
type FormErrors = z.core.$ZodFlattenedError<FormData>

function ZodForm() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    age: 0,
    website: '',
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<FormErrors['fieldErrors']>({})

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = userRegistrationSchema.safeParse(formData)
    
    if (result.success) {
      console.log('Form data submitted (Zod):', result.data)
      alert('Form submitted successfully!')
      setErrors({})
    } else {
      const zodErrors = z.flattenError(result.error)
      console.log('Form has errors:', zodErrors)

      setErrors(zodErrors.fieldErrors)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-blue-400">Zod</span> Form Validation
          </h1>
          <p className="text-xl text-gray-400">
            Schema-first validation with automatic TypeScript type inference
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Account Information */}
          <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="bg-neutral-950 border-neutral-700 text-white"
                  placeholder="john_doe"
                  aria-invalid={!!errors.username}
                />
                {errors.username && <p className="text-red-400 text-sm">{errors.username[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => {
                    const result = userRegistrationSchema.shape.email.safeParse(formData.email)
                    if (!result.success) {
                      console.log(result.error.issues[0].message)
                      setErrors(prev => ({ ...prev, email: [result.error.issues[0].message] }))
                    }
                  }}
                  className="bg-neutral-950 border-neutral-700 text-white"
                  placeholder="john@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email[0]}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-neutral-950 border-neutral-700 text-white"
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && <p className="text-red-400 text-sm">{errors.password[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-neutral-950 border-neutral-700 text-white"
                    aria-invalid={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword[0]}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType" className="text-white">Account Type *</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger className="bg-neutral-950 border-neutral-700 text-white">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>

                  <SelectContent className="bg-neutral-900 border-neutral-700">
                    <SelectItem value="Personal" className="text-white hover:bg-neutral-800">Personal</SelectItem>
                    <SelectItem value="Business" className="text-white hover:bg-neutral-800">Business</SelectItem>
                  </SelectContent>
                </Select>
                {errors.accountType && <p className="text-red-400 text-sm">{errors.accountType[0]}</p>}
              </div>

              {formData.accountType === 'Business' && (
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="bg-neutral-950 border-neutral-700 text-white"
                    placeholder="ACME Corp"
                    aria-invalid={!!errors.companyName}
                  />
                  {errors.companyName && <p className="text-red-400 text-sm">{errors.companyName[0]}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-white">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="bg-neutral-950 border-neutral-700 text-white"
                  placeholder="25"
                  min="18"
                  max="120"
                  aria-invalid={!!errors.age}
                />
                {errors.age && <p className="text-red-400 text-sm">{errors.age[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-white">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="bg-neutral-950 border-neutral-700 text-white"
                  placeholder="https://johndoe.com"
                  aria-invalid={!!errors.website}
                />
                {errors.website && <p className="text-red-400 text-sm">{errors.website[0]}</p>}
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="bg-neutral-900/50 border border-zinc-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Agreement</h2>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-neutral-700 border-gray-600 rounded focus:ring-blue-500"
                  aria-invalid={!!errors.termsAccepted}
                />
                <Label htmlFor="termsAccepted" className="text-white">
                  I accept the terms and conditions *
                </Label>
              </div>
              {errors.termsAccepted && <p className="text-red-400 text-sm">{errors.termsAccepted[0]}</p>}
            </div>
          </div>
        </form>
      </div>

      {/* Sticky Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-sm border-t border-zinc-700 p-4">
        <div className="max-w-2xl mx-auto flex justify-center">
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25"
          >
            Submit Registration (Zod)
          </Button>
        </div>
      </div>
    </div>
  )
}
