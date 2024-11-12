import axios from 'axios';

const axiosChatInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_LIVE_CHAT_DOMAIN,
  timeout: 0,
});

axiosChatInstance.interceptors.request.use(
  ($config) => {
    $config.headers.token = `${import.meta.env.VITE_APP_WS_TOKEN}`;
    // $config.headers['Content-Type'] = 'application/json';
    return $config;
  },
  (error) => Promise.reject(error),
);

axiosChatInstance.interceptors.response.use(
  (response) => response?.data || response,
  (error) => Promise.reject(error?.response?.data || error?.response || error),
);

const axiosBeInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_DOMAIN,
  timeout: 0,
});

axiosBeInstance.interceptors.request.use(
  ($config) => {
    // $config.headers.token = `${import.meta.env.VITE_APP_WS_TOKEN}`;
    // $config.headers['Content-Type'] = 'application/json';
    return $config;
  },
  (error) => Promise.reject(error),
);

axiosBeInstance.interceptors.response.use(
  (response) => response?.data || response,
  (error) => Promise.reject(error?.response?.data || error?.response || error),
);

export { axiosChatInstance, axiosBeInstance };
