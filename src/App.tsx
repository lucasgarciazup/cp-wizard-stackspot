import { Button, Modal} from 'citric'
import { useCallback, useState } from 'react'
import Stepper, { useStepper } from './components/Stepper'

const Page1: React.FC = () => {

  const { nextStep, skipStep } = useStepper();

  return (
    <div>
      <h1>Introdução</h1>
  
    </div>
  );
}

const Page4: React.FC = () => {
  return (
    <div>
      <h1>Validação</h1>
    </div>
  );
}

function App() {
  const [visibility, setVisibility] = useState(true)
  
  const handleModal = useCallback(() => {
    setVisibility(!visibility)
    return { valid: true }
  }, [visibility])

  return (
    <div className="App">
      <h1>CP Stepper STACKSPOT</h1>
      
      <Button color="primary" text="Open Modal" onClick={handleModal} />
      {visibility && (
        <Modal visible onClose={handleModal}>
          <Stepper activeStep="Introdução">
              <Page1 key="Introdução" />
              <Page4 key="Validação" />
          </Stepper>
        </Modal>
      )
    }
    </div>
  )
}

export default App
