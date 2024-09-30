import api from "../..";

export const pesquisaGeral = async (params) => {
    
    try {
        const response = await api.get('/Cadastro/ListarView', {
            params: {
                PesquisaGeral: params.PesquisaGeral,
                Status: JSON.stringify(params.Status),
                sort: JSON.stringify(params.sort)
            },
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data;

    } catch (error) {
        throw new Error('Erro ao pesquisar unidades.');
    }
  };