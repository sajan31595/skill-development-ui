import axios from "axios";

const BASE_URL = "http://localhost:8080";
const TODO_BASE_URL = BASE_URL +"/api/todo/";

class TodoService {
  saveTodo(todo) {
    return axios.post(TODO_BASE_URL, todo);
  }

  getTodos() {
    return axios.get(TODO_BASE_URL);
  }

  deleteTodo(id) {
    return axios.delete(TODO_BASE_URL + id);
  }

  getTodoById(id) {
    return axios.get(TODO_BASE_URL + id);
  }

  updateTodo(employee, id) {
    return axios.put(TODO_BASE_URL + id, employee);
  }
}
 
export default new TodoService();
