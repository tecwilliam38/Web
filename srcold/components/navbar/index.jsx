import React from 'react'
import logo from '../../assets/logo.png'
import { useAuth } from '../../constants/authContext'
import { Link, useNavigate } from 'react-router-dom';

export default function NavbarHome() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    function Logout() {
        logout();
        navigate("/");
    }
    return (<nav className="navbar navbar-expand-lg justify-content-around navbar-dark bg-dark">
        <Link className="navbar-brand" href="#">
            <img src={logo} alt="William" className='logo-style' />
        </Link>
        <div className="container-fluid bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
            <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse ms-auto" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/appointments">Agendamentos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/appointments/barbers">Técnicos</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle px-2" data-bs-toggle="dropdown" aria-expanded="false">
                                {localStorage.getItem("sessionName")}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="/appointments/profile">Meu Perfil</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={Logout}>Desconectar</button></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <button type='submit' onClick={Logout} className='btn btn-primary btn-lg'>Sair</button>
            </div>
        </div>
    </nav>
    )
}
