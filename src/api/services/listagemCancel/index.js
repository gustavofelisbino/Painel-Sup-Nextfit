import api from "../..";

export const listagemCancel = async (params) => {
    
    try {
        const response = await api.get('/Cadastro/Listar', {
            params: {
                fields: JSON.stringify(params.fields),
                filter: JSON.stringify(params.filter),
                includes: JSON.stringify(params.includes)
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