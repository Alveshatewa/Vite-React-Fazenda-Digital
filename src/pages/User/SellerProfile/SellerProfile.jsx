import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../../../Contexts/Hooks/UserAuth";
import { 
  FaUserTie, FaEnvelope, FaPhone, FaChartLine, 
  FaMoneyBillWave, FaClipboardCheck, FaBullhorn,
  FaPlusCircle, FaChartPie, FaRegChartBar
} from "react-icons/fa";
import { Bar, Pie } from 'react-chartjs-2';
import './SellerProfile.css';

const SellerProfile = () => {
    const user = useAuth();
    const [stats, setStats] = useState({ vendidos: 0, ativos: 0, lucro: 0 });
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(true);
            
            // Buscar estatísticas básicas
            axios.get(`http://localhost:5000/api/vendas/vendedor/${user.id}`)
                .then(response => {
                    setStats(response.data);
                    
                    // Buscar dados detalhados para gráficos
                    return axios.get(`http://localhost:5000/api/vendas/detalhes/${user.id}`);
                })
                .then(response => {
                    setSalesData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Erro ao buscar dados:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    if (!user) return (
        <div className="seller-loading">
            <div className="spinner"></div>
            <p>Carregando perfil...</p>
        </div>
    );

    // Dados para o gráfico de barras (vendas por mês)
    const salesChartData = {
        labels: salesData.map(item => item.mes),
        datasets: [
            {
                label: 'Vendas Mensais',
                data: salesData.map(item => item.total),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Dados para o gráfico de pizza (tipos de animais vendidos)
    const animalTypesData = {
        labels: ['Bovinos', 'Suínos', 'Aves', 'Caprinos', 'Outros'],
        datasets: [
            {
                data: [35, 25, 20, 15, 5], // Valores fictícios - substitua por dados reais
                backgroundColor: [
                    '#4BC0C0',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384',
                    '#9966FF'
                ]
            }
        ]
    };

    return (
        <div className="seller-profile-container">
            <div className="seller-profile-card">
                {/* Cabeçalho com informações do vendedor */}
                <div className="seller-header">
                    <div className="seller-avatar">
                        {user.fotoPerfil ? (
                            <img src={user.fotoPerfil} alt={`${user.nome}`} />
                        ) : (
                            <FaUserTie className="default-avatar" />
                        )}
                    </div>
                    <div className="seller-info">
                        <h2>{user.nome}</h2>
                        <p className="seller-email"><FaEnvelope /> {user.email}</p>
                        <p className="seller-phone"><FaPhone /> {user.telefone || 'Não informado'}</p>
                    </div>
                </div>

                {/* Métricas principais */}
                <div className="metrics-grid">
                    <div className="metric-card">
                        <div className="metric-icon total-sales">
                            <FaChartLine />
                        </div>
                        <div className="metric-content">
                            <h3>{stats.vendidos}</h3>
                            <p>Animais Vendidos</p>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon available">
                            <FaBullhorn />
                        </div>
                        <div className="metric-content">
                            <h3>{stats.ativos}</h3>
                            <p>Disponíveis</p>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon profit">
                            <FaMoneyBillWave />
                        </div>
                        <div className="metric-content">
                            <h3>{stats.lucro.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</h3>
                            <p>Lucro Total</p>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon rating">
                            <FaClipboardCheck />
                        </div>
                        <div className="metric-content">
                            <h3>4.8/5</h3>
                            <p>Avaliação</p>
                        </div>
                    </div>
                </div>

                {/* Gráficos e dados */}
                <div className="charts-section">
                    <div className="chart-container">
                        <h3><FaRegChartBar /> Vendas Mensais</h3>
                        <div className="chart-wrapper">
                            {loading ? (
                                <div className="chart-loading">Carregando dados...</div>
                            ) : (
                                <Bar 
                                    data={salesChartData} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }} 
                                />
                            )}
                        </div>
                    </div>

                    <div className="chart-container">
                        <h3><FaChartPie /> Tipos de Animais</h3>
                        <div className="chart-wrapper">
                            <Pie 
                                data={animalTypesData} 
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false
                                }} 
                            />
                        </div>
                    </div>
                </div>

                {/* Ações rápidas */}
                <div className="quick-actions">
                    <Link to="/vender" className="action-button sell-button">
                        <FaPlusCircle /> Vender Animal
                    </Link>
                    <Link to="/meus-animais" className="action-button manage-button">
                        <FaClipboardCheck /> Gerenciar Anúncios
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SellerProfile;