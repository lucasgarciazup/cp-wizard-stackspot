import { Button, Modal } from 'citric'
import TextField from 'citric/dist/components/Textfield';
import { useCallback, useState } from 'react'
import Success from './components/Success';
import Wizard, { StepInterface } from './components/Wizard'

const Page1 = () => {
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [techs, setTechs] = useState("");
  const [about, setAbout] = useState("");

  return (
    <div>
      <h1>Informações básicas</h1>
      <p>Preencha os campos abaixo com as informações básicas</p>
      <form action="">
        <TextField.Text width='' title="Nome do estudio" onChange={e => setName(e.target.value)}/>
        <TextField.Text width='' title='Objetivo do estúdio/O que faz' onChange={e => setObjective(e.target.value)}/>
        <TextField.Text width='' title='Tecnologias utilizadas' onChange={e => setTechs(e.target.value)}/>
        <TextField.Text width='' title='Quem somos' onChange={e => setAbout(e.target.value)}/>
        
      </form>
    </div>
  );
}

function App() {
  const [visibility, setVisibility] = useState(true)
  const [data, setData] = useState(false) 

  const handleModal = useCallback(() => {
    setVisibility(!visibility)
    return { valid: true }
  }, [visibility])

  const saveData = useCallback((dados: object) => {
    setData(state => !state)
    return { valid: true, error: "Ocorreu um erro ao salvar os dados" }
  }, [])

  const steps: StepInterface[] = [
    { title: "Introdução", content: Page1(), skipStep: true, action: { function: saveData} },
    { title: "Introdução", content: Page1(), skipStep: true, action: { function: saveData} },
    { title: "Introdução", content: Page1(), skipStep: true, action: { function: saveData} },
    { title: "Validação", content: Success(), backStep: true, skipStep: true, action: { text: "Fechar", function: handleModal} },
  ]

  return (
    <div className="App">
      <h1>CP WIZARD STACKSPOT</h1>

      <Button color="primary" text="Open Modal" onClick={handleModal}/>
        {visibility && (
          <Modal visible onClose={handleModal}>
            <Wizard 
              steps={steps}
            />
          </Modal>
        )
     
          // <Modal visible={visibility} onClose={handleModal}>
          //   <Wizard 
          //     steps={steps}
          //   />
          // </Modal>
        

}
    </div>
  )
}

export default App
