import { useState, ChangeEvent } from 'react'
import { Body, Button, Input } from '@droppy-ui/design-system'
import styled from 'styled-components'

import { type ContactDetailsFormData } from './validation'

const DisclaimerText = styled(Body)`
  margin-bottom: 1.25em;
`

type ContactDetailsProps = {
  formData: ContactDetailsFormData
  setFormData: (data: Partial<ContactDetailsFormData>) => void
  onNext: () => void
}

type FormErrors = {
  [K in keyof ContactDetailsFormData]?: string
}

const contactFields: (keyof ContactDetailsFormData)[] = ['firstName', 'lastName', 'email', 'phone']

const validateField = (name: keyof ContactDetailsFormData, value: string): string | undefined => {
  if (!value) return 'Required'

  switch (name) {
    case 'firstName':
    case 'lastName': {
      return value.length < 2 ? 'Must be at least 2 characters' : undefined
    }
    case 'email': {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : 'Please enter a valid email address'
    }
    case 'phone': {
      return value.length < 10 ? 'Please enter a valid phone number' : undefined
    }
    default: {
      return undefined
    }
  }
}

export const ContactDetails = ({ formData, setFormData, onNext }: ContactDetailsProps) => {
  const [errors, setErrors] = useState<FormErrors>({})
  const [form, setForm] = useState<ContactDetailsFormData>(formData)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (isSubmitted) {
      const error = validateField(name as keyof ContactDetailsFormData, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleNext = () => {
    setIsSubmitted(true)

    // Validate only contact fields
    const newErrors: FormErrors = {}
    let hasErrors = false

    for (const field of contactFields) {
      const error = validateField(field, form[field])
      if (error) {
        newErrors[field] = error
        hasErrors = true
      }
    }

    setErrors(newErrors)

    if (!hasErrors) {
      setFormData(form)
      onNext()
    }
  }

  return (
    <div className="form">
      <Input
        label="First name"
        placeholder="John"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        error={isSubmitted ? errors.firstName : undefined}
      />
      <Input
        label="Last name"
        placeholder="Doe"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        error={isSubmitted ? errors.lastName : undefined}
      />
      <Input
        label="Email"
        type="email"
        placeholder="email address"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={isSubmitted ? errors.email : undefined}
      />
      <Input
        label="Phone number"
        placeholder="phone number"
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        error={isSubmitted ? errors.phone : undefined}
      />
      <DisclaimerText size="XXS" type="span">
        We'll only use your phone to call you about your order
      </DisclaimerText>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
