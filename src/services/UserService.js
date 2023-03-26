import axios from "axios";

const BASE_URL = "http://localhost:8080";
const USER_BASE_URL = BASE_URL +"/api/users/";

class UserService {
  saveUser(user) {
    return axios.post(USER_BASE_URL, user);
  }

  getUsers() {
    return axios.get(USER_BASE_URL);
  }

  deleteUser(id) {
    return axios.delete(USER_BASE_URL + id);
  }

  getUserById(id) {
    return axios.get(USER_BASE_URL + id);
  }

  updateUser(user, id) {
    return axios.put(USER_BASE_URL + id, user);
  }

  loginUser(loginDetail){
    return axios.post(BASE_URL + "/api/auth/signin",loginDetail).then((response)=>response.data);
  }
}
 
export default new UserService();
