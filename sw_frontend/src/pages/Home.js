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
            icon: "success",
            text: "Feche a janela e clique em 'BUSCAR' ",
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
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 mt-2 bg-light ">
      <div className="container">
        <h1 className="text-dark text-center mt-2 mb-4"> Página Inicial - SlideWorks </h1>

        <form onSubmit={enviarDados}>
          <div class="row">
            <div class="form-group col-md-6">
              <h4>
                <label class="mb-1 font-weight-bold">Nome do novo Board</label>
              </h4>
              <input
                class="form-control mb-2" 
                type="text"
                placeholder="Escolha nome para seu novo Board" 
                value={board}
                onChange={ e => setBoard(e.target.value)}
              />
            </div>
            
            <div class="form-group col-md-4">
              <h4>
                <label class="mb-1 font-weight-bold" for="selectCor">Cor do Board</label>
              </h4>
              <select 
                id="selectCor"
                class="form-control mb-2" 
                value={colorBoard}
                onChange={e => setColorBoard(e.target.value)}
              >
                <option selected >  Escolha uma cor</option>
                <option value="orange"> Laranjado  </option>
                <option value="green">  Verde      </option>
                <option value="red">    Vermelho   </option>
                <option value="pink">   Rosa       </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="form-group col-md-6">
              <h4>
                  <label class="mb-1 font-weight-bold" for="selectCor">Nome da nova Lista</label>
              </h4>
              <input
                class="form-control mb-2" 
                type="text"
                placeholder="Nome da nova LISTA" 
                value={list}
                onChange={ e => setList(e.target.value)}
              />
            </div>
          
            <div class="form-group col-md-6">
              <h4>
                <label class="mb-1 font-weight-bold" for="selectCor">Nome do novo Card</label>
              </h4>
              <input
                class="form-control mb-2" 
                type="text"
                placeholder="Nome do novo CARD" 
                value={card}
                onChange={ e => setCard(e.target.value)}
              />
            </div>
          </div>

          <div class="form-group">
            <h4>
              <label class="mb-1 font-weight-bold" for="selectCor">Descrição do CARD</label>
             </h4>
              <textarea
                class="form-control mb-2" 
                type="textarea"
                placeholder="Descrição do novo CARD" 
                value={descCard}
                onChange={ e =>  setDescCard(e.target.value)}
              />
          </div>
          
          <div class="row">
            <div class="form-group col-md-6">
              <h4>
                <label class="mb-1 font-weight-bold" for="selectCor">Nome do novo CheckList</label>
              </h4>
              <input
                class="form-control mb-2" 
                type="text"
                placeholder="Nome do novo CHECKLIST" 
                value={nameChecklist}
                onChange={ e =>  setNameChecklist(e.target.value)}
              />
            </div>
            <div class="form-group col-md-4">
              <h4>
                <label class="mb-1 font-weight-bold" for="selectCor">Item do CheckList</label>
              </h4>
                <select 
                  id="inputState"
                  class="form-control"
                  value={itemCheckItem}
                  onChange={e => setItemCheckItem(e.target.value)}
                >
                  <option selected>Selecione um Item</option>
                  <option value="Urgente">Urgente</option>
                  <option value="Não Urgente">Não Urgente</option>
                </select>
              </div>
            </div>
          <button type="submit" class="btn btn-dark mt-3">Salvar no Trello</button>
        </form>

        <div class="row mt-5 col">
          <button type="button" class="btn btn-info">
            <a  type="button" href={link}>
              <h4>
                Buscar
              </h4>  
            </a>
          </button>
        </div>
        
    </div>
  </div>
  
  );
}

export default Home;