import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaArrowLeft, 
  FaMoneyBillWave,
  FaUserTie,
  FaPiggyBank,
  FaCalculator,
  FaHandshake,
  FaSpinner
} from 'react-icons/fa';
import './PartnerInvestConfirmation.css';
import animalImage from '../../../assets/images/IMG-20250328-WA0001.jpg'

const PartnerInvestConfirmation = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulação de busca dos dados do animal (substituir por chamada real à API)
    const fetchAnimalDetails = async () => {
      try {
        setLoading(true);
        // Simula delay da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const fakeAnimalData = {
          id: animalId,
          nome: "Boi Nelore",
          preco: "500.000 Kz",
          valorInvestimento: "200.000 Kz",
          vendedor: "Gabriel",
          imagem: animalImage,
          descricao: "Animal saudável, vacinado e com excelente pedigree. Criado em regime de pasto com suplementação mineral.",
          investidoresAtuais: 2,
          retornoEsperado: "25% em 3 meses"
        };
        
        setAnimal(fakeAnimalData);
      } catch (err) {
        setError("Erro ao carregar dados do animal. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [animalId]);

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!amount || amount < 200000) {
      setError("O valor mínimo de investimento é 200.000 Kz");
      return;
    }

    setLoading(true);

    try {
      // Simula chamada à API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você faria a chamada real para confirmar o investimento
      // await api.confirmInvestment({ animalId, amount });
      
      setConfirmed(true);
    } catch (err) {
      setError("Erro ao confirmar investimento. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !animal) {
    return (
      <div className="investment-loading">
        <FaSpinner className="spinner" />
        <p>Carregando detalhes do investimento...</p>
      </div>
    );
  }

  if (error && !animal) {
    return (
      <div className="investment-error">
        <h4>{error}</h4>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="investment-confirmation-page">
      <div className="container py-4">
        <button 
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>

        <div className="card shadow-lg investment-card">
          <div className="card-header bg-success text-white">
            <h2 className="mb-0">
              <FaHandshake className="me-2" />
              Confirmação de Investimento
            </h2>
          </div>

          <div className="card-body">
            <div className="row">
             
              <div className="col-lg-5 mb-4 mb-lg-0">
                <div className="investment-animal-image-container">
                  <img 
                    src={animal?.imagem} 
                    alt={animal?.nome} 
                    className="img-fluid rounded"
                  />
                  <div className="investment-badge">
                    <FaPiggyBank className="me-2" />
                    Investimento
                  </div>
                </div>
              </div>

           
              <div className="col-lg-7">
                {confirmed ? (
                  <div className="investment-success text-center py-4">
                    <FaCheckCircle className="success-icon" />
                    <h3 className="mt-3">Investimento Confirmado!</h3>
                    <p className="lead">
                      Obrigado por investir no animal <strong>{animal?.nome}</strong>
                    </p>
                    
                    <div className="investment-details mt-4 p-3 bg-light rounded">
                      <h5>Detalhes do Investimento</h5>
                      <ul className="text-start">
                        <li>
                          <strong>Valor investido:</strong> {amount} Kz
                        </li>
                        <li>
                          <strong>Retorno esperado:</strong> {animal?.retornoEsperado}
                        </li>
                        <li>
                          <strong>Total de investidores:</strong> {animal?.investidoresAtuais + 1}
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4">
                      <Link to="/partner" className="btn btn-primary me-2">
                        Meus Investimentos
                      </Link>
                      <Link to="/animal-listed" className="btn btn-outline-secondary">
                        Ver mais animais
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="investment-animal-name">
                      <FaPiggyBank className="me-2" />
                      {animal?.nome}
                    </h3>
                    
                    <div className="investment-info mb-4">
                      <div className="info-item">
                        <FaMoneyBillWave />
                        <span>Preço: <strong>{animal?.preco}</strong></span>
                      </div>
                      <div className="info-item">
                        <FaUserTie />
                        <span>Vendedor: <strong>{animal?.vendedor}</strong></span>
                      </div>
                      <div className="info-item">
                        <FaCalculator />
                        <span>Valor sugerido por sócio: <strong>{animal?.valorInvestimento}</strong></span>
                      </div>
                    </div>

                    <form onSubmit={handleConfirmation}>
                      <div className="mb-4">
                        <label htmlFor="amount" className="form-label">
                          <FaMoneyBillWave className="me-2" />
                          Valor do Investimento (Kz)
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">Kz</span>
                          <input
                            type="number"
                            className="form-control"
                            id="amount"
                            value={amount}
                            min="20000"
                            step="1000"
                            placeholder="Digite o valor"
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                        <small className="text-muted">Valor mínimo: 200.000 Kz</small>
                      </div>

                      {error && (
                        <div className="alert alert-danger">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-success w-100 py-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="spinner me-2" />
                            Processando...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle className="me-2" />
                            Confirmar Investimento
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerInvestConfirmation;