import React, { useState, useEffect } from 'react';
import { 
  FaPiggyBank, 
  FaChartLine, 
  FaMoneyBillWave, 
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaPrint,
  FaFileExport,
  FaUserTie
} from 'react-icons/fa';
import './PartnerHome.css';

const PartnerHome = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados simulados - substituir por chamada à API
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        // Simulação de delay da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = [
          {
            id: 1,
            animal: 'Boi Nelore',
            animalId: 'ABC123',
            investmentDate: '15/03/2023',
            investmentAmount: 200000,
            currentValue: 250000,
            status: 'active',
            expectedProfit: 25,
            expectedSaleDate: '15/09/2023',
            seller: 'Fazenda Boa Vista',
            photo: 'https://source.unsplash.com/random/300x200/?cow'
          },
          {
            id: 2,
            animal: 'Boi Angus',
            animalId: 'DEF456',
            investmentDate: '10/02/2023',
            investmentAmount: 150000,
            currentValue: 180000,
            status: 'active',
            expectedProfit: 20,
            expectedSaleDate: '10/08/2023',
            seller: 'Fazenda Sol Nascente',
            photo: 'https://source.unsplash.com/random/300x200/?angus'
          },
          {
            id: 3,
            animal: 'Boi Hereford',
            animalId: 'GHI789',
            investmentDate: '05/01/2023',
            investmentAmount: 180000,
            currentValue: 225000,
            status: 'sold',
            profit: 45000,
            saleDate: '05/07/2023',
            seller: 'Fazenda Verde Vale',
            photo: 'https://source.unsplash.com/random/300x200/?hereford'
          }
        ];
        
        setInvestments(mockData);
      } catch (error) {
        console.error("Erro ao carregar investimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const filteredInvestments = investments.filter(investment => {
    // Aplicar filtro de status
    if (filter !== 'all' && investment.status !== filter) {
      return false;
    }
    
    // Aplicar busca
    if (searchTerm && !investment.animal.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const totalInvested = investments.reduce((sum, item) => sum + item.investmentAmount, 0);
  const totalCurrentValue = investments.reduce((sum, item) => sum + (item.currentValue || 0), 0);
  const totalProfit = investments.reduce((sum, item) => sum + (item.profit || 0), 0);

  return (
    <div className="partner-dashboard">
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="page-title">
            <FaPiggyBank className="me-3" />
            Painel do Sócio
          </h1>
          
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary">
              <FaPrint className="me-2" />
              Imprimir
            </button>
            <button className="btn btn-outline-secondary">
              <FaFileExport className="me-2" />
              Exportar
            </button>
          </div>
        </div>

        {/* Cartões de resumo */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card summary-card bg-primary text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title">Total Investido</h6>
                    <h2 className="mb-0">{totalInvested.toLocaleString('pt-AO')} Kz</h2>
                  </div>
                  <FaMoneyBillWave className="fs-1 opacity-50" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-3">
            <div className="card summary-card bg-success text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title">Valor Atual</h6>
                    <h2 className="mb-0">{totalCurrentValue.toLocaleString('pt-AO')} Kz</h2>
                  </div>
                  <FaChartLine className="fs-1 opacity-50" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-3">
            <div className="card summary-card bg-info text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title">Lucro Realizado</h6>
                    <h2 className="mb-0">{totalProfit.toLocaleString('pt-AO')} Kz</h2>
                  </div>
                  <FaMoneyBillWave className="fs-1 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e busca */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6 mb-2 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar animal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <span className="me-2">
                    <FaFilter />
                  </span>
                  <select 
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">Todos os investimentos</option>
                    <option value="active">Ativos</option>
                    <option value="sold">Vendidos</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de investimentos */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando seus investimentos...</p>
          </div>
        ) : filteredInvestments.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-5">
              <h4>Nenhum investimento encontrado</h4>
              <p className="text-muted">
                {searchTerm ? "Tente ajustar sua busca" : "Você ainda não possui investimentos"}
              </p>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Animal</th>
                      <th>Data do Investimento</th>
                      <th>Valor Investido</th>
                      <th>Valor Atual/Lucro</th>
                      <th>Status</th>
                      <th>Vendedor</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvestments.map((investment) => (
                      <tr key={investment.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={investment.photo} 
                              alt={investment.animal}
                              className="animal-thumbnail me-3"
                            />
                            <div>
                              <strong>{investment.animal}</strong>
                              <div className="small text-muted">ID: {investment.animalId}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaCalendarAlt className="me-2 text-muted" />
                            {investment.investmentDate}
                          </div>
                        </td>
                        <td>
                          {investment.investmentAmount.toLocaleString('pt-AO')} Kz
                        </td>
                        <td>
                          {investment.status === 'sold' ? (
                            <span className="text-success">
                              +{investment.profit.toLocaleString('pt-AO')} Kz<br />
                              <small>({(investment.profit / investment.investmentAmount * 100).toFixed(0)}% de lucro)</small>
                            </span>
                          ) : (
                            <span className="text-primary">
                              {investment.currentValue.toLocaleString('pt-AO')} Kz<br />
                              <small>(+{investment.expectedProfit}% esperado)</small>
                            </span>
                          )}
                        </td>
                        <td>
                          {investment.status === 'active' ? (
                            <span className="badge bg-warning text-dark">
                              Em andamento
                            </span>
                          ) : (
                            <span className="badge bg-success">
                              Vendido em {investment.saleDate}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaUserTie className="me-2 text-muted" />
                            {investment.seller}
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerHome;