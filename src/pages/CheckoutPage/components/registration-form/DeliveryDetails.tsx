import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@droppy-ui/design-system'

import { saveOrderAction } from '../../../../app-state/order'
import { useAppDispatch, useAppSelector } from '../../../../app-state'
import { clearCartAction, selectCartItems } from '../../../../app-state/cart'
import { type DeliveryDetailsFormData } from './validation'

type DeliveryDetailsProps = {
  formData: DeliveryDetailsFormData
  setFormData: (data: Partial<DeliveryDetailsFormData>) => void
  onPrevious: () => void
}

type FormErrors = {
  [K in keyof DeliveryDetailsFormData]?: string
}

const deliveryFields: (keyof DeliveryDetailsFormData)[] = ['address', 'city', 'postcode']

const validateField = (name: keyof DeliveryDetailsFormData, value: string): string | undefined => {
  if (!value) return 'Required'

  switch (name) {
    case 'address': {
      return value.length < 5 ? 'Please enter a valid address' : undefined
    }
    case 'city': {
      return value.length < 2 ? 'Please enter a valid city' : undefined
    }
    case 'postcode': {
      return /^[0-9]{4}[A-Z]{2}$/.test(value)
        ? undefined
        : 'Please enter a valid postcode (e.g., 1234AB)'
    }
    default: {
      return undefined
    }
  }
}

export const DeliveryDetails = ({ formData, setFormData, onPrevious }: DeliveryDetailsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const [errors, setErrors] = useState<FormErrors>({})
  const [form, setForm] = useState<DeliveryDetailsFormData>(formData)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (isSubmitted) {
      const error = validateField(name as keyof DeliveryDetailsFormData, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleComplete = () => {
    setIsSubmitted(true)

    // Validate only delivery fields
    const newErrors: FormErrors = {}
    let hasErrors = false

    for (const field of deliveryFields) {
      const error = validateField(field, form[field])
      if (error) {
        newErrors[field] = error
        hasErrors = true
      }
    }

    setErrors(newErrors)

    if (!hasErrors) {
      setFormData(form)
      dispatch(saveOrderAction(cartItems))
      dispatch(clearCartAction())
      navigate('/success')
    }
  }

  return (
    <div className="form">
      <Input
        label="Streetname and housenumber"
        placeholder="Some street, 13"
        name="address"
        value={form.address}
        onChange={handleChange}
        error={isSubmitted ? errors.address : undefined}
      />
      <Input
        label="Postcode"
        placeholder="AAAAXX"
        name="postcode"
        value={form.postcode}
        onChange={handleChange}
        error={isSubmitted ? errors.postcode : undefined}
      />
      <Input
        label="City"
        placeholder="Amsterdam"
        name="city"
        value={form.city}
        onChange={handleChange}
        error={isSubmitted ? errors.city : undefined}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button clear onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleComplete}>Complete order</Button>
      </div>
    </div>
  )
}
