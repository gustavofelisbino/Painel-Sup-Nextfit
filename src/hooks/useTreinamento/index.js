import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { listagemCancel } from '../../api/services/listagemCancel';
import { selecionarUsuarioADM } from '../../api/services/selecionarUsuarioADM';
import { cadastroObs } from '../../api/services/cadastroObs';

export const useTreinamento = () => {
    const { idUnidade } = useParams();
    const navigate = useNavigate();

    const [nomeCliente, setNomeCliente] = useState('');
    const [funcaoCliente, setFuncaoCliente] = useState('');
    const [contatoCliente, setContatoCliente] = useState('');
    const [duvidasCliente, setDuvidasCliente] = useState('');
    const [anexos, setAnexos] = useState('');
    const [proximoPasso, setProximoPasso] = useState('Encaminhado para a consultora de ativação/TL ativação');

    const [mensagemFinal, setMensagemFinal] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAgendar, setIsAgendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [responsavel, setResponsavel] = useState(null);
    const [inputValue, setInputValue] = useState(''); 
    const [options, setOptions] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);
    const [csmInfo, setCsmInfo] = useState({ nome: '', id: '' });

    const [isLoading, setIsLoading] = useState(false);
    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [showToastError, setShowToastError] = useState(false); 
    const [showToastCopiar, setShowToastCopiar] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listagemCancel(params);
                console.log(response);
                const nomeCSM = response.Content[0].Csm.Nome;
                const idCSM = response.Content[0].Csm.Id;
                console.log(`Nome e ID do CSM: ${nomeCSM} - ${idCSM}`);
                setCsmInfo({ nome: nomeCSM, id: idCSM });
                setResponsavel({ value: idCSM, label: nomeCSM });
                setOptions([{ value: idCSM, label: nomeCSM }]);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [idUnidade]);

    const params = {
        fields: ["Csm.Nome", "Csm.Id"],
        filter: [{ "property": "Id", "operator": "equal", "value": idUnidade, "and": false }]
    };
    

    const formatarMensagem = () => {
        const mensagem = `
            SOLICITAÇÃO DE TREINAMENTO
            
            Quem solicitou o treinamento: ${String(nomeCliente)}
            
            Qual sua função: ${String(funcaoCliente)}

            Qual contato entrou no suporte: ${String(contatoCliente)}

            Dúvidas que o cliente alegou maior dificuldades: ${String(duvidasCliente)}

            Anexos: ${String(anexos)}
            
            Próximo passo: ${String(proximoPasso)}
        `.replace(/^\s+/gm, '')
        .replace(/\n/g, '\n\n');
    
        setMensagemFinal(mensagem);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        formatarMensagem();
        console.log("Mensagem final: ", mensagemFinal);
    };

    const handleSendToAdm = () => {
        setShowModal(true);
    };

    const handleAgendarSwitch = () => {
        setIsAgendar(!isAgendar);
    };

    const onInputChange = (value) => {
        setInputValue(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            handleResponsavelChange(value);
        }, 1000);

        setTimeoutId(newTimeoutId);
    };


    const handleResponsavelChange = async (inputValue) => {
        console.log("Buscando por:", inputValue);

        const params = {
            sort: [{ "property": "Nome", "direction": "asc" }],
            filter: [
                { "property": "Nome", "operator": "contains", "value": inputValue, "and": "true" },
                { "property": "Inativo", "operator": "equal", "value": false, "and": "true" }
            ]
        };

        try {
            const response = await selecionarUsuarioADM(params);
            const novasOpcoes = response.Content.map((item) => ({
                value: item.Id,
                label: item.Nome,
            }));
            setOptions(novasOpcoes);
            console.log("Opções de responsáveis:", novasOpcoes);
        } catch (error) {
            console.log("Erro ao pesquisar usuários: ", error);
        }
    };

    const handleEnviarObs = async () => {
        setIsLoading(true);
        const payload = {
            CodigoCadastro: idUnidade,
            Tipo: 2,
            Observacao: mensagemFinal,
            Agendar: isAgendar, 
            DataAgendamento: isAgendar ? selectedDate?.toISOString() : null, 
            CodigoUsuarioAgendamento: responsavel?.value 
        };
        
        console.log("Payload a ser enviado:", payload);

        try {
            const response = await cadastroObs(payload);
            console.log("Resposta do envio da obs: ", response);
            setShowModal(false);
            setShowToastSuccess(true);
            setTimeout(() => {
                navigate('/options');
            }, 3000); 
        } catch (error) {
            console.log("Erro ao enviar obs: ", error);
            setShowToastError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFocus = () => {
        setResponsavel(null);
        setOptions([]); 
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return {
        nomeCliente,
        setNomeCliente,
        funcaoCliente,
        setFuncaoCliente,
        contatoCliente,
        setContatoCliente,
        duvidasCliente,
        setDuvidasCliente,
        anexos,
        setAnexos,
        proximoPasso,
        setProximoPasso,
        handleSubmit,
        navigate,
        mensagemFinal,
        handleSendToAdm,
        showModal,
        setShowModal,
        isAgendar,
        handleAgendarSwitch,
        selectedDate,
        handleDateChange,
        options,
        responsavel,
        onInputChange,
        setResponsavel,
        handleFocus,
        setShowToastError,
        setShowToastSuccess,
        showToastError,
        showToastSuccess,
        handleEnviarObs,
        isLoading,
        showToastCopiar,
        setShowToastCopiar
    }
}