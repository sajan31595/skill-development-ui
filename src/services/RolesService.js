import axios from "axios";
import UserService from "./UserService";

const BASE_URL = "http://localhost:8080";
const ROLE_BASE_URL = "/api/users/";
const config = UserService.config();

class RolesService {
  getRoles() {
    return this.get(`${ROLE_BASE_URL}roles`);
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
 
export default new RolesService();
