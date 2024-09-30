import api from "../..";

export const selecionarUsuarioADM = async (params) => {
    
    try {
        const response = await api.get('/UsuarioPainelAdm', {
            params: {
                filter: JSON.stringify(params.filter),
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