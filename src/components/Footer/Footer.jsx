import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container py-5">
        <div className="row">
         
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-heading">
              <FaMapMarkerAlt className="me-2" />
              Contato
            </h5>
            <ul className="footer-contact-list">
              <li>
                <FaEnvelope className="me-2" />
                <a href="mailto:contato@fazendadigital.com" className="footer-link">
                  contato@fazendadigital.com
                </a>
              </li>
              <li>
                <FaPhone className="me-2" />
                <a href="tel:+244999999999" className="footer-link">
                  (+244) 999 999 999
                </a>
              </li>
              <li>
                <FaWhatsapp className="me-2" />
                <a href="https://wa.me/244999999999" target="_blank" rel="noopener noreferrer" className="footer-link">
                  WhatsApp: (+244) 999 999 999
                </a>
              </li>
              <li>
                <FaClock className="me-2" />
                Seg-Sex: 8h-18h
              </li>
            </ul>
          </div>

          {/* Links Rápidos */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="footer-heading">Links Rápidos</h5>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Início</Link>
              </li>
              <li>
                <Link to="/animal-listed" className="footer-link">Animais</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="footer-link">Como Funciona</Link>
              </li>
              <li>
                <Link to="/partner" className="footer-link">Para Sócios</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contato</Link>
              </li>
            </ul>
          </div>

       
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="footer-heading">Legal</h5>
            <ul className="footer-links">
              <li>
                <Link to="/politica-privacidade" className="footer-link">Política de Privacidade</Link>
              </li>
              <li>
                <Link to="/termos-servico" className="footer-link">Termos de Serviço</Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">FAQ</Link>
              </li>
              <li>
                <Link to="/seguranca" className="footer-link">Segurança</Link>
              </li>
            </ul>
          </div>

        
          <div className="col-md-4">
            <h5 className="footer-heading">Redes Sociais</h5>
            <p className="footer-social-text">Siga-nos nas redes sociais</p>
            
            <div className="footer-social-links">
              <a 
                href="https://facebook.com/fazendadigital" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://instagram.com/fazendadigital" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.me/244999999999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>

          </div>
        </div>

        <div className="footer-bottom mt-4 pt-3 border-top">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                &copy; {currentYear} Fazenda Digital. Todos os direitos reservados.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                Desenvolvido por Alfacode
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;