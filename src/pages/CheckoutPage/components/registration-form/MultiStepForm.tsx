import { useState } from 'react'
import styled from 'styled-components'

import { ContactDetails } from './ContactDetails'
import { DeliveryDetails } from './DeliveryDetails'
import { StepIndicator } from './StepIndicator'
import { type ContactDetailsFormData, type DeliveryDetailsFormData } from './validation'

type Step = {
  id: 'Contact details' | 'Delivery details'
}

const steps: Step[] = [{ id: 'Contact details' }, { id: 'Delivery details' }]

const defaultData: ContactDetailsFormData & DeliveryDetailsFormData = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postcode: '',
  email: '',
  phone: '',
}

const FormContainer = styled.div`
  width: 100%;
  min-height: 480px;
  margin-right: 1.5rem;
  background: var(--ds-color-surface-overlay);
  padding: 1.5rem;
  border-radius: var(--ds-radius-card);
`

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(defaultData)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormData = (data: Partial<typeof defaultData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const currentStepData = steps[currentStep]

  const renderCurrentStep = () => {
    switch (currentStepData.id) {
      case 'Contact details': {
        return (
          <ContactDetails formData={formData} setFormData={handleFormData} onNext={handleNext} />
        )
      }
      case 'Delivery details': {
        return (
          <DeliveryDetails
            formData={formData}
            setFormData={handleFormData}
            onPrevious={handlePrevious}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <FormContainer>
      <StepIndicator
        title={currentStepData.id}
        currentStep={currentStep + 1}
        amountOfSteps={steps.length}
      />
      {renderCurrentStep()}
    </FormContainer>
  )
}
