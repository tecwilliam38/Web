import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/login/login";
import Register from "./pages/register/register"
import Appointments from "./pages/appointments/appointments";
import AppointmentAdd from "./pages/appointment-add/appointment-add";
import BarbersComponent from "./pages/barbers";
import ProfileScreen from "./pages/profile/profile";
import PublicRoute from "./constants/publicRoute";
import ProtectedRoute from "./constants/protectedRoute";
import ClientComponent from "./pages/clients";



function Rotas() {    
    return <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                }
            />
               <Route
                path="/appointments"
                element={
                    <ProtectedRoute>
                        <Appointments />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/appointments/clients"
                element={
                    <ProtectedRoute>
                        <ClientComponent />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/appointments/:id_appointment"
                element={
                    <ProtectedRoute>
                        <AppointmentAdd />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/appointments/add"
                element={
                    <ProtectedRoute>
                        <AppointmentAdd />
                    </ProtectedRoute>
                }
            />
                {/* <Route path="/appointments" element={<Appointments />} /> */}
            {/* <Route path="/" element={<LoginScreen />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/appointments/profile" element={<ProfileScreen />} /> */}
            {/* <Route path="/appointments/barbers" element={<BarbersComponent />} /> */}            
            {/* <Route path="/appointments/add" element={<AppointmentAdd />} /> */}
            {/* <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} /> */}
        </Routes>
    </BrowserRouter>
    // path="/home"
    // element={
    //     <ProtectedRoute>
    //         <Appointments />
    //     </ProtectedRoute>
    // }
}

export default Rotas;



