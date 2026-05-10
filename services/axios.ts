import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosApi.interceptors.request.use((request) => {
  const fullUrl = [request.baseURL, request.url].filter(Boolean).join("");
  console.log("→ REQUEST:", request.method?.toUpperCase(), fullUrl);
  return request;
});

axiosApi.interceptors.response.use(
  (response) => {
    console.log("✓ RESPONSE:", response.status, response.config?.url);
    return response;
  },
  (error) => {
    console.log(
      "✗ ERROR:",
      error.response?.status,
      error.config?.url,
      error.message,
    );
    return Promise.reject(error);
  },
);

export default axiosApi;
