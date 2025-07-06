import './App.css'
import Select from './select'
import Fixas from './fixas'
import Variadas from './variadas'
import FraseMotivacional from './frases'


export default function App() {
  return(
    <div className='container'>
      <h1>Controle de gastos</h1>
      <Select></Select>
      <div className="frase">
        <FraseMotivacional></FraseMotivacional>
      </div>
    </div>
    )
}