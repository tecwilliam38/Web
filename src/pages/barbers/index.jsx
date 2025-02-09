
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";
import Navbar from "../../components/navbar/navbar.jsx";
import icon from "../../constants/icon.js";
import "./style.css";


function BarberComponent() {

  const navigate = useNavigate();
  const [barbers, setBarbers] = useState([]);
  const [idBarber, setIdBarber] = useState("");
  const [services, setServices] = useState([])


  async function LoadBarbers() {
    try {
      const response = await api.get("/barbers");

      if (response.data) {
        setBarbers(response.data)
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
    LoadBarbers();
    LoadServices();
  },)
  const m = "M";

  return <>
    <Navbar />
    <div className="container-fluid mt-page">
      <div className="row d-flex justify-content-center mb-5">
        {barbers?.map((b) => {
          return <>
            <div className="col-12  col-lg-3 col-md-12 mt-2" key={b.id_barber}>
              <div className="card shadow-lg border card-shadow">
                <img className="icon-barber" src={icon == m ? icon.female : icon.male} alt="Imagem de capa do card" />
                <div className="card-body">
                  <h5 className="card-title">{b.name}</h5>
                  <p className="card-text">{b.specialty} </p>
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

export default BarberComponent;