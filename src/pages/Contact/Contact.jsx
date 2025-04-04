import React, { useState } from 'react';
import { 
  FaWhatsapp, 
  FaFacebook, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
  FaClock
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio do formulário
    setTimeout(() => {
      console.log('Formulário enviado:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Resetar mensagem de sucesso após 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="contact-title">
            <FaPaperPlane className="me-2" />
            Entre em Contato Conosco
          </h2>
          <p className="lead text-muted">
            Tem dúvidas, sugestões ou precisa de ajuda? Fale com nossa equipe!
          </p>
        </div>

        <div className="row">
          {/* Informações de contato */}
          <div className="col-lg-5 mb-4">
            <div className="card contact-info-card shadow-sm h-100">
              <div className="card-body">
                <h4 className="card-title mb-4">Nossos Canais</h4>
                
                <div className="contact-method mb-4">
                  <div className="contact-icon bg-success">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h5>WhatsApp</h5>
                    <p className="text-muted">+244 123 456 789</p>
                    <a 
                      href="https://wa.me/244123456789" 
                      className="btn btn-sm btn-success"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Enviar Mensagem
                    </a>
                  </div>
                </div>
                
                <div className="contact-method mb-4">
                  <div className="contact-icon bg-primary">
                    <FaFacebook />
                  </div>
                  <div>
                    <h5>Facebook</h5>
                    <p className="text-muted">/FazendaDigital</p>
                    <a 
                      href="https://www.facebook.com/FazendaDigital" 
                      className="btn btn-sm btn-primary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visitar Página
                    </a>
                  </div>
                </div>
                
                <div className="contact-method mb-4">
                  <div className="contact-icon bg-danger">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5>E-mail</h5>
                    <p className="text-muted">contato@fazendadigital.com</p>
                    <a 
                      href="mailto:contato@fazendadigital.com" 
                      className="btn btn-sm btn-danger"
                    >
                      Enviar E-mail
                    </a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon bg-secondary">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h5>Telefone</h5>
                    <p className="text-muted">+244 123 456 789</p>
                    <p className="text-muted small">
                      <FaClock className="me-1" />
                      Seg-Sex: 8h-18h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="col-lg-7">
            <div className="card contact-form-card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">Envie sua Mensagem</h4>
                
                {submitSuccess && (
                  <div className="alert alert-success mb-4">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                      <FaUser className="me-2" />
                      Nome Completo
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      className="form-control form-control-lg" 
                      placeholder="Digite seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="me-2" />
                      E-mail
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      className="form-control form-control-lg" 
                      placeholder="Digite seu e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Mensagem
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      className="form-control" 
                      rows="5" 
                      placeholder="Digite sua mensagem..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa/localização */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  <FaMapMarkerAlt className="me-2" />
                  Nossa Localização
                </h4>
                <div className="map-container ratio ratio-16x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.715040055156!2d13.49221531578626!3d-9.00228889358117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDguMiJTIDEzwrAyOSczOC4xIkU!5e0!3m2!1sen!2sao!4v1620000000000!5m2!1sen!2sao" 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Nossa Localização"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;