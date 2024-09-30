import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { usePesquisaADM } from '../../hooks/usePesquisaADM';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Cancelamento = () => {

  const {
    handleSearch,
    handleSelectUnidadeCancelamento,
    valueUnidade,
    setValueUnidade,
    isLoading,
    resultados,
    navigate
  } = usePesquisaADM();

  return (
    <div>
      <section>
      <h2>Digite a unidade que deseja solicitar o cancelamento:</h2>
      <form onSubmit={handleSearch}>
        <div className='pesquisa'>
        <input className='pesquisar'
            type="text" 
            placeholder="Pesquisa Geral" 
            value={valueUnidade} 
            onChange={(e) => setValueUnidade(e.target.value)} 
        />
        </div>
        <button type="submit" disabled={isLoading}className='botaopesquisa'>
          {isLoading ? <ClipLoader size={15} color="#fff" /> : 'Procurar'}
        </button>
      </form>

      {resultados.length > 0 && (
        <div>
          <h2 className='unidades'>Unidades:</h2>
          {resultados.map((unidade) => (
            <button className='unidade' key={unidade.Id} onClick={() => handleSelectUnidadeCancelamento(unidade.Id)}>
              {unidade.Nome}
            </button>
          ))}
        </div>
      )}
      <button onClick={() => navigate('/options')}className='botaovoltar'>
      <FontAwesomeIcon icon={faArrowLeft} className='arrow-left-icon' />
      <span>Voltar</span>
      </button>
      </section>
    </div>
  );
};

export default Cancelamento;
