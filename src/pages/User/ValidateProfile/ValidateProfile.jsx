import React, { useState } from 'react'
import { FaUpload, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './ValidateProfile.css'

const ValidateProfile = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
  const maxFileSize = 5 * 1024 * 1024 // 5MB

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setError('')
    
    if (!selectedFile) return

    if (!validFileTypes.includes(selectedFile.type)) {
      setError('Por favor, selecione um arquivo PNG, JPEG, JPG ou PDF')
      return
    }

    if (selectedFile.size > maxFileSize) {
      setError('O arquivo é muito grande (máximo 5MB)')
      return
    }

    setFile(selectedFile)
    setIsSubmitted(false)

    if (selectedFile.type.includes('image')) {
      const reader = new FileReader()
      reader.onload = () => setPreviewUrl(reader.result)
      reader.readAsDataURL(selectedFile)
    } else {
      setPreviewUrl('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Por favor, selecione um arquivo válido')
      return
    }

    // Simular envio para o servidor
    setTimeout(() => {
      setIsSubmitted(true)
      setError('')
    }, 1500)
  }

  return (
    <div className="validation-container">
      <div className="validation-card">
        <h2 className="validation-title">
          <FaCheckCircle className="icon-title" /> Validação de Perfil
        </h2>
        
        <p className="validation-subtitle">
          Carregue um documento de identificação válido (BI ou Passaporte) para completar a verificação da sua conta.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="validation-form">
            <div className={`file-upload ${error ? 'error' : ''} ${file ? 'has-file' : ''}`}>
              <label htmlFor="document" className="upload-label">
                <div className="upload-content">
                  <FaUpload className="upload-icon" />
                  <span className="upload-text">
                    {file ? file.name : 'Selecione ou arraste seu arquivo'}
                  </span>
                  <span className="upload-requirements">
                    Formatos aceites: PNG, JPEG, JPG, PDF (até 5MB)
                  </span>
                </div>
                <input 
                  type="file" 
                  id="document" 
                  accept=".png,.jpeg,.jpg,.pdf"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </label>
              
              {previewUrl && file?.type.includes('image') && (
                <div className="file-preview">
                  <img src={previewUrl} alt="Preview do documento" className="preview-image" />
                </div>
              )}
            </div>

            {error && (
              <div className="error-message">
                <FaTimesCircle className="error-icon" /> {error}
              </div>
            )}

            <div className="form-tips">
              <FaInfoCircle className="tip-icon" />
              <span className="tip-text">
                Certifique-se que o documento está legível e que todas as informações estão visíveis.
              </span>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={!file}
            >
              Enviar Documento
            </button>
          </form>
        ) : (
          <div className="submission-success">
            <div className="success-message">
              <FaCheckCircle className="success-icon" /> 
              <p>Documento enviado com sucesso para validação!</p>
              <p>O administrador irá analisar seu documento em breve.</p>
            </div>
            
            <Link to="/user-profile" className="profile-link">
              <FaUser className="link-icon" /> Ir para meu perfil
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ValidateProfile