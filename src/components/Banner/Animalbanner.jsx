import React, { useEffect } from 'react';
import { FaPaw, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './AnimalBanner.css';

// Importando imagens (substitua pelos caminhos corretos)
import banner1 from '../../assets/images/IMG-20250328-WA0001.jpg';
import banner2 from '../../assets/images/IMG-20250328-WA0002.jpg';
import banner3 from '../../assets/images/IMG-20250328-WA0003.jpg';
import banner4 from '../../assets/images/IMG-20250328-WA0004.jpg';
import banner5 from '../../assets/images/IMG-20250328-WA0005.jpg';
import banner6 from '../../assets/images/IMG-20250328-WA0006.jpg';
import banner7 from '../../assets/images/IMG-20250328-WA0007.jpg';
import banner8 from '../../assets/images/IMG-20250328-WA0008.jpg';
import banner9 from '../../assets/images/IMG-20250328-WA0009.jpg';
import banner10 from '../../assets/images/IMG-20250328-WA0010.jpg';
import banner11 from '../../assets/images/IMG-20250328-WA0011.jpg';
import banner12 from '../../assets/images/IMG-20250328-WA0012.jpg';
import banner13 from '../../assets/images/IMG-20250328-WA0013.jpg';
import banner14 from '../../assets/images/IMG-20250328-WA0014.jpg';
import banner15 from '../../assets/images/IMG-20250328-WA0015.jpg';
import banner16 from '../../assets/images/IMG-20250328-WA0016.jpg';
import banner17 from '../../assets/images/IMG-20250328-WA0017.jpg';
import banner18 from '../../assets/images/IMG-20250328-WA0018.jpg';
import banner19 from '../../assets/images/IMG-20250328-WA0019.jpg';


const AnimalBanner = () => {
  useEffect(() => {
   
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
      const carousel = new window.bootstrap.Carousel('#animalCarousel', {
        interval: 5000,
        ride: 'carousel',
        wrap: true
      });
    });
  }, []);

  const slides = [
    { 
      image: banner1,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner2,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner3,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner4,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner5,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner6,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner7,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner8,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner9,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner10,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner11,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner12,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner13,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner14,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner15,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner16,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner17,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner18,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    },
    { 
      image: banner19,
      title: "Fazenda digital",
      description: "Os melhores animais para criação ou abate você encontra aqui  "
    }
  ];

  return (

    <div className="animal-banner-container">

      <div id="animalCarousel" className="carousel slide" data-bs-ride="carousel">
     
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#animalCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img
                src={slide.image}
                className="d-block w-100"
                alt={slide.title}
              />
              <div className="carousel-caption d-none d-md-block">
                <div className="banner-content">
                  <h3 className="banner-title">
                    <FaPaw className="me-2" />
                    {slide.title}
                  </h3>
                  <p className="banner-description">{slide.description}</p>
                  <div className="banner-actions mt-3">
                    <button className="btn btn-primary me-2">
                      Ver Animais
                    </button>
                    <button className="btn btn-outline-light">
                      Tornar-se Sócio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#animalCarousel" 
          data-bs-slide="prev"
        >
          <FaChevronLeft className="carousel-control-icon" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#animalCarousel" 
          data-bs-slide="next"
        >
          <FaChevronRight className="carousel-control-icon" />
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
};

export default AnimalBanner;