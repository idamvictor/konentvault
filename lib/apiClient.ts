import axios from "axios";
import useAuthStore from "@/store/auth-store";

const { clearToken } = useAuthStore.getState(); // Directly access store functions

const apiURL = "https://sp.konentvault.net.ng/api/";
// http://sp.konentvault.net.ng
const apiClient = axios.create({
  baseURL: apiURL,
  timeout: 60000,
});

apiClient.interceptors.request.use(
  (config) => {
    // Retrieve accessToken dynamically to ensure the latest value is used
    const accessToken = useAuthStore.getState().accessToken;

    // console.log("accessToken", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (!response) {
      console.error("Network error from client:", error);
      return Promise.reject(error);
    }

    if (
      response.status === 401 ||
      response?.data?.message === "Access denied. No token provided."
    ) {
      // try {
      //     const newToken = await refreshToken(); // Attempt token refresh

      //     if (newToken) {
      //         sessionStorage.setItem("accessToken", newToken);
      //         config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${newToken}`;
      //         return apiClient(config); // Retry request with new token
      //     }
      // } catch (refreshError) {
      //     clearToken(); // Log out user if refresh fails
      //
      // }
      console.error("Session expired. Logging out.");
      clearToken();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
