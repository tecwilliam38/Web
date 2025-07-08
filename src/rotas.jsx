import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/login/login";
// import Register from "./pages/register/register"
import Appointments from "./pages/appointments/appointments";
import AppointmentAdd from "./pages/appointment-add/appointment-add";

// import ProfileScreen from "./pages/profile/profile";
import PublicRoute from "./constants/publicRoute";
import ProtectedRoute from "./constants/protectedRoute";
import ClientComponent from "./pages/clients";
import TecnicosComponent from "./pages/tecnicos";



function Rotas() {
    return <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
            <Route element={<PublicRoute/>}>
                <Route path="/" element={<LoginScreen />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/clients" element={<ClientComponent />} />
                <Route path="/appointments/:id_appointment" element={<AppointmentAdd />} />
                <Route path="/appointments/add" element={<AppointmentAdd />} />
                <Route path="/appointments/tecnicos" element={<TecnicosComponent />} />
            </Route>
        </Routes>
    </BrowserRouter>    
}

export default Rotas;



