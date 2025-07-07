//responsável pela estilização de todo codigo
import './App.css' 

//é onde está englobado os tipos de despesas
import Select from './select'

//é a api
import FraseMotivacional from './frases'


export default function App() {
  return(
    <div className='container'>
      <h1>Controle de gastos</h1>
      {/* botão de seleção das despesas */}
      <Select></Select>
      <div className="frase">
        {/* api */}
        <FraseMotivacional></FraseMotivacional>
      </div>
    </div>
    )
}