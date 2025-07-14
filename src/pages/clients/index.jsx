
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";
import Navbar from "../../components/navbar/navbar.jsx";
// import icon from "../../constants/icon.js";
import "./style.css";
import { useAuth } from "../../constants/authContext.jsx";


function ClientComponent() {

  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [idClient, setIdClient] = useState("");
  const [termo, setTermo] = useState('');
  const [clientes, setClientes] = useState([]);

  const { user } = useAuth();

  async function LoadClients() {
    try {
      const response = await api.get("client/listar", {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (response.data) {
        setClients(response.data)
        console.log(response.data.rows.inep);

      }
    } catch (error) {
      if (error.response?.data.error)
        console.log(error.response.data.error);
    }
  }

  async function buscarClientes() {
    try {
      const res = await api.post('/client/buscar', { termo }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setClientes(res.data);
      setTermo('');
      console.log(res.data);
    } catch (err) {
      console.error('Erro ao buscar clientes', err);
      console.log(err.response.data.error);
    }
  };

  useEffect(() => {
    LoadClients();
  }, [])

  return <>
    <Navbar />
    <div className="container-fluid justify-content-center align-items-center mt-page">
      <input className="form-control mr-sm-2" type="search"
        placeholder="Digite o nome do cliente..."
        value={termo}
        onChange={e => setTermo(e.target.value)}
        aria-label="Pesquisar" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={buscarClientes}>Pesquisar</button>
      {clientes.map ? <div></div> : <><h2>Resultados da Pesquisa:</h2></>}

      {clientes.map((c) => {
        return <div className="container mt-5 border p-3 rounded shadow" key={c.id_client}>
          <h3>📄 Ficha de Cadastro de Clientes</h3>
          <form className="mt-4">
            <div className="mb-3">
              <label className="form-label">Nome da Escola</label>
              <input
                type="text"
                name="escola"
                className="form-control"
                value={c.name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Código INEP</label>
              <input
                type="text"
                name="inep"
                className="form-control"
                value={c.inep}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Endereço</label>
              <textarea
                name="endereco"
                className="form-control"
                value={'Rua ' + c.endereco_rua + ',\nBairro ' + c.endereco_bairro + ', Cidade ' + c.endereco_cidade}
                rows="3"                                
              />
            </div>

            <button type="submit" className="btn btn-primary">Salvar</button>
            <button type="submit" className="btn btn-danger mx-2">Editar</button>
          </form>
        </div>
      })}

      {clients.map((c) => {
        return <div className="container mt-5 border p-3 rounded shadow" key={c.id_client}>
          <h3>📄 Ficha de Cadastro de Clientes</h3>
          <form className="mt-4">
            <div className="mb-3">
              <label className="form-label">Nome da Escola</label>
              <input
                type="text"
                name="escola"
                className="form-control"
                value={c.name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Código INEP</label>
              <input
                type="text"
                name="inep"
                className="form-control"
                value={c.inep}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Endereço</label>
              <textarea
                name="endereco"
                className="form-control"
                value={'Rua ' + c.endereco_rua + ',\nBairro ' + c.endereco_bairro + ', Cidade ' + c.endereco_cidade}
                rows="3"
              />
            </div>

            <button className="btn btn-primary">Salvar</button>
            <button onClick={() => props.clickEdit(props.id_appointment)} className="btn btn-danger mx-2">Editar</button>
          </form>
        </div>
      })}
    </div>
  </>

}

export default ClientComponent;