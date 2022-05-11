import React, { ReactNode, useState } from 'react';
import { Button, Icon } from 'citric';

import { Container, ContainerFooter, ContainerFooterWrapper, SideMenu, Step, StepIconBox, StepList, Wrapper } from './styles';

type CurrentType = number;

interface ResponseActionInterface {
  valid: boolean;
  error?: string;
}

export interface StepInterface {
  title: string;
  skipStep?: boolean;
  backStep?: boolean;
  content?: JSX.Element;
  action: {
    text?: string;
    function: (args?: any) => ResponseActionInterface;
  };
}

interface WizardInterface {
  steps: StepInterface[]
}

const Wizard: React.FC<WizardInterface> = ({ steps }) => {
  const [current, setCurrent] = useState<CurrentType>(0);
  const [completed, setCompleted] = useState<CurrentType[]>([]);

  function getStep() {
    return steps[current] || null;
  }

  function nextStep() {
    const response = getStep().action.function();
    if (response.valid) {
      if (current < (steps.length - 1)) {
        setCompleted(state => [...state, current])
        setCurrent(state => state + 1);
      }
    } else if (response.error) {
      alert(response.error)
    }
  }

  function skipStep() {
    if (current < (steps.length - 1)) {
      setCompleted(state => [...state, current])
      setCurrent(state => state + 1);
    }
  }

  function prevStep() {
    if (current >= 1) {
      setCurrent(state => state - 1);
      setCompleted(state => state.filter(x => x !== current - 1))
    }
  }

  function handleSelectCurrent(index: number) {
    if (completed.includes(index)) {
      setCurrent(index);
    }
  }
  
  function isCurrent(key: StepInterface | number): boolean {
    if (typeof key === 'number') {
      return current === key;
    }
    return current === steps.findIndex(value => value === key)
  }

  function getStepClassName(step: StepInterface, index: number): string {
    const current = isCurrent(step);
    const stepCompleted = completed.includes(index)
    if (stepCompleted) {
      return 'completed';
    }

    if (!stepCompleted && current) {
      return "current"
    }

    return "disabled"
  }

  return (
    <Wrapper>
      <SideMenu>
        <StepList>
          {steps.length && steps.map((el, index) => (
            <Step
                key={index}
                onClick={() => handleSelectCurrent(index)} 
                className={getStepClassName(el, index)}
              >
              <StepIconBox>
                <Icon.Default name="checkbox" color='base.b1' size='small'/>
              </StepIconBox>
              {el.title}
            </Step>
          ))}
        </StepList>
      </SideMenu>
      <Container>
            
         {getStep()?.content}

         <ContainerFooter>
            
            <ContainerFooterWrapper>

          {((current > 0) && getStep().backStep !== false) && (
            <Button
            text="Voltar"
            color="secondary"
            onClick={prevStep}
            />
            )}

            </ContainerFooterWrapper>

            <ContainerFooterWrapper>

          {getStep().skipStep && (
            <Button
            text="Pular Etapa"
              color="tertiary"
              onClick={skipStep}
            />
          )}

          <Button
            text={getStep().action.text || "Próximo"}
            color="primary"
            onClick={nextStep}
            />
            </ContainerFooterWrapper>

         </ContainerFooter>

      </Container>
    </Wrapper>
  );
}

export default Wizard;


