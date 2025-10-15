import axios from "axios";

//API DIISI SESUAI IP DI KOMPUTER

//WIFI Modem
// const API_URL = "http://10.1.51.114:5255/";

//WIFI Astra
//export const API_URL = "http://10.1.5.2:5255/";

// WIFI Zidan
//export const API_URL = "http://10.127.212.240:5255/";

export const API_URL = "https://sia-pt.polytechnic.astra.ac.id/stn-air/";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // lebih longgar
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const postUser = async (param, body = {}) => {
  try {
    const response = await apiClient.post(`api/${param}`, body);
    console.log("✅ API success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API call failed:", error.message);
    console.error("Code:", error.code);
    if (error.response) {
      console.error("Response:", error.response.data);
    }
    throw error;
  }
};
