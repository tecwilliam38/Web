
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";
import Navbar from "../../components/navbar/navbar.jsx";
import icon from "../../constants/icon.js";
import "./style.css";


function ClientComponent() {

  const navigate = useNavigate();  
  const [clients, setClients] = useState([]);
  const [idClient, setIdClient] = useState("");  
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  console.log(user.token);
  

  async function LoadClients() {
    try {
      const response = await api.get("client/listar",  {
         headers: { Authorization: `Bearer ${user.token}` }         
        });

      if (response.data) {
        setClients(response.data)
      }
    } catch (error) {
      if (error.response?.data.error)
        console.log(error.response.data.error);
    }
  }
  // async function LoadServices(id) {

  //   if (!id)
  //     return;

  //   try {
  //     const response = await api.get("/barbers/" + id + "/services");

  //     if (response.data) {
  //       setServices(response.data);
  //     }

  //   } catch (error) {
  //     if (error.response?.data.error) {
  //       if (error.response.status == 401)
  //         return navigate("/");

  //       alert(error.response?.data.error);
  //     }
  //     else
  //       alert("Erro ao listar serviços");
  //   }
  // }


  useEffect(() => {
    LoadClients();
    // LoadServices();
  }, [])
  // const m = "M";

  return <>
    <Navbar />
    <div className="container-fluid mt-page">
      <div className="row d-flex justify-content-center mb-5">
        {clients?.map((c) => {
          return <>
            <div className="col-12  col-lg-3 col-md-12 mt-2" key={c.id_client}>
              <div className="card shadow-lg border card-shadow">
                {/* <img className="icon-barber" src={icon == m ? icon.female : icon.male} alt="Imagem de capa do card" /> */}
                <div className="card-body">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text">{c.doc_id} </p>
                  <p className="card-text">{c.endereco_rua} </p>
                  <p className="card-text">{c.endereco_bairro} </p>
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
  </>

}

export default ClientComponent;