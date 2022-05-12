import { Button, Modal, Tabs, Text } from 'citric'
import TextField from 'citric/dist/components/Textfield';
import { useCallback, useState } from 'react'
import Wizard, { WizardCallback, WizardFooter, WizardFooterWrapper } from './components/Wizard'
import { useWizard } from './components/Wizard/WizardContext';



const Page1: React.FC = () => {

  const { nextStep } = useWizard();

  return (
    <div>
      <h1>Introdução</h1>
      <WizardCallback>
        {({ current, prevStep }) => (
          <WizardFooter>
            <WizardFooterWrapper>
              <Button text="Voltar" color="secondary" onClick={() => prevStep()} />
            </WizardFooterWrapper>
            <WizardFooterWrapper>
              <Button text="Próximo" color="primary" onClick={() => nextStep()} />
            </WizardFooterWrapper>
          </WizardFooter>
        )}
      </WizardCallback>
    </div>
  );
}

const Page2: React.FC = () => {
  return (
    <div>
      <h1>Informações básicas</h1>
     <WizardCallback>
        {({ current, nextStep, prevStep }) => (
          <WizardFooter>
            <WizardFooterWrapper>
              <Button text="Voltar" color="secondary" onClick={() => prevStep()} />
            </WizardFooterWrapper>
            <WizardFooterWrapper>
              <Button text="Próximo" color="primary" onClick={() => nextStep()} />
            </WizardFooterWrapper>
          </WizardFooter>
        )}
      </WizardCallback>
    </div>
  );
}

const Page3: React.FC = () => {
  return (
    <div>
      <h1>Stacks</h1>
      <WizardCallback>
        {({ current, nextStep, prevStep }) => (
          <WizardFooter>
            <WizardFooterWrapper>
              <Button text="Voltar" color="secondary" onClick={() => prevStep()} />
            </WizardFooterWrapper>
            <WizardFooterWrapper>
              <Button text="Próximo" color="primary" onClick={() => nextStep()} />
            </WizardFooterWrapper>
          </WizardFooter>
        )}
      </WizardCallback>
    </div>
  );
}

const Page4: React.FC = ({ handleModal }) => {
  return (
    <div>
      <h1>Validação</h1>
      <WizardCallback>
        {({ current, nextStep, prevStep }) => (
          <WizardFooter>
            <WizardFooterWrapper>
              <Button text="Voltar" color="secondary" onClick={() => prevStep()} />
            </WizardFooterWrapper>
            <WizardFooterWrapper>
              <Button text="Próximo" color="primary" onClick={() => handleModal()} />
            </WizardFooterWrapper>
          </WizardFooter>
        )}
      </WizardCallback>
    </div>
  );
}

function App() {
  const [visibility, setVisibility] = useState(true)
  const [visibility2, setVisibility2] = useState(true)
  
  const handleModal = useCallback(() => {
    setVisibility(!visibility)
    return { valid: true }
  }, [visibility])

  return (
    <div className="App">
      <h1>CP WIZARD STACKSPOT</h1>
      
      <Button color="primary" text="Open Modal" onClick={handleModal} />
      {/* {visibility && (
        <Modal visible onClose={handleModal}>
          <Wizard steps={steps}>

              {step === 'page1' && <Page1 />}
           
          </Wizard>
        </Modal>
      )} */}

      {visibility && (
        <Modal visible onClose={handleModal}>
          <Wizard activeStep="Introdução" finished={[]}>
              <Page1 key="Introdução"/>
              <Page2 key="Informações básicas"/>
              <Page3 key="Stacks"/>
              <Page4 key="Validação" handleModal={handleModal}/>
          </Wizard>
        </Modal>
      )
    }
    </div>
  )
}

export default App
