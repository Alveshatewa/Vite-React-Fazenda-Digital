import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaMobileAlt, FaArrowLeft, FaPaperPlane, FaCheckCircle, FaKey } from 'react-icons/fa';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState(null); 
  const [step, setStep] = useState(1); // 1 = escolha método, 2 = envio, 3 = verificação
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // Gerar código de 6 dígitos para SMS
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Formatar número de telefone
  const formatPhoneNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '+$1$2')
      .replace(/(\d{2})(\d)/, '$1 $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  
  const sendResetEmail = async (email) => {
    console.log(`Simulando envio de email para ${email}`);
    // Em produção, integrar com SendGrid ou outro serviço
    return true;
  };

  
  const sendSMS = async (phone, code) => {
    console.log(`Simulando envio de SMS para ${phone} com código: ${code}`);
    // Em produção, integrar com Twilio ou outro serviço
    return true;
  };

  const handleMethodSelection = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep(2);
    setError('');
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    
    if (method === 'email' && !email) {
      setError('Por favor, insira seu endereço de email');
      return;
    }
    
    if (method === 'sms' && !phone) {
      setError('Por favor, insira seu número de telefone');
      return;
    }

    setIsLoading(true);
    
    try {
      if (method === 'email') {
        const sent = await sendResetEmail(email);
        if (sent) {
          setSuccess(true);
          setStep(3);
        }
      } else {
        const code = generateVerificationCode();
        setGeneratedCode(code);
        const sent = await sendSMS(phone, code);
        if (sent) {
          setCountdown(120); 
          setStep(3);
        }
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    
    if (method === 'sms' && verificationCode !== generatedCode) {
      setError('Código inválido. Por favor, tente novamente.');
      return;
    }
    
    // Redirecionar para a página de nova senha
    navigate('/new-password', { state: { contact: method === 'email' ? email : phone } });
  };

  // Contador regressivo
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const renderStep1 = () => (
    <div className="method-selection">
      <h3 className="text-center mb-4">Como deseja redefinir sua senha?</h3>
      <div className="d-grid gap-3">
        <button 
          className="btn btn-outline-primary d-flex align-items-center justify-content-center p-3"
          onClick={() => handleMethodSelection('email')}
        >
          <FaEnvelope className="me-3" size={24} />
          <div className="text-start">
            <h5 className="mb-1">Receber link por email</h5>
            <small className="text-muted">Enviaremos um link seguro para seu email</small>
          </div>
        </button>
        
        <button 
          className="btn btn-outline-primary d-flex align-items-center justify-content-center p-3"
          onClick={() => handleMethodSelection('sms')}
        >
          <FaMobileAlt className="me-3" size={24} />
          <div className="text-start">
            <h5 className="mb-1">Receber código por SMS</h5>
            <small className="text-muted">Enviaremos um código de 6 dígitos para seu telefone</small>
          </div>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSendCode}>
      {method === 'email' ? (
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Endereço de Email</label>
          <div className="input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Número de Telefone</label>
          <div className="input-group">
            <span className="input-group-text"><FaMobileAlt /></span>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="+244 123456789"
              value={phone}
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
              disabled={isLoading}
            />
          </div>
          <small className="text-muted">Inclua o código do país (ex: +244 para Angola)</small>
        </div>
      )}

      <div className="d-grid gap-2 mt-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Enviando...
            </>
          ) : (
            <>
              <FaPaperPlane className="me-2" />
              Enviar {method === 'email' ? 'Link' : 'Código'}
            </>
          )}
        </button>
        
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setStep(1)}
          disabled={isLoading}
        >
          <FaArrowLeft className="me-1" />
          Voltar
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleVerifyCode}>
      {method === 'email' ? (
        <div className="alert alert-success text-center">
          <FaEnvelope className="me-2" />
          Enviamos um link de redefinição para <strong>{email}</strong>.
          Verifique sua caixa de entrada e clique no link recebido.
        </div>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Código de Verificação</label>
            <div className="input-group">
              <span className="input-group-text"><FaKey /></span>
              <input
                type="text"
                className="form-control"
                id="code"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
              />
            </div>
            {countdown > 0 && (
              <small className="text-muted d-block mt-2">
                Código expira em: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
              </small>
            )}
          </div>

          <div className="d-grid gap-2 mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Verificando...
                </>
              ) : (
                <>
                  <FaCheckCircle className="me-2" />
                  Verificar Código
                </>
              )}
            </button>
          </div>
        </>
      )}

      <div className="text-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => {
            setStep(2);
            setError('');
            setVerificationCode('');
          }}
        >
          <FaPaperPlane className="me-1" />
          Reenviar {method === 'email' ? 'email' : 'código'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="h3">Redefinir Senha</h2>
                  <p className="text-muted">
                    {step === 1 && 'Escolha como deseja redefinir sua senha'}
                    {step === 2 && `Digite seu ${method === 'email' ? 'email' : 'número de telefone'}`}
                    {step === 3 && method === 'email' && 'Verifique seu email'}
                    {step === 3 && method === 'sms' && 'Digite o código recebido'}
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger mb-3">
                    <FaExclamationCircle className="me-2" />
                    {error}
                  </div>
                )}

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => navigate('/login')}
                  >
                    <FaArrowLeft className="me-1" />
                    Voltar para o login
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

export default ResetPassword;