import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { token } from '../../api/services/auth';

export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await token({ username, password, grant_type: "password", code });
        navigate('/options');
        } catch (error) {
        setError('Credenciais inválidas');
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        code,
        setCode,
        error,
        setError,
        handleLogin
    }
}