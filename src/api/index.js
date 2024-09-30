import axios from "axios";
const authToken = localStorage.getItem('X-AUTH-TOKEN');

const apiURL = 'https://apiadm.nextfit.com.br/api/'

const api = axios.create({
    baseURL: apiURL, 
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${authToken}`,
    },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('X-AUTH-TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('X-AUTH-TOKEN');
      localStorage.removeItem('X-REFRESH-TOKEN');
      window.location.href = '/';  
    }
    return Promise.reject(error);
  }
);

export const logout = () => {
    localStorage.removeItem('X-AUTH-TOKEN');
    localStorage.removeItem('X-REFRESH-TOKEN');
};

export default api;

