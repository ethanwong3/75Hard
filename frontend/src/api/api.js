// api.js
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// axios interceptor to automatically add token to requests

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Error Handling

const handleApiError = (e) => {
  if (e.response) {
    console.error("API Error:", e.response.data.error);
    return {
      success: false,
      error: e.response.data.error,
      status: e.response.status,
    };
  } else if (e.request) {
    console.error("Network Error:", e.request);
    return {
      success: false,
      error: "Network error, please try again.",
      status: null,
    };
  } else {
    console.error("Unexpected Error:", e.message);
    return {
      success: false,
      error: "Unexpected error, please try again.",
      status: null,
    };
  }
};

// User registration

export const userRegister = async (userData) => {
  try {
    const res = await API.post(`${API_URL}/users/register`, userData);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
};

// User login

export const userLogin = async (userAuthDetails) => {
  try {
    const res = await API.post(`${API_URL}/users/login`, userAuthDetails);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
};

// User logout

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("token");
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout Error:", error);
    return { success: false, error: "Failed to log out." };
  }
};

// Fetch user data (with token)

export const userFetch = async (userId) => {
  try {
    const res = await API.get(`/users/${userId}`);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
};

// Update user data

export const userUpdate = async (userId, userData) => {
  try {
    const res = await API.patch(`/users/${userId}`, userData);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
};

// Fetch challenge for a user

export const fetchChallenge = async (userId) => {
  try {
    const response = await API.get(`${API_URL}/challenges/${userId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
