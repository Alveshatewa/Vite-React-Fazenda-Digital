import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaWeight, 
  FaBirthdayCake, 
  FaMoneyBillWave, 
  FaInfoCircle, 
  FaPaw,
  FaRegHeart,
  FaHeart,
  FaShareAlt
} from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import './AnimalListed.css';

const AnimalListed = ({ animals = [] }) => {
  const navigate = useNavigate();

  const handleSocioClick = (animalId) => {

    navigate(`/confirm-investment/${animalId}`);

  };

  const handleAnimalClick = (animalId) => {

    navigate(`/animal-details/${animalId}`);

  };

  const handlePurposeClick = (e, purpose) => {

    e.stopPropagation();

    console.log(`Finalidade selecionada: ${purpose}`);

    // Lógica para atualizar a finalidade do animal
    

  };

  return (

    <div className="animal-listing-page">

      <Header />
      
      <div className="container py-4">

        <h2 className="text-center mb-4 animal-listing-title">

          <FaPaw className="me-2" />

          Animais Disponíveis para Venda

        </h2>

        {animals.length === 0 ? (

          <div className="text-center py-5">

            <FaRegHeart className="empty-icon mb-3" />

            <h4>Nenhum animal disponível no momento</h4>

            <p className="text-muted">Volte mais tarde para conferir novas ofertas</p>

          </div>

        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

            {animals.map((animal) => (

              <div className="col" key={animal.id}>

                <div 
                  className="card h-100 animal-card shadow-sm card-listed-animal"
                  onClick={() => handleAnimalClick(animal.id)}
                >
                  <div className="position-relative">
                    <img 
                      src={animal.photo} 
                      className="card-img-top animal-image" 
                      alt={animal.species} 
                    />

                    <button 
                      className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Lógica para favoritar
                     
                      }}
                    >
                      <FaHeart className="text-danger" />

                    </button>

                  </div>
                  
                  <div className="card-body">

                    <h5 className="card-title d-flex justify-content-between align-items-center">

                      <span>

                        {animal.species} - {animal.breed}

                      </span>
                      
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Lógica para compartilhar
                        }}
                      >
                        <FaShareAlt />
                      </button>
                    </h5>
                    
                    <p className="card-text text-muted mb-3">
                      <FaInfoCircle className="me-2" />
                      {animal.description}
                    </p>
                    
                    <div className="animal-details mb-3">

                      <div className="detail-item">
                        <FaBirthdayCake className="me-2" />
                        <span>Idade: {animal.age}</span>
                      </div>

                      <div className="detail-item">
                        <FaWeight className="me-2" />
                        <span>Peso: {animal.weight} kg</span>
                      </div>

                      <div className="detail-item">
                        <FaMoneyBillWave className="me-2" />
                        <span>Preço: {animal.price} Kz</span>
                      </div>

                    </div>

                    <div className="btn-group w-100 mb-2">
                      <button 
                        type="button" 
                        className={`btn ${animal.purpose === 'Abate' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={(e) => handlePurposeClick(e, 'Abate')}
                      >
                        Abate

                      </button>

                      <button 
                        type="button" 
                        className={`btn ${animal.purpose === 'Criação' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        onClick={(e) => handlePurposeClick(e, 'Criação')}
                      >
                        Criação

                      </button>

                    </div>

                    {animal.forAbate && (
                      <button 
                        type="button" 
                        className="btn btn-success w-100 btn-socio"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSocioClick(animal.id);
                        }}
                      >
                        <FaMoneyBillWave className="me-2" />

                        Tornar-se Sócio

                      </button>

                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AnimalListed;