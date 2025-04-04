import React from "react";
import { Link } from "react-router-dom";
import { 
  FaUserPlus,
  FaListAlt,
  FaShoppingCart,
  FaHandHoldingUsd,
  FaUserShield,
  FaMoneyBillWave,
  FaShieldAlt,
  FaChartLine,
  FaArrowLeft,
  FaPiggyBank,
  FaUsers
} from "react-icons/fa";
import "./HowItWorks.css";
import Footer from '../../components/Footer/Footer'

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="step-icon" />,
      title: "Cadastro de Usuários",
      description: "Compradores, vendedores e sócios podem se registrar e acessar a plataforma de forma segura após verificação de identidade."
    },
    {
      icon: <FaListAlt className="step-icon" />,
      title: "Listagem de Animais",
      description: "Vendedores cadastram animais com fotos, vídeos e informações detalhadas como espécie, raça, idade, peso e preço."
    },
    {
      icon: <FaShoppingCart className="step-icon" />,
      title: "Processo de Compra",
      description: "Compradores visualizam detalhes dos animais e realizam compras com segurança, mediadas pelo administrador."
    },
    {
      icon: <FaHandHoldingUsd className="step-icon" />,
      title: "Investimento como Sócio",
      description: "Sócios investem em animais específicos e recebem retorno proporcional ao valor investido quando o animal é vendido."
    },
    {
      icon: <FaUserShield className="step-icon" />,
      title: "Mediação Administrativa",
      description: "O administrador monitora todas as transações, garantindo a integridade e segurança do processo."
    },
    {
      icon: <FaMoneyBillWave className="step-icon" />,
      title: "Pagamentos Seguros",
      description: "Todas as transações financeiras são realizadas de forma segura, com comprovantes e rastreabilidade."
    }
  ];

  return (
    <div className="how-it-works-page">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="how-it-works-title">
            <FaPiggyBank className="me-3" />
            Como Funciona o Sistema
          </h1>
          <p className="lead text-muted">
            Conheça nosso processo seguro de compra, venda e investimento em animais
          </p>
        </div>

        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm overview-card">
              <div className="card-body">
                <h3 className="card-title mb-4">
                  <FaChartLine className="me-2" />
                  Visão Geral
                </h3>
                <p className="card-text">
                  O sistema "Fazenda Digital" é uma plataforma inovadora que facilita a
                  compra e venda de animais de forma segura e eficiente. Conectamos
                  vendedores, compradores e sócios investidores, garantindo transações
                  confiáveis e transparentes com a mediação de nosso administrador.
                </p>
                <div className="d-flex align-items-center mt-4">
                  <FaUsers className="fs-1 me-3 text-primary" />
                  <div>
                    <h5 className="mb-1">+500 usuários</h5>
                    <p className="small text-muted mb-0">Confiam em nossa plataforma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm investment-card">
              <div className="card-body">
                <h3 className="card-title mb-4">
                  <FaHandHoldingUsd className="me-2" />
                  Sobre o Investimento
                </h3>
                <p className="card-text">
                  Sócios podem investir em animais específicos, tornando-se co-proprietários.
                  O lucro da venda do animal será dividido conforme a participação no investimento.
                </p>
                <div className="investment-example mt-4 p-3 bg-light rounded">
                  <h5>Exemplo Prático:</h5>
                  <ul className="mb-0">
                    <li>Animal valorizado em 600.000 Kz</li>
                    <li>3 sócios investem 200.000 Kz cada</li>
                    <li>Animal é vendido por 900.000 Kz</li>
                    <li>Cada sócio recebe 300.000 Kz (50% de lucro)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-center mb-4">
          <FaUsers className="me-2" />
          Funcionalidades Principais
        </h3>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {steps.map((step, index) => (
            <div className="col" key={index}>
              <div className="card h-100 feature-card shadow-sm">
                <div className="card-body text-center">
                  <div className="step-icon-container mb-3">
                    {step.icon}
                  </div>
                  <h4 className="card-title">{step.title}</h4>
                  <p className="card-text">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card shadow-sm security-card">
          <div className="card-body">
            <h3 className="text-center mb-4">
              <FaShieldAlt className="me-2" />
              Segurança e Transparência
            </h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="security-list">
                  <li>
                    <FaShieldAlt className="me-2 text-success" />
                    Todas as transações são registradas e auditáveis
                  </li>
                  <li>
                    <FaShieldAlt className="me-2 text-success" />
                    Verificação de identidade para todos os usuários
                  </li>
                  <li>
                    <FaShieldAlt className="me-2 text-success" />
                    Pagamentos mediados pelo administrador
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="security-list">
                  <li>
                    <FaShieldAlt className="me-2 text-success" />
                    Entrega dos animais verificada e garantida
                  </li>
                  <li>
                    <FaShieldAlt className="me-2 text-success" />
                    Suporte administrativo para mediação de disputas
                  </li>
                  <li>
                    <FaShieldAlt className="me-2 text-success" />
                    Dados protegidos com criptografia avançada
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="btn btn-primary btn-lg">
            <FaArrowLeft className="me-2" />
            Voltar para o Início
          </Link>
        </div>
      </div>

      <Footer />
    </div>

    
  );
};

export default HowItWorks;