import axios from 'axios';

const axiosChatInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_LIVE_CHAT_DOMAIN,
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

export { axiosChatInstance };
