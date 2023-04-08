import axios from "axios";
const BASE_URL = "http://localhost:8080";
const USER_BASE_URL = "/api/users/";
const config = {
  headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken') || ''}` }
};

class UserService {
    constructor() {
    }
    
    saveUser(user) {
        return this.post(USER_BASE_URL, user);
    }

    getUsers() {
        return this.get(USER_BASE_URL);
    }

    deleteUser(id) {
        return this.delete(USER_BASE_URL + id);
    }

    getUserById(id) {
        return this.get(USER_BASE_URL + id);
   }

    updateUser(user, id) {
        return this.update(USER_BASE_URL + id, user);
    }

    async loginUser(loginDetail) {
        const response = await this.post("/api/auth/signin", loginDetail);
        window.sessionStorage.setItem('accessToken', response.data.accessToken);
        config.headers.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`;
        const profileData = await this.get("/api/my/profile");
        return profileData;
    }

    post(url, body) {
          return axios.post(BASE_URL + url, body, config);
    }

    get(url) {
        return axios.get(BASE_URL + url, config);
    }

    update(url, body) {
        return axios.put(BASE_URL + url, body, config);
    }

    delete(url) {
        return axios.delete(BASE_URL + url, config);
    }
}

export default new UserService();
