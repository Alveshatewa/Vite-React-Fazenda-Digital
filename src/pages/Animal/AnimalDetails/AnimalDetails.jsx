import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaWeight,
  FaBirthdayCake,
  FaHandHoldingUsd,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaUserTie,
  FaPaw,
  FaRegShareSquare,
  FaRegHeart,
  FaHeart,
  FaInfoCircle
} from 'react-icons/fa';
import './AnimalDetails.css';
import animalImage from '../../../assets/images/IMG-20250328-WA0001.jpg'

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulação de requisição ao backend
  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        // Substitua por chamada API real
        await new Promise(resolve => setTimeout(resolve, 800)); // Simula delay
        
        const fakeAnimalData = {
          id,
          nome: "Boi Nelore",
          idade: "3 anos",
          peso: "450 kg",
          preco: "500.000 Kz",
          raca: "Nelore",
          tipo: "Bovino",
          vendedor: "Gabriel",
          imagem: animalImage,
          descricao: "Animal saudável, vacinado e com excelente pedigree. Criado em regime de pasto com suplementação mineral.",
          finalidade: "Abate",
          investidores: 2,
          valorPorInvestidor: "200.000 Kz",
          localizacao: "Huambo, Angola"
        };
        
        setAnimal(fakeAnimalData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copiado para a área de transferência!");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="animal-details-loading">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando detalhes do animal...</p>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="animal-details-error">
        <h4>Animal não encontrado</h4>
        <p>O animal solicitado não está disponível ou não existe.</p>
        <button 
          className="btn btn-outline-primary"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="animal-details-page">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Voltar para lista
          </button>
          
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-secondary"
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <FaHeart className="text-danger" />
              ) : (
                <FaRegHeart />
              )}
            </button>
            
            <button 
              className="btn btn-outline-secondary"
              onClick={handleShare}
            >
              <FaRegShareSquare />
            </button>
          </div>
        </div>

        <div className="card shadow-lg animal-details-card">
          <div className="row g-0">
           
            <div className="col-lg-6">
              <div className="animal-image-container">
                <img 
                  src={animal.imagem} 
                  alt={animal.nome} 
                  className="img-fluid animal-main-image"
                />
                {animal.finalidade === 'Abate' && (
                  <span className="animal-purpose-badge bg-success">
                    Para Abate
                  </span>
                )}
                {animal.finalidade === 'Criação' && (
                  <span className="animal-purpose-badge bg-primary">
                    Para Criação
                  </span>
                )}
              </div>
            </div>

            
            <div className="col-lg-6">
              <div className="card-body p-4">
                <h1 className="animal-title mb-3">
                  <FaPaw className="me-2" />
                  {animal.nome}
                </h1>
                
                <p className="animal-description">
                  <FaInfoCircle className="me-2" />
                  {animal.descricao}
                </p>
                
                <div className="animal-details-grid mb-4">
                  <div className="detail-item">
                    <FaPaw className="detail-icon" />
                    <div>
                      <span className="detail-label">Raça</span>
                      <span className="detail-value">{animal.raca}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <FaWeight className="detail-icon" />
                    <div>
                      <span className="detail-label">Peso</span>
                      <span className="detail-value">{animal.peso}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <FaBirthdayCake className="detail-icon" />
                    <div>
                      <span className="detail-label">Idade</span>
                      <span className="detail-value">{animal.idade}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <FaMoneyBillWave className="detail-icon" />
                    <div>
                      <span className="detail-label">Preço</span>
                      <span className="detail-value">{animal.preco}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <FaUserTie className="detail-icon" />
                    <div>
                      <span className="detail-label">Vendedor</span>
                      <span className="detail-value">{animal.vendedor}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <div>
                      <span className="detail-label">Localização</span>
                      <span className="detail-value">{animal.localizacao}</span>
                    </div>
                  </div>
                </div>

                {animal.finalidade === 'Abate' && (
                  <div className="investment-info mb-4 p-3 bg-light rounded">
                    <h5 className="d-flex align-items-center">
                      <FaHandHoldingUsd className="me-2 text-success" />
                      Oportunidade de Investimento
                    </h5>
                    <p>
                      Este animal está disponível para investimento compartilhado. 
                      Valor por sócio: <strong>{animal.valorPorInvestidor}</strong>
                    </p>
                    <p className="mb-0">
                      Investidores atuais: <strong>{animal.investidores}</strong>
                    </p>
                  </div>
                )}

                <div className="d-flex flex-wrap gap-3">
                  {animal.finalidade === 'Abate' && (
                    <Link 
                      to={`/confirm-investment/${id}`} 
                      className="btn btn-success btn-lg flex-grow-1"
                    >
                      <FaHandHoldingUsd className="me-2" />
                      Investir como Sócio
                    </Link>
                  )}
                  
                  <button className="btn btn-outline-primary btn-lg flex-grow-1">
                    <FaPhoneAlt className="me-2" />
                    Contatar Vendedor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;