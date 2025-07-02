import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../constants/authContext";

function Navbar() {

    const navigate = useNavigate();
    const { logout, user } = useAuth();

    function Logout() {
        logout();
        navigate("/");
    }

    return <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-navbar bg-primary" data-bs-theme="dark">
        <Link className="navbar-brand" to="/appointments">
            <img className="navbar-logo px-4" src={logo} />
        </Link>
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                            <button type="button" className="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.name}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="/appointments/profile">Meu Perfil</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={Logout}>Desconectar</button></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </nav>
}

export default Navbar;

{/* <nav className="navbar  navbar-expand-lg bg-primary">



      

        </ul>
    </div>

</div>

</nav> */}