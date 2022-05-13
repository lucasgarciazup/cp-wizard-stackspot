import React, { useEffect } from 'react';
import { Icon } from 'citric';

import { Container, SideMenu, Step, StepIconBox, StepList, Wrapper } from './styles';
import { useStepper, StepperProvider } from './StepperContext';

export type StepInterface = string[]

interface StepperInterface {
  children: React.ReactElement<{ key: string }>[]
  activeStep: string
}

export const StepperComponent: React.FC<StepperInterface> = (props) => {
  const { activeStep, children } = props;
  const { current, steps, finished, selectCurrent, updateSteps } = useStepper();

  useEffect(() => {
    if (activeStep) {
      selectCurrent(activeStep)
    }
  }, [activeStep])

  useEffect(() => {
    if (!steps.length) {
      const keys = children.map(x => String(x!.key))
      updateSteps(keys)
    }
  }, [])

  function isCurrent(key: string): boolean {
    return current === key;
  }

  function getStepClassName(step: string): string {
    const current = isCurrent(step);
    const stepfinished = finished.includes(step)
    if (stepfinished) {
      return 'finished';
    }
    if (!stepfinished && current) {
      return "current"
    }
    return "disabled"
  }

  return (
    <Wrapper>
      <SideMenu>
        <StepList>
          {steps.length && steps.map((step, index) => (
            <Step
              key={index}
              onClick={() => finished.includes(step) && selectCurrent(step)}
              className={getStepClassName(step)}
            >
              <StepIconBox>
                <Icon.Default name="checkbox" color='base.b1' size='small' />
              </StepIconBox>
              {step}
            </Step>
          ))}
        </StepList>
      </SideMenu>
      <Container>
        {children.map((children) => {
          if (current === children.key) {
            return children
          }
        })}
      </Container>
    </Wrapper>
  );
}

const Stepper: React.FC<StepperInterface> = (props) => {
  return (
    <StepperProvider>
      <StepperComponent {...props} />
    </StepperProvider>
  )
}

export default Stepper;





