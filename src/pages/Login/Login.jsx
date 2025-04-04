import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { 
  FaSignInAlt, 
  FaUserPlus, 
  FaLock, 
  FaEnvelope, 
  FaEye, 
  FaEyeSlash,
  FaUserShield
} from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userData = await login({ email, senha });

      console.log('Login feito com sucesso', userData);

      // Redireciona com base no tipo de usuário
      if (userData.tipo === 'vendedor') {
        navigate('/perfil/vendedor');
      } else if (userData.tipo === 'comprador') {
        navigate('/perfil/comprador');
      } else if (userData.tipo === 'admin') {
        navigate('/painel/admin');
      } else {
        navigate('/user-profile'); 
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="card login-card shadow-lg">
              <div className="card-header bg-primary text-white text-center py-4">
                <h2 className="mb-0">
                  <FaSignInAlt className="me-2" />
                  Acesse sua conta
                </h2>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {error && (
                  <div className="alert alert-danger">
                    <FaUserShield className="me-2" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="me-2" />
                      Endereço de Email
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
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <FaLock className="me-2" />
                      Senha
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="rememberMe" 
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Lembrar de mim
                      </label>
                    </div>
                    <Link to="/get-password" className="text-decoration-none">
                      Esqueceu sua senha?
                    </Link>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Entrando...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Entrar
                      </>
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="mb-2">Ainda não tem uma conta?</p>
                    <Link 
                      to="/register" 
                      className="btn btn-outline-primary w-100 py-2"
                    >
                      <FaUserPlus className="me-2" />
                      Criar conta
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

export default Login;