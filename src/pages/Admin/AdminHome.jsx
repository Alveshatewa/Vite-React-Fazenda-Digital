import React, { useState } from 'react';
import { 
  FaUsers, 
  FaUserTie, 
  FaUserCheck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaMoneyBillWave,
  FaTruck,
  FaChartLine,
  FaCog,
  FaBell,
  FaSearch,
  FaHome
} from 'react-icons/fa';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3); // 

  
  const [stats, setStats] = useState({
    sellers: 0,
    buyers: 0,
    pendingApprovals: 0,
    pendingPayments: 0,
    deliveries: 0
  });

  return (
    <div className="admin-dashboard">
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <span className="navbar-brand d-flex align-items-center">
            <FaHome className="me-2" />
            Painel Administrativo
          </span>
          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <FaBell className="text-white fs-5" />
              {notifications > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications}
                </span>
              )}
            </div>
            <div className="input-group admin-search">
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Pesquisar..." 
              />
              <button className="btn btn-light btn-sm" type="button">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
        
          <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <FaChartLine className="me-2" />
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                  >
                    <FaUsers className="me-2" />
                    Usuários
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'sales' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sales')}
                  >
                    <FaMoneyBillWave className="me-2" />
                    Vendas
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'deliveries' ? 'active' : ''}`}
                    onClick={() => setActiveTab('deliveries')}
                  >
                    <FaTruck className="me-2" />
                    Entregas
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <FaCog className="me-2" />
                    Configurações
                  </button>
                </li>
              </ul>
            </div>
          </div>

         
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">
                {activeTab === 'dashboard' && 'Visão Geral'}
                {activeTab === 'users' && 'Gerenciamento de Usuários'}
                {activeTab === 'sales' && 'Controle de Vendas'}
                {activeTab === 'deliveries' && 'Gerenciamento de Entregas'}
                {activeTab === 'settings' && 'Configurações do Sistema'}
              </h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    Exportar
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    Imprimir
                  </button>
                </div>
              </div>
            </div>

            {activeTab === 'dashboard' && (
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card stat-card bg-primary text-white">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title">Vendedores</h6>
                          <h2 className="mb-0">{stats.sellers}</h2>
                        </div>
                        <FaUserTie className="fs-1 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card stat-card bg-success text-white">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title">Compradores</h6>
                          <h2 className="mb-0">{stats.buyers}</h2>
                        </div>
                        <FaUserCheck className="fs-1 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card stat-card bg-warning text-dark">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title">Aprovações Pendentes</h6>
                          <h2 className="mb-0">{stats.pendingApprovals}</h2>
                        </div>
                        <FaCheckCircle className="fs-1 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-primary text-white d-flex align-items-center">
                    <FaUsers className="me-2" />
                    <h5 className="mb-0">Gerenciar Cadastros</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-3">
                      <button className="btn btn-outline-primary btn-lg d-flex justify-content-between align-items-center">
                        <span>Vendedores</span>
                        <span className="badge bg-primary rounded-pill">{stats.sellers}</span>
                      </button>
                      <button className="btn btn-outline-primary btn-lg d-flex justify-content-between align-items-center">
                        <span>Compradores</span>
                        <span className="badge bg-primary rounded-pill">{stats.buyers}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-success text-white d-flex align-items-center">
                    <FaMoneyBillWave className="me-2" />
                    <h5 className="mb-0">Aprovar/Reprovar Vendas</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-3">
                      <button className="btn btn-outline-success btn-lg d-flex justify-content-between align-items-center">
                        <span>Aprovar Vendas</span>
                        <span className="badge bg-success rounded-pill">{stats.pendingApprovals}</span>
                      </button>
                      <button className="btn btn-outline-danger btn-lg">
                        Reprovar Vendas
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-info text-white d-flex align-items-center">
                    <FaCheckCircle className="me-2" />
                    <h5 className="mb-0">Confirmar Recebimentos</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-3">
                      <button className="btn btn-outline-info btn-lg d-flex justify-content-between align-items-center">
                        <span>Pagamentos</span>
                        <span className="badge bg-info rounded-pill">{stats.pendingPayments}</span>
                      </button>
                      <button className="btn btn-outline-info btn-lg">
                        Investimentos
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-warning text-dark d-flex align-items-center">
                    <FaTruck className="me-2" />
                    <h5 className="mb-0">Gerenciar Entrega dos Animais</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid">
                      <button className="btn btn-outline-warning btn-lg d-flex justify-content-between align-items-center">
                        <span>Entregas Pendentes</span>
                        <span className="badge bg-warning rounded-pill text-dark">{stats.deliveries}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-secondary text-white d-flex align-items-center">
                    <FaChartLine className="me-2" />
                    <h5 className="mb-0">Distribuir Valores</h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <button className="btn btn-secondary btn-lg w-100 d-flex justify-content-between align-items-center">
                          <span>Distribuir aos Vendedores</span>
                          <span className="badge bg-light text-dark rounded-pill">R$ 25.430,00</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button className="btn btn-secondary btn-lg w-100 d-flex justify-content-between align-items-center">
                          <span>Distribuir aos Sócios</span>
                          <span className="badge bg-light text-dark rounded-pill">R$ 18.750,00</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;