import axios from "axios";
const BASE_URL = "http://localhost:8080";
const USER_BASE_URL = "/api/my/profile";
const config = {
  headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken') || ''}` }
};

class ProfileService {
    constructor() {
    }

    getProfile() {
        return this.get(USER_BASE_URL);
    }
    
    updateProfile(profile) {
        return this.update(USER_BASE_URL, profile);
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

export default new ProfileService();
