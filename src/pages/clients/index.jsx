
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";
import Navbar from "../../components/navbar/navbar.jsx";
// import icon from "../../constants/icon.js";
import "./style.css";


function ClientComponent() {

  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [idClient, setIdClient] = useState("");
  const [termo, setTermo] = useState('');
  const [clientes, setClientes] = useState([]);

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
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
      // const res = await axios.post(`/client/buscar?termo=${termo}`);
      const res = await api.post('/client/buscar', { termo },{
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setClientes(res.data);
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
    <div className="container-fluid mt-page">

      <input className="form-control mr-sm-2" type="search"
        placeholder="Digite o nome do cliente..."
        value={termo}
        onChange={e => setTermo(e.target.value)}
        aria-label="Pesquisar" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={buscarClientes}>Pesquisar</button>

      <ul>
        {clientes?.map((s) =>{
          return<div className="col-12  col-lg-12 col-md-12 mt-2" key={s.id_client}>
              <div className="card shadow-lg border card-shadow">
                <div className="card-body">
                  <h1>Resultado:</h1>
                  <h5 className="card-title">{s.name}</h5>
                  <p className="card-text">Inep: {s.inep} </p>
                  <p className="card-text">Endereço rua:<br />{s.endereco_rua}, {s.endereco_bairro}, {s.endereco_cidade} </p>
                  {/* <div className="text-end justify-content-between">
                    <button onClick={() => props.clickEdit(props.id_appointment)}
                      className="btn btn-sm btn-primary my-2">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button onClick={() => props.clickDelete(props.id_appointment)}
                      className="btn btn-sm btn-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          })}
      </ul>

      <div className="row d-flex justify-content-center mb-5">
        <div className="container-fluid border">
          {clients?.map((c) => {
            return <div className="col-12  col-lg-12 col-md-12 mt-2" key={c.id_client}>
              <div className="card shadow-lg border card-shadow">
                <div className="card-body">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text">Inep: {c.inep} </p>
                  <p className="card-text">Endereço rua:<br />{c.endereco_rua}, {c.endereco_bairro}, {c.endereco_cidade} </p>
                  <div className="text-end justify-content-between">
                    <button onClick={() => props.clickEdit(props.id_appointment)}
                      className="btn btn-sm btn-primary my-2">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button onClick={() => props.clickDelete(props.id_appointment)}
                      className="btn btn-sm btn-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
      {/* {services?.map((s)=>{
                    return<>
                    <div key={s.id_barber_service} className="w-100">
                      {s.}
                    </div>
                    </>
                  })} */}
    </div >
  </>

}

export default ClientComponent;