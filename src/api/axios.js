import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
});

axiosClient.interceptors.response.use(res => res, async error => {
  const guest_paths = ['/', '/login', '/register', '/forgot-password', '/password-reset'];
  const current_path = window.location.pathname;

  if(guest_paths.find((p) => p === current_path)) {
    return Promise.reject(error);
  }

  if(error.response.status == 401) {
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
});
