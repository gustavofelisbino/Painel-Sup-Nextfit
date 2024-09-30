import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Modal, Button, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { useTreinamento } from '../../hooks/useTreinamento';

const TreinamentoObs = () => {
    
    const {
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
        isLoading
    } = useTreinamento();

    return (
        <div className="container-data">
            <h1 className='h1treinamento'>Solicitação de Treinamento</h1>
            <form className='form-cancelamento'>
                <div className="form-group">
                    <label className='label-mensagem'>Quem solicitou:</label>
                    <textarea
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}
                        placeholder="Nome do cliente"
                        className="textarea"
                    />
                </div>
                <div className="form-group">
                    <label className='label-mensagem'>Qual sua função:</label>
                    <textarea
                        value={funcaoCliente}
                        onChange={(e) => setFuncaoCliente(e.target.value)}
                        placeholder="Recepcionista/Professor/Gestor/Dono"
                        className="textarea"
                    />
                </div>
                <div className="form-group">
                    <label className='label-mensagem'>Contato:</label>
                    <textarea
                        value={contatoCliente}
                        onChange={(e) => setContatoCliente(e.target.value)}
                        placeholder="Número do WhatsApp ou E-mail"
                        className="textarea"
                    />
                </div>
                <div className="form-group">
                    <label className='label-mensagem'>Principais dúvidas:</label>
                    <textarea
                        value={duvidasCliente}
                        onChange={(e) => setDuvidasCliente(e.target.value)}
                        placeholder="Descreva as dúvidas"
                        className="textarea"
                    />
                </div>
                <div className="form-group">
                    <label className='label-mensagem'>Anexos:</label>
                    <textarea
                        value={anexos}
                        onChange={(e) => setAnexos(e.target.value)}
                        placeholder="Link de print/áudio (não colocar link do chat)"
                        className="textarea"
                    />
                </div>
                <div className="form-group">
                    <label className='label-mensagem'>Próximo passo:</label>
                    <textarea
                        value={proximoPasso}
                        onChange={(e) => setProximoPasso(e.target.value)}
                        placeholder="Descreva o próximo passo"
                        className="textarea"
                    />
                </div>
            </form>
            <div className='options-gerar-mensagem'>
                <button onClick={handleSubmit} className="botao-pesquisa">Gerar Mensagem</button>
                <button onClick={() => navigate('/cancelamento')} className="botaovoltar">Voltar</button>
            </div>

            {mensagemFinal && (<>
                <div className='div-mensagem-cancelamento'>
                    <div className="mensagem-gerada">
                        <h2>Mensagem Gerada:</h2>
                        <pre className='mensagem-cancelamento'>{mensagemFinal}</pre>
                    </div> 
                </div>
            <div className='options-mensagem-cancelamento'>
                        <button className="post-button" onClick={handleSendToAdm}>Enviar ao ADM</button>
                    <button 
                        className="post-button" 
                        onClick={() => {
                        navigator.clipboard.writeText(mensagemFinal);
                        alert("Mensagem copiada!");
                        }}
                    >
                        Copiar
                    </button>
                    </div>
                    </>
            )}


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enviar ao ADM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Mensagem:</h4>
                    <pre>{mensagemFinal}</pre>

                    <Form.Group className="mt-3">
                        <Form.Check
                            type="switch"
                            id="agendar-switch"
                            label="Agendar"
                            checked={isAgendar}
                            onChange={handleAgendarSwitch}
                        />
                    </Form.Group>

                    {isAgendar && (
                        <div>
                            <div className="mt-3">
                                <label>Data e Hora:</label>
                                <br />
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy, HH:mm"
                                />
                            </div>
                            <div className="mt-3">
                                <label>Responsável</label>
                                <Select
                                    options={options}
                                    value={responsavel}
                                    onInputChange={onInputChange}
                                    onChange={(selected) => {
                                        setResponsavel(selected);
                                        console.log('Responsável selecionado:', selected);
                                    }}
                                    onFocus={handleFocus} 
                                />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => setShowModal(false)}>
                    Fechar
                </Button>
                <Button variant="success" onClick={handleEnviarObs} disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Enviar"}
                </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="bottom-end" className="p-3">
                <Toast 
                    onClose={() => setShowToastSuccess(false)} 
                    show={showToastSuccess} 
                    delay={3000} 
                    autohide 
                    bg="success"
                >
                    <Toast.Header>
                        <strong className="me-auto">Sucesso</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Observação enviada com sucesso!</Toast.Body>
                </Toast>

                <Toast 
                    onClose={() => setShowToastError(false)} 
                    show={showToastError} 
                    delay={3000} 
                    autohide 
                    bg="danger"
                >
                    <Toast.Header>
                        <strong className="me-auto">Erro</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Erro ao enviar a observação.</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default TreinamentoObs;
