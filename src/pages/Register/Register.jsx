import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { 
  FaUserPlus, 
  FaIdCard, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaMapMarkerAlt,
  FaUserTag,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    documentoIdentificacao: '',
    email: '',
    senha: '',
    telefone: '',
    provincia: '',
    municipio: '',
    bairro: '',
    tipoUsuario: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { registeUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const provinces = ["Luanda", "Huila", "Namibe", "Cunene", "Benguela", "Huambo", "Moxico", "Malanje", "Bie", "Bengo", "Cuando-Cubango"];
  const municipalities = ["Lubango", "Humpata", "Palanca", "Chibia", "Caconda", "Chipindo", "Quilengues", "Caluquembe", "Chongoroi"];
  const userTypes = [
    { value: "comprador", label: "Comprador" },
    { value: "vendedor", label: "Vendedor" },
    { value: "socio", label: "Sócio Investidor" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registeUser(formData);
      setSuccess(true);
      
      // Redireciona após 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Falha no registro. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-success-page">
        <div className="container text-center py-5">
          <FaCheckCircle className="success-icon" />
          <h2 className="mt-4">Cadastro realizado com sucesso!</h2>
          <p className="lead">Você será redirecionado para a página de login em instantes.</p>
          <div className="spinner-border text-success mt-3" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card register-card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">
                  <FaUserPlus className="me-2" />
                  Criar Nova Conta
                </h2>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister}>
                  <div className="row">
                    <div className="col-md-6">
                      {/* Nome Completo */}
                      <div className="mb-4">
                        <label htmlFor="nome" className="form-label">
                          <FaUserPlus className="me-2" />
                          Nome Completo
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUserPlus />
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Digite seu nome completo"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Documento de Identificação */}
                      <div className="mb-4">
                        <label htmlFor="documentoIdentificacao" className="form-label">
                          <FaIdCard className="me-2" />
                          Documento de Identificação
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaIdCard />
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            name="documentoIdentificacao"
                            id="documentoIdentificacao"
                            placeholder="BI ou Passaporte"
                            value={formData.documentoIdentificacao}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                          <FaEnvelope className="me-2" />
                          Email
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaEnvelope />
                          </span>
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Senha */}
                      <div className="mb-4">
                        <label htmlFor="senha" className="form-label">
                          <FaLock className="me-2" />
                          Senha
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock />
                          </span>
                          <input
                            className="form-control"
                            type="password"
                            name="senha"
                            id="senha"
                            placeholder="Crie uma senha segura"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                            minLength="6"
                          />
                        </div>
                        <small className="text-muted">Mínimo de 6 caracteres</small>
                      </div>
                    </div>

                    <div className="col-md-6">
                      {/* Telefone */}
                      <div className="mb-4">
                        <label htmlFor="telefone" className="form-label">
                          <FaPhone className="me-2" />
                          Telefone
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">+244</span>
                          <input
                            className="form-control"
                            type="tel"
                            name="telefone"
                            id="telefone"
                            placeholder="9XX XXX XXX"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Localização */}
                      <div className="mb-4">
                        <label className="form-label">
                          <FaMapMarkerAlt className="me-2" />
                          Localização
                        </label>
                        
                        {/* Província */}
                        <div className="mb-3">
                          <select
                            name="provincia"
                            className='form-select'
                            value={formData.provincia}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Selecione sua província</option>
                            {provinces.map(province => (
                              <option key={province} value={province}>{province}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Município */}
                        <div className="mb-3">
                          <select
                            name="municipio"
                            className='form-select'
                            value={formData.municipio}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Selecione seu município</option>
                            {municipalities.map(municipality => (
                              <option key={municipality} value={municipality}>{municipality}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Bairro */}
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaMapMarkerAlt />
                          </span>
                          <input
                            className='form-control'
                            type="text"
                            name="bairro"
                            placeholder='Digite seu bairro'
                            value={formData.bairro}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Tipo de Usuário */}
                      <div className="mb-4">
                        <label htmlFor="tipoUsuario" className="form-label">
                          <FaUserTag className="me-2" />
                          Tipo de Usuário
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUserTag />
                          </span>
                          <select
                            className='form-select'
                            name="tipoUsuario"
                            value={formData.tipoUsuario}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Selecione seu perfil</option>
                            {userTypes.map(type => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Termos e Condições */}
                      <div className="form-check mb-4">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="termosCondicoes" 
                          required
                        />
                        <label className="form-check-label" htmlFor="termosCondicoes">
                          Eu concordo com os <Link to="/termos">Termos de Serviço</Link> e <Link to="/privacidade">Política de Privacidade</Link>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      type='submit' 
                      className='btn btn-primary btn-lg'
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registrando...
                        </>
                      ) : (
                        <>
                          <FaUserPlus className="me-2" />
                          Criar Conta
                        </>
                      )}
                    </button>

                    <Link 
                      to='/login' 
                      className='btn btn-outline-secondary btn-lg'
                    >
                      <FaArrowLeft className="me-2" />
                      Já tenho uma conta
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;