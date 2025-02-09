import React, { useEffect, useState } from 'react'
import api from '../../constants/api';
import Navbar from '../../components/navbar/navbar';

function ProfileScreen() {

    const [profileUser, setProfileUser] = useState({});


    async function UserProfile() {
        try {
            const response = await api.get("/admin/profile");
            setProfileUser(response.data);
            console.log(response.data);            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        UserProfile();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-page">
                <div className="row d-flex justify-content-center mb-5">

                    <div className="col-12  col-lg-3 col-md-12 mt-2">
                        <div className="card shadow-lg border card-shadow">
                            {/* <img className="icon-barber" src={icon == m ? icon.female : icon.male} alt="Imagem de capa do card" /> */}
                            <div className="card-body">
                                <h5 className="card-title">{profileUser.name}</h5>
                                <p className="card-text">{profileUser.email} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileScreen;
