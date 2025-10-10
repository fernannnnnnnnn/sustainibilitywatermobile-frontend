import axios from "axios";

//API DIISI SESUAI IP DI KOMPUTER

//WIFI Modem
// const API_URL = "http://10.1.51.114:5255/";

//WIFI Astra
//export const API_URL = "http://10.1.5.2:5255/";

// WIFI Zidan
//export const API_URL = "http://10.127.212.240:5255/";

export const API_URL = "https://sia-pt.polytechnic.astra.ac.id/stn-air/";

const apiClient = axios.create({ baseURL: API_URL, timeout: 1000 });

// POST tanpa body / untuk get all data
export const postUser = async (param, body = {}) => {
  try {
    const response = await apiClient.post(`api/${param}`, body);

    // Jika berhasil, log data yang diterima
    console.log("API call success. Data received:", response.data);

    return response.data;
  } catch (error) {
    // Jika gagal, log pesan error dan detail respons jika ada
    console.error("API call failed.");
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Status code:", error.response.status);
    }

    throw error;
  }
};
