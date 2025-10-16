import axios from "axios";

//API DIISI SESUAI IP DI KOMPUTER

//WIFI Modem
// const API_URL = "http://10.1.51.114:5255/";

//WIFI Astra
export const API_URL = "http://10.1.19.29:5255/";

// WIFI Zidan
//export const API_URL = "http://10.127.212.240:5255/";

// export const API_URL = "https://sia-pt.polytechnic.astra.ac.id/stn-air/";

// Wifi Daffa
// export const API_URL = "http://192.168.1.9:5255/";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
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

export const postUserArray = async (param, body = {}) => {
  try {
    const response = await apiClient.post(`api/${param}`, body);
    let data = response.data;

    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
        // console.log("✅ API success:", response.data);
      } catch (parseError) {
        console.error("Error parsing data:", parseError);
        return "ERROR";
      }
    }

    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("❌ API response is not an array:", data);
      return "ERROR";
    }
  } catch (error) {
    console.error("❌ API call failed:", error.message);
    if (error.response) {
      console.error("Response:", error.response.data);
    }
    return "ERROR";
  }
};
