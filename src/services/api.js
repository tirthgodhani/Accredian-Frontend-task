import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createReferral = async (referralData) => {
  try {
    const response = await api.post('/referrals', referralData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
