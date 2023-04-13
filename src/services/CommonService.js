import axios from "axios";
import UserService from "./UserService";

const BASE_URL = "http://localhost:8080";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTYWphbiIsImlhdCI6MTY4MDQ1NjgxNywiZXhwIjoxNjgwNTQzMjE3fQ.JD-8IgHxKPsMTdZQPEmwG6U-qdVbbVW6Zypm1WQWLeQEgYL6Nv3efT5_0-LX-91oKH8ximf2U9VRIXHqC4qvog";
const config = UserService.config();

class CommonService {
    isAdmin() {
        const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
        const roles = profileData.roles || [];
        return (roles.includes('ADMIN') || roles.includes('INSTRUCTOR'));
    }

    post(url, body) {
        return axios.post(BASE_URL + url, body, config);
    }

    get(url) {
        return axios.get(BASE_URL + url, config);
    }

    update(url, id, body) {
        axios.put(BASE_URL + url + id, body, config);
    }

    delete(url, id) {
        return axios.delete(BASE_URL + url + id, config);
    }
}

export default new CommonService();