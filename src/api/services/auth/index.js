import api from "../..";
import qs from 'qs';
import axios from "axios";

const apiURL = 'https://apiadm.nextfit.com.br/api/'

export const refreshToken = async () => {
    const refreshToken = await localStorage.getItem('X-REFRESH-TOKEN');
    const authToken = await localStorage.getItem('X-AUTH-TOKEN');

    const data = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    return axios({
        method: 'post',
        url: `${apiURL}Token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${authToken}`,
        },
        data: data,
    }).then((response) => response);
};

export const token = async (credentials) => {
  try {

    const data = qs.stringify({
        username: credentials.username,
        password: credentials.password,
        grant_type: 'password',
        code: credentials.code
      });
      const response = await api.post('/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    
    const { access_token, refresh_token } = response.data;

    localStorage.setItem('X-AUTH-TOKEN', access_token);
    localStorage.setItem('X-REFRESH-TOKEN', refresh_token);

    return response.data;

  } catch (error) {
    throw new Error('Erro ao fazer login');
  }
};