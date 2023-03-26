import axios from "axios";

const BASE_URL = "http://localhost:8080";
const EVENT_BASE_URL = BASE_URL +"/api/users/";

class EmployeeService {
  saveEmployee(employee) {
    return axios.post(EMPLOYEE_BASE_URL, employee);
  }

  getEmployees() {
    return axios.get(EMPLOYEE_BASE_URL);
  }

  deleteEmployee(id) {
    return axios.delete(EMPLOYEE_BASE_URL + "/" + id);
  }

  getEmployeeById(id) {
    return axios.get(EMPLOYEE_BASE_URL + "/" + id);
  }

  updateEmployee(employee, id) {
    return axios.put(EMPLOYEE_BASE_URL + "/" + id, employee);
  }
}
 
export default new EVENT_BASE_URL();
