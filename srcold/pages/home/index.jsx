import React from 'react'
import { useAuth } from '../../constants/authContext'
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
import "./style.css"
import NavbarHome from '../../components/navbar';


export default function HomeScreen() {
  const navigate = useNavigate();


  const { logout, user } = useAuth();

  function Logout() {
    logout();
    navigate("/");
  }

  return (<div className='container-fluid align-items-center'>
      <NavbarHome />
    </div>
  )
}
