import axios from "axios";

export const createService = async (token, data) =>
  await axios.post(`http://localhost:8080/create-service`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allServices = async () =>
  await axios.get(`http://localhost:8080/services`);

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellerServices = async (token) =>
  await axios.get(`http://localhost:8080/seller-services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteService = async (token, serviceId) =>
  await axios.delete(`http://localhost:8080/delete-service/${serviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const read = async (serviceId) =>
  await axios.get(`http://localhost:8080/service/${serviceId}`);

export const updateService = async (token, data, serviceId) =>
  await axios.put(
    `http://localhost:8080/update-service/${serviceId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const msgPoster = async (token, serviceId, person) =>
  await axios.post(
    `http://localhost:8080/msg-poster/${serviceId}`,
    person,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
