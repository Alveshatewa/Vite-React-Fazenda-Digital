import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaIdCard, FaEdit, FaCheckCircle, FaTimesCircle,
  FaUserShield, FaUserTie, FaHome
} from "react-icons/fa";
import "./UserProfile.css";

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/usuarios/${userId}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar usuário:", error);
                setError("Erro ao carregar perfil");
                setLoading(false);
            });
    }, [userId]);

    if (loading) return (
        <div className="profile-loading">
            <div className="spinner"></div>
            <p>Carregando perfil...</p>
        </div>
    );

    if (error) return (
        <div className="profile-error">
            <FaTimesCircle className="error-icon" />
            <p>{error}</p>
            <Link to="/" className="btn btn-primary">Voltar à página inicial</Link>
        </div>
    );

    if (!user) return null;

    const getAccountTypeIcon = () => {
        switch(user.tipo.toLowerCase()) {
            case 'administrador':
                return <FaUserShield className="account-icon admin" />;
            case 'vendedor':
                return <FaUserTie className="account-icon seller" />;
            default:
                return <FaUser className="account-icon" />;
        }
    };

    return (

        <div className="profile-container">

            <div className="profile-card">

               
                <div className="profile-header">

                    <div className="profile-avatar">

                        {user.fotoPerfil ? (
                            <img src={user.fotoPerfil} alt={`${user.nome}`} />
                        ) : (
                            <FaUser className="default-avatar" />
                        )}
                    </div>

                    <div className="profile-title">

                        <h2>{user.nome}</h2>

                        <div className="profile-verification">

                            {user.verificado ? (
                                <span className="verified">
                                    <FaCheckCircle /> Conta verificada
                                </span>
                            ) : (
                                <span className="not-verified">

                                    <FaTimesCircle /> Conta não verificada

                                </span>
                            )}
                        </div>
                    </div>
                    {getAccountTypeIcon()}
                </div>

                <div className="profile-sections">

                    <div className="profile-section">

                        <h3><FaUser /> Informações Pessoais</h3>

                        <div className="info-item">
                            <FaEnvelope className="info-icon" />
                            <span>{user.email}</span>
                        </div>

                        <div className="info-item">
                            <FaPhone className="info-icon" />
                            <span>{user.telefone || 'Não informado'}</span>
                        </div>

                    </div>

                    <div className="profile-section">

                        <h3><FaMapMarkerAlt /> Localização</h3>

                        <div className="info-item">
                            <FaHome className="info-icon" />
                            <span>
                                {user.bairro}, {user.municipio}, {user.provincia}
                            </span>

                        </div>

                    </div>

                    <div className="profile-section">

                        <h3><FaIdCard /> Sobre a Conta</h3>

                        <div className="info-item">
                            <span className="info-label">Tipo de conta:</span>
                            <span className="info-value">{user.tipo}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Membro desde:</span>
                            <span className="info-value">
                                {new Date(user.dataCriacao).toLocaleDateString()}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="profile-actions">
                    <Link to={`/editar-perfil/${userId}`} className="btn-edit">
                        <FaEdit /> Editar Perfil
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;