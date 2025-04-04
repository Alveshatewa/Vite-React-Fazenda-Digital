import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import { FaSearch } from 'react-icons/fa'
import './Main.css'
import AnimalBanner from '../Banner/Animalbanner'

const Main = () => {
 
  const [searchTerm, setSearchTerm] = useState('')

  
  const animals = Array.from({ length: 16 }, (_, i) => i + 1)

 
  const filteredAnimals = animals.filter(animal => {
    
    return animal.toString().includes(searchTerm.toString())
  })

  return (

    <div>
      <AnimalBanner />

      <div className='container my-5'>
        <h2 className='text-center mb-4 Main-title'> Animais à Venda </h2>

      
        <div className="col-md-6 mx-auto">
          <div className="input-group mb-4">
            <span className="input-group-text"><FaSearch /></span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Pesquisar por número (1-16)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

       
        {filteredAnimals.length === 0 && (
          <div className="alert alert-warning text-center">
            Nenhum animal encontrado com o número "{searchTerm}"
          </div>
        )}

        <div className='row'>
          {filteredAnimals.map((item) => (
            <div key={item} className='col-12 col-md-6 col-lg-3 mb-4'>
              <div className='card animal-card'>
                <img 
                  src={`/images/animal${item}.jpg`} 
                  className='card-img-top' 
                  alt={`Animal ${item}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = ''
                  }}
                />

                <div className='card-body text-center'>
                  <h5 className='card-title'>Animal {item}</h5>
                  <p className='card-text'>Preço: {(item * 250000).toLocaleString('pt-AO')} KZ</p>
                  <Link to='/animal-details' className='btn btn-success'> 
                    <FaSearch className="me-1" /> Ver Mais 
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main