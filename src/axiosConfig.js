import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('accessToken');

const apiClient = axios.create({
    baseURL:"http://localhost:8080/api/v1"
});

if(token){
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default apiClient;