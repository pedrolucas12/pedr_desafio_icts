
import './App.css';
import {useState} from "react";
import Axios from 'axios';


function App() {
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [produtoList, setProdutoList] = useState([]);

  const addProduto = () => {
    Axios.post('http://localhost:3001/create', {
      nome: nome, 
      descricao: descricao,  
      preco: preco,
    }).then(()=> {
      console.log("Cadastrado com sucesso!");
      alert("Produto cadastrado!");
      window.location.reload();
    });
  } ;

  const getProdutos = () => {
    Axios.get('http://localhost:3001/produtos').then((response)=> {
      setProdutoList(response.data);
    });
  };

  const updateProduto = (val) => {
    Axios.put('http://localhost:3001/produto/', {
      id: val.id,
      nome: val.nome, 
      descricao:val.descricao,  
      preco: val.preco,
    }).then(()=> {
      alert("Produto atualizado!");
      window.location.reload();
    });
  };

  const deleteProduto = (id) => {
    Axios.delete('http://localhost:3001/produto/', {
      id: id,
    }).then(()=> {
      alert("Produto deletado!");
      window.location.reload();
    });
  };

  const editar = (val) => {
    setId(val.id);
    setNome(val.nome);
    setDescricao(val.descricao);
    setPreco(val.preco);
  }

  return <>
    <div className="App">
      <div className='produtos'>
        <h2>Produtos</h2>

        <div className="information">
          <h4>Cadastrar Produto</h4>
          <input
            value={id}
            hidden={true}
            type="text"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
          <br></br>
          <label className='margin01'>Nome: </label>
          <input
            type="text"
            value={nome}
            onChange={(event) => {
              setNome(event.target.value);
            }}
          />
          <br></br>
          <label>Descricao: </label>
          <input
            value={descricao}
            type="text"
            onChange={(event) => {
              setDescricao(event.target.value);
            }}
          />
          <br></br>
          <label className='margin02'>Preço: </label>
          <input
            type="number"
            value={preco}
            onChange={(event) => {
              setPreco(event.target.value);
            }}
          />
          <br></br>
          <div>
            <button onClick={id ? () => updateProduto(id) : addProduto} className="btn-green">Cadastrar</button>
          </div>
        </div>

        <button onClick={getProdutos} className="btn-info">Mostrar Produtos Disponíveis</button>

        {produtoList.map((val, key) => { 
          return <div className='showList' key={val.id}>
                    <div>
                      <p>{val.nome}</p>
                    </div>
                    <div>
                      <p>{val.descricao}</p>
                    </div>
                    <div>
                      <p>{val.preco}</p>
                    </div>
                    <div style={{float:"right"}}>
                      <button className='btn-info-small' onClick={() => editar(val)}>Editar</button>
                      <button className='btn-red' onClick={() => deleteProduto(val.id)}>Deletar</button>
                    </div>
                  </div>;
        })}
      </div>
      
  </div>
  </>
}

export default App;
