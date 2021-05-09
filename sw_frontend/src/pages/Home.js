import React, {useState} from 'react'
import swal from 'sweetalert'
import api from '../services/api';

function Home() {

  const[board,     setBoard]    = useState('')
  const[list,     setList]      = useState('')
  const[card,     setCard]      = useState('')
  const[descCard,     setDescCard]   = useState('')
  const[colorBoard,   setColorBoard] = useState('')
  const[nameChecklist, setNameChecklist] = useState('')
  const[itemCheckItem, setItemCheckItem] = useState('')

  const[link, getLink] = useState()

  async function enviarDados(e) {
  
  e.preventDefault();
    
  const data = {
    board,
    list,
    card,
    descCard,
    colorBoard,
    nameChecklist,
    itemCheckItem,
  };

  if(
    data.board ===""  || 
    data.card  ===""  || 
    data.list  ===""  ||
    data.descCard ===""||
    data.colorBoard===""||
    data.itemCheckItem===""||
    data.nameChecklist===""){

    swal({
      title: "Erro Encontrado!",
      text: "Campos Obrigatórios não Preenchidos",
      icon: "warning",
      button: "Tentar Novamente!",
      }); 
    } else{

      /**
       * Criar BOARD com o Nome Digitado
       * Capturar o ID do BOARD e utilizar para criar a LISTA
       * captiurar o Id da LISTA para criar o CARD
      */

      try {
        /** NOVO BOARD */
        const idBoard = 
          await api.post(
            `${process.env.REACT_APP_HOST}/boards/?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${data.board}&prefs_background=${data.colorBoard}&prefs_permissionLevel=public`)
             const responseIdBoard = idBoard.data.id
             const responseCreatedBoard = idBoard.data.url
             getLink(responseCreatedBoard)
              console.log("ID do Board Criado:", responseIdBoard)
              console.log("Link do Board Criado:", link)
              //localStorage.setItem('boarCriado', responseCreatedBoard )
              console.log('Link do Board', responseCreatedBoard)

        /** NOVA LISTA */ 
        const idList =
          await api.post(
            `${process.env.REACT_APP_HOST}/lists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idBoard=${responseIdBoard}&name=${data.list}`)
              const  responseIdList = idList.data.id
              console.log("ID da Lista Criada", responseIdList)
        
        /** NOVO CARD*/
        const idCard =
          await api.post(
            `${process.env.REACT_APP_HOST}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idList=${responseIdList}&name=${data.card}&desc=${data.descCard}`)
              const  responseIdCard = idCard.data.id
              console.log("ID do Card Criado", responseIdCard)

        /** NOVO CheckList*/              
        const checklist =
          await api.post(
            `${process.env.REACT_APP_HOST}/checklists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idCard=${responseIdCard}&name=${data.nameChecklist}`)
              const responseIdChecklist = checklist.data.id
              console.log("ID do Cheklist Criado", responseIdChecklist)

        /** NOVO ItemCheckList*/              
        const itemChecklist =
          await api.post(
            `${process.env.REACT_APP_HOST}/checklists/${responseIdChecklist}/checkItems?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${data.itemCheckItem}`)
              const responseIdItemchecklist = itemChecklist.data.id
              console.log("ID do Cheklist Criado", responseIdItemchecklist)              

          swal({
            title: "Dados Enviados!",
            // text: `Numero do Id Gerado: ${responseCreatedBoard}`,
            icon: "success",
            button: "Ok",
            }); 
            
            //await history.push(`../../${responseCreatedBoard}`)
                  
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

  // async function buscarBoard(e){
  //   window.location.href = `${link}`;
  // }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm">
      <div className="container">
        <h1 className="text-primary text-justify"> Página Teste - SlideWorks </h1>

        <form onSubmit={enviarDados}>
          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome do Board" 
              value={board}
              onChange={ e => setBoard(e.target.value)}
            />

            <label for="selectCor">Cor do Board</label>
              <select 
                id="selectCor"
                class="form-control"
                value={colorBoard}
                onChange={e => setColorBoard(e.target.value)}
              >
                <option value="blue"   selected >  </option>
                <option value="orange"> Laranjado  </option>
                <option value="green">  Verde      </option>
                <option value="red">    Vermelho   </option>
                <option value="pink">   Rosa       </option>
              </select>
          </div>

          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome da lista" 
              value={list}
              onChange={ e => setList(e.target.value)}
            />
          </div>

          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome do Card" 
              value={card}
              onChange={ e => setCard(e.target.value)}
            />
          </div>

          <div class="form-group">
            <textarea
              class="form-control" 
              type="textarea"
              placeholder="Descrição do Card" 
              value={descCard}
              onChange={ e =>  setDescCard(e.target.value)}
            />
          </div>

          <div class="form-group">
            <input
              class="form-control" 
              type="text"
              placeholder="Nome do ChecList" 
              value={nameChecklist}
              onChange={ e =>  setNameChecklist(e.target.value)}
            />

            <label for="inputState">Item do CheckList</label>
              <select 
                id="inputState"
                class="form-control"
                value={itemCheckItem}
                onChange={e => setItemCheckItem(e.target.value)}
              >
                <option value="Outros" selected>Outros</option>
                <option value="Urgente">Urgente</option>
                <option value="Não Urgente">Não Urgente</option>
              </select>
            
          </div>

          <button type="submit" class="btn btn-dark">Enviar Teste</button>
        </form>
        
        <nav 
          className="my-2 my-md-0 mr-md-3">
        </nav>        

        <a href={link}>Buscar</a>
    </div>
  </div>
  );
}

export default Home;