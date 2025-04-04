import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Contexts/Hooks/UserAuth";
import { 
  FaUser, FaEnvelope, FaPhone, FaShoppingCart, 
  FaCheckCircle, FaTimesCircle, FaClock, FaTruck,
  FaMoneyBillWave, FaCalendarAlt, FaSearchDollar
} from "react-icons/fa";
import "./BuyerProfile.css";

const BuyerProfile = () => {
    const user = useAuth();
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setLoading(true);
            axios.get(`http://localhost:5000/api/compras/${user.id}`)
                .then(response => {
                    setCompras(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Erro ao buscar compras:", error);
                    setError("Erro ao carregar histórico de compras");
                    setLoading(false);
                });
        }
    }, [user]);

    if (!user) return (
        <div className="buyer-loading">
            <div className="spinner"></div>
            <p>Carregando perfil...</p>
        </div>
    );

    const getStatusIcon = (status) => {
        switch(status.toLowerCase()) {
            case 'concluída':
                return <FaCheckCircle className="status-icon completed" />;
            case 'cancelada':
                return <FaTimesCircle className="status-icon cancelled" />;
            case 'pendente':
                return <FaClock className="status-icon pending" />;
            case 'em transporte':
                return <FaTruck className="status-icon shipping" />;
            default:
                return <FaShoppingCart className="status-icon" />;
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-AO', { 
            style: 'currency', 
            currency: 'AOA' 
        }).format(value);
    };

    return (
        <div className="buyer-profile-container">
            <div className="buyer-profile-card">
                {/* Cabeçalho */}
                <div className="buyer-profile-header">
                    <div className="buyer-avatar">
                        {user.fotoPerfil ? (
                            <img src={user.fotoPerfil} alt={`${user.nome}`} />
                        ) : (
                            <FaUser className="default-avatar" />
                        )}
                    </div>
                    <div className="buyer-info">
                        <h2>{user.nome}</h2>
                        <p className="buyer-email">
                            <FaEnvelope /> {user.email}
                        </p>
                        <p className="buyer-phone">
                            <FaPhone /> {user.telefone || 'Não informado'}
                        </p>
                    </div>
                </div>

                <div className="purchase-history">
                    <h3 className="section-title">
                        <FaShoppingCart /> Histórico de Compras
                    </h3>

                    {error && (
                        <div className="error-message">
                            <FaTimesCircle /> {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="loading-purchases">
                            <div className="small-spinner"></div>
                            <p>Carregando compras...</p>
                        </div>
                    ) : compras.length === 0 ? (
                        <div className="no-purchases">
                            <FaSearchDollar className="no-purchases-icon" />
                            <p>Nenhuma compra realizada ainda</p>
                            <a href="/animais" className="btn-browse">Explorar Animais</a>
                        </div>
                    ) : (
                        <div className="purchase-list">
                            {compras.map(compra => (
                                <div key={compra.id} className="purchase-item">
                                    <div className="purchase-header">
                                        <h4>{compra.animal}</h4>
                                        <span className={`status-badge ${compra.status.toLowerCase()}`}>
                                            {getStatusIcon(compra.status)}
                                            {compra.status}
                                        </span>
                                    </div>
                                    
                                    <div className="purchase-details">
                                        <div className="detail">
                                            <FaMoneyBillWave />
                                            <span>Valor: {formatCurrency(compra.valor)}</span>
                                        </div>
                                        <div className="detail">
                                            <FaCalendarAlt />
                                            <span>Data: {new Date(compra.data).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    
                                    {compra.detalhes && (
                                        <div className="purchase-notes">
                                            <p>{compra.detalhes}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuyerProfile;