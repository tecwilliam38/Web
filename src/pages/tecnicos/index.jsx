
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";
import Navbar from "../../components/navbar/navbar.jsx";
import icon from "../../constants/icon.js";
import "./style.css";


function TecnicosComponent() {

  const navigate = useNavigate();
  const [tecnicos, setTecnicos] = useState([]);
  const [idTecnico, setIdTecnico] = useState("");
  const [services, setServices] = useState([])
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  async function LoadTecnicos() {
    try {
      const response = await api.get("tecnicos/listar", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.data) {
        setTecnicos(response.data)
      }
    } catch (error) {
      if (error.response?.data.error)
        console.log(error.response.data.error);
    }
  }

  async function LoadServices(id) {

    if (!id)
      return;

    try {
      const response = await api.get("/barbers/" + id + "/services");

      if (response.data) {
        setServices(response.data);
      }

    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status == 401)
          return navigate("/");

        alert(error.response?.data.error);
      }
      else
        alert("Erro ao listar serviços");
    }
  }


  useEffect(() => {
    LoadTecnicos();
    LoadServices();
  },)
  // const m = "M";

  return <>
    <Navbar />
    <div className="container-fluid mt-page">
      <div className="row d-flex justify-content-center mb-5">
        <div className="container-fluid border">
          {tecnicos?.map((t) => {
            return <>
              <div className="col-12  col-lg-12 col-md-12 mt-2" key={t.id_tecnico}>
                <div className="card shadow-lg border card-shadow">
                  {/* <img className="icon-barber" src={icon == m ? icon.female : icon.male} alt="Imagem de capa do card" /> */}
                  <div className="card-body p-4">
                    <h5 className="card-title h2">{t.name}</h5>
                    <div className="row justify-content-between px-4">
                          Telefone:<p className="card-text">{t.cel_phone}</p>
                          Endereço:<p className="card-text">{t.endereco}</p>
                      Competências:<p className="card-text">{t.skill} </p>                      
                    </div>
                    {/* {services?.map((s)=>{
                    return<>
                    <div key={s.id_barber_service} className="w-100">
                      {s.}
                    </div>
                    </>
                  })} */}
                  </div>
                </div>
              </div>
            </>
          })}
        </div>
      </div>
    </div>
  </>

}

export default TecnicosComponent;