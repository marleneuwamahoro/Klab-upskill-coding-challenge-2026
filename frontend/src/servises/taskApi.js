import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks/";

export const getTasks = (status = "") => {
  const params = status ? { status } : {};
  return axios.get(API_URL, { params });
};

export const getTask = (id) => {
  return axios.get(`${API_URL}${id}/`);
};

export const createTask = (task) => {
  return axios.post(API_URL, task);
};

export const updateTask = (id, task) => {
  return axios.put(`${API_URL}${id}/`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};