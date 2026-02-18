import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const userAPI = {
  register: (userData) => axios.post(`${API_URL}/users/register`, userData),
  login: (credentials) => axios.post(`${API_URL}/users/login`, credentials),
  getAllUsers: () => axios.get(`${API_URL}/users`)
};

export const flightAPI = {
  search: (params) => axios.get(`${API_URL}/flights/search`, { params }),
  getAll: () => axios.get(`${API_URL}/flights`),
  getById: (id) => axios.get(`${API_URL}/flights/${id}`),
  create: (flightData) => axios.post(`${API_URL}/flights`, flightData),
  update: (id, flightData) => axios.put(`${API_URL}/flights/${id}`, flightData),
  delete: (id) => axios.delete(`${API_URL}/flights/${id}`)
};

export const bookingAPI = {
  create: (bookingData) => axios.post(`${API_URL}/bookings`, bookingData),
  getUserBookings: (userId) => axios.get(`${API_URL}/bookings/user/${userId}`),
  getAll: () => axios.get(`${API_URL}/bookings`),
  cancel: (id) => axios.patch(`${API_URL}/bookings/${id}/cancel`)
};
