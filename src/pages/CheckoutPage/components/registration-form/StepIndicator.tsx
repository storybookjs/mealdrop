import { Body, Heading } from '@droppy-ui/design-system'
import styled, { css } from 'styled-components'

import { breakpoints } from '../../../../styles/breakpoints'

const OuterBar = styled.div`
  height: 4px;
  border-radius: var(--ds-radius-control);
  width: 100%;
  background: var(--ds-color-progress-track);
`
const InnerBar = styled.div<{ $progress: string }>(
  ({ $progress }) => css`
    background: var(--ds-color-progress-fill);
    width: ${$progress};
    border-radius: var(--ds-radius-control);
    height: 4px;
    transition: width 0.5s ease-in-out;
  `
)

const TitleSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 0.5em;

  span {
    margin-top: 0.5em;
  }

  @media ${breakpoints.M} {
    margin-bottom: 1em;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    span {
      margin-top: 0;
    }
  }
`

type StepIndicatorProps = {
  title: string
  currentStep: number
  amountOfSteps: number
}

export const StepIndicator = ({ title, currentStep, amountOfSteps }: StepIndicatorProps) => {
  const progress = `${(currentStep / amountOfSteps) * 100}%`
  return (
    <div style={{ marginBottom: '2rem' }}>
      <TitleSection>
        <Heading level={3} size={4}>
          {title}
        </Heading>
        <Body size="XS" type="span">
          Step {currentStep} of {amountOfSteps}
        </Body>
      </TitleSection>
      <OuterBar>
        <InnerBar $progress={progress} />
      </OuterBar>
    </div>
  )
}
