import axios from "axios";
import UserService from "./UserService";

const BASE_URL = "http://localhost:8080";
const TODO_BASE_URL = BASE_URL +"/api/todo/";
const config = UserService.config();

class TodoService {
  saveTodo(todo) {
    return axios.post(TODO_BASE_URL, todo, config);
  }

  getTodos() {
    return axios.get(TODO_BASE_URL, config);
  }

  deleteTodo(id) {
    return axios.delete(TODO_BASE_URL + id, config);
  }

  getTodoById(id) {
    return axios.get(TODO_BASE_URL + id, config);
  }

  updateTodo(employee, id) {
    return axios.put(TODO_BASE_URL + id, employee, config);
  }
}
 
export default new TodoService();
