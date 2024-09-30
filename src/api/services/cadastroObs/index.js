import api from "../..";

export const cadastroObs = async (data) => {
    
    try {
        const response = await api.post('/CadastroObservacao', data, {
            headers: {
            'Content-Type': 'application/json'
            }
        });

        return response.data;

    } catch (error) {
        throw new Error('Erro ao pesquisar unidades.');
    }
  };