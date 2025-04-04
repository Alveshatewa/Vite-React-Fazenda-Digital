import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaHome,
  FaPaw,
  FaQuestionCircle,
  FaEnvelope,
  FaUserPlus,
  FaSignInAlt,
  FaUserTie,
  FaChartLine
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="header-logo">
              <FaPaw className="me-2" />
              Fazenda Digital
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Items */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink 
                  className="nav-link d-flex align-items-center" 
                  to="/" 
                  exact
                  activeClassName="active"
                >
                  <FaHome className="me-1" />
                  Início
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink 
                  className="nav-link d-flex align-items-center" 
                  to="/animal-listed"
                  activeClassName="active"
                >
                  <FaPaw className="me-1" />
                  Animais à Venda
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink 
                  className="nav-link d-flex align-items-center" 
                  to="/how-it-works"
                  activeClassName="active"
                >
                  <FaQuestionCircle className="me-1" />
                  Como Funciona
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink 
                  className="nav-link d-flex align-items-center" 
                  to="/contact"
                  activeClassName="active"
                >
                  <FaEnvelope className="me-1" />
                  Contacto
                </NavLink>
              </li>

              {/* Dropdown para tipos de usuário */}
              <li className="nav-item dropdown">
                <NavLink 
                  className="nav-link dropdown-toggle d-flex align-items-center" 
                  to="#"
                  id="userTypeDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <FaUserTie className="me-1" />
                  Área do Usuário
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="userTypeDropdown">
                  <li>
                    <Link className="dropdown-item" to="/admin">
                      <FaChartLine className="me-2" />
                      Administrador
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile/seller">
                      <FaUserTie className="me-2" />
                      Vendedor
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile/buyer">
                      <FaUserTie className="me-2" />
                      Comprador
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/partner">
                      <FaChartLine className="me-2" />
                      Sócio Investidor
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Botões de ação */}
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link 
                  className="btn btn-warning btn-cta pulse-animation d-flex align-items-center" 
                  to="/register"
                >
                  <FaUserPlus className="me-2" />
                  Cadastre-se Grátis
                </Link>
              </li>
              
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link 
                  className="btn btn-primary btn-cta pulse-animation d-flex align-items-center" 
                  to="/login"
                >
                  <FaSignInAlt className="me-2" />
                  Entrar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;