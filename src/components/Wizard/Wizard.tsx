import React, { useEffect } from 'react';
import { Icon } from 'citric';

import { Container, SideMenu, Step, StepIconBox, StepList, Wrapper } from './styles';
import { useWizard, WizardProvider } from './WizardContext';

export type StepInterface = string[]

interface WizardInterface {
  finished: string[],
  children: React.ReactElement[]
  activeStep: string
}

export const WizardComponent: React.FC<WizardInterface> = (props) => {
  const { activeStep, children } = props;  
  const { current, steps, finished, selectCurrent, updateSteps } = useWizard();

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
    console.log(current, step, finished, finished.includes(step));
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
        {children.map((children, index) => (
          <div key={index} style={{ display: current === children.key ? 'block' : 'none'}}>
            {children}
          </div>
        ))}
      </Container>
    </Wrapper>
  );
}

const Wizard: React.FC<WizardInterface> = (props) => {
  return (
    <WizardProvider>
      <WizardComponent {...props} />
    </WizardProvider>
  )
}

export default Wizard;





