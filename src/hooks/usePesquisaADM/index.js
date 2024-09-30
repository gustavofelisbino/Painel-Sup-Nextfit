import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pesquisaGeral } from '../../api/services/pesquisaGeral';

export const usePesquisaADM = () => {
    const navigate = useNavigate();

    const [valueUnidade, setValueUnidade] = useState('');
    const [resultados, setResultados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const params = {
        sort: [{"property":"DataCriacao","direction":"desc"},{"property":"Id","direction":"desc"}],
        PesquisaGeral: valueUnidade,
        Status: [1,3,2,5,6],
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setResultados([]);
        
        setIsLoading(true);
        try {
        const response = await pesquisaGeral(params);
        console.log(response);
        setResultados(response.Content);  
        } catch (error) {
        console.error("Erro ao buscar unidades:", error);
        } finally {
        setIsLoading(false);
        }
    };

    const handleSelectUnidadeTreinamento = (idUnidade) => {
        console.log('Unidade selecionada:', idUnidade);
        navigate(`/treinamento/${idUnidade}`);
    };


    const handleSelectUnidadeCancelamento = (idUnidade) => {
        console.log('Unidade selecionada:', idUnidade);
        navigate(`/cancelamento/${idUnidade}`);
    };

    return {
        valueUnidade,
        setValueUnidade,
        resultados,
        setResultados,
        isLoading,
        setIsLoading,
        handleSearch,
        handleSelectUnidadeTreinamento,
        handleSelectUnidadeCancelamento,
        navigate
    }
}