import { useState } from 'react'
import './styles/pageSearch.css';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if(input === '') {
      alert("Insira algum cep!")
      return;
    }
    
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      console.log(response.data);
      setInput("");
    } catch {
      alert("Ops! Erro ao buscar seu cep.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>
      <div className='container-input'>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder='Digite seu CEP' 
        />
        <button className='button-search' onClick={handleSearch}>
          <FiSearch size={25} color="#fff" /> 
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
            <main className='main'>
                <h2>CEP: {cep.cep}</h2>
                {cep.ddd ? (<span>DDD: {cep.ddd}</span>) : ""}
                <span>{cep.localidade} - {cep.uf}</span>
                {cep.bairro ? <span>Bairro: {cep.bairro}</span> : ""}
                {cep.logradouro ? (<span>{cep.logradouro}</span>) : ""}
                {cep.complemento ? (<span>Complemento: {cep.complemento}</span>) : ""}
                {cep.ibge ? (<span>IBGE: {cep.ibge}</span>) : ""}
            </main>
        )}
    </div>
  )
}

export default App
