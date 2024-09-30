import React from 'react';
import { useNavigate } from 'react-router-dom';

const OptionsPage = () => {
  const navigate = useNavigate();

  return (
        <div>
          <section className='options'>
            <h1 className='titulooptions'>Escolha uma opção</h1>
            <button className='treinamento' onClick={() => navigate('/treinamento')}>Treinamento</button>
            <button className='cancelamento' onClick={() => navigate('/cancelamento')}>Cancelamento</button>
            <button className='template' onClick={() => window.open('https://ferramenta-templates.netlify.app', '_blank')}>Ferramenta de template</button>
          </section>
        </div>
    );
  };
export default OptionsPage;
