import React, {useState} from 'react'
//import {useHistory} from 'react-router-dom';
import swal from 'sweetalert'

function Home() {

  const[nome,     setNome]      = useState('');
  const[email,    setEmail]     = useState();
  const[select,   setSelect]    = useState();
  const[descricao,setDescricao] = useState();
  // const history = useHistory()

  async function enviarDados(e) {
  
  e.preventDefault();
    
  const data = {
    nome,
    email,
    select,
    descricao,
    
  };
  console.log(data.nome, data.email, data.select, data.descricao)

  if(data.nome === "" || 
    data.email === "" || 
    data.select === "" || 
    data.descricao === "") 
    
  {
    swal({
      title: "Erro Encontrado!",
      text: "Campos Obrigatórios não Preenchidos",
      icon: "warning",
      button: "Tentar Novamente!",
      }); 
    } else{
      swal({
        title: "Dados Enviados!",
        icon: "success",
        button: "Ok",
        }); 
    }
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm">
      <div className="container">
        <h1 className="text-primary text-justify"> Teste Prático - SlideWorks </h1>

        <form onSubmit={enviarDados}>
          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome do Card" 
              value={nome}
              onChange={ e =>  setNome(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              class="form-control" 
              id="email"
              type="email"
              placeholder="email@exemplo.com" 
              value={email}
              onChange={ e =>  setEmail(e.target.value) }
              />
          </div>
          
          <div class="form-group">
            <label for="select">Informações do Car</label>
              <select 
                class="form-control" 
                id="select"
                onChange={e => setSelect(e.target.value)}
                value={select}
              >
                <option> Escolha uma opção</option>
                <option value="um">   1</option>
                <option value="dois"> 2</option>
                <option value="três"> 3</option>
                <option value="quatro">4</option>
              </select>
          </div>
          
          <div class="form-group">
            <label for="descricao">Descrição do Card</label>
            <textarea 
              class="form-control" 
              id="descricao"
              rows="2" 
            
              value={descricao}
              onChange={(e) =>  setDescricao(e.target.value) }
              >
            </textarea>
          </div> 

          <button type="submit" class="btn btn-dark">Enviar</button>
        </form>
        <nav className="my-2 my-md-0 mr-md-3">
        </nav>
    </div>
  </div>
  );
}

export default Home;