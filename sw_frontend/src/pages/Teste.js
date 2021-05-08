import React, {useState} from 'react'
import swal from 'sweetalert'
import api from '../services/api';

function Test() {

  const[board,     setBoard]    = useState('')
  const[list,     setList]      = useState('')
  const[card,     setCard]      = useState('')

  // const history = useHistory()

  async function enviarDados(e) {
  
  e.preventDefault();
    
  const data = {
    board,
    list,
    card
  };

  if(
    data.board ==="" || 
    data.card  ===""  || 
    data.list  ===""  ){

    swal({
      title: "Erro Encontrado!",
      text: "Campos Obrigatórios não Preenchidos",
      icon: "warning",
      button: "Tentar Novamente!",
      }); 
    } else{

      /**
       * Criar Board com o Nome Digitado
       * Capturar o ID do Board e utilizar para criar a lista
       * captiurar o Id da Lista para criar o CAR
      */

      try {
        /** NOVO BOARD */
        const idBoard = 
          await api.post(
            `${process.env.REACT_APP_HOST}/boards/?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${data.board}`)
             const responseIdBoard = idBoard.data.id
              console.log("ID do Board Criado:", responseIdBoard)

        /** NOVA LISTA */ 
        const idList =
          await api.post(
            `${process.env.REACT_APP_HOST}/lists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idBoard=${responseIdBoard}&name=${data.list}`)
              const  responseIdList = idList.data.id
              console.log("ID da Lista Criada", responseIdList)
        
        /** NOVO CARD*/
        const idCard =
          await api.post(
            `${process.env.REACT_APP_HOST}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idList=${responseIdList}&name=${data.card}`)
              const  responseIdCard = idCard.data.id
              console.log("ID do Card Criado", responseIdCard)
          
          swal({
            title: "Dados Enviados!",
            icon: "success",
            button: "Ok",
            }); 
                  
            } catch (error) {
              swal({
                title: "Erro Inesperado",
                text: "Comunicação com a API do Trello Falhou!",
                icon: "warning",
                button: "Contate o Administrador",
                }); 
              } 
      }
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm">
      <div className="container">
        <h1 className="text-primary text-justify"> Página de Teste - SlideWorks </h1>

        <form onSubmit={enviarDados}>
          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome do Board" 
              value={board}
              onChange={ e =>  setBoard(e.target.value)}
            />
          </div>

          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome da lista" 
              value={list}
              onChange={ e =>  setList(e.target.value)}
            />
          </div>

          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome do Card" 
              value={card}
              onChange={ e =>  setCard(e.target.value)}
            />
          </div>
          
          <button type="submit" class="btn btn-dark">Enviar Teste</button>
        </form>
        <nav className="my-2 my-md-0 mr-md-3">
        </nav>
    </div>
  </div>
  );
}

export default Test;