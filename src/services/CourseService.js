import axios from "axios";

const BASE_URL = "http://localhost:8080";
const COURSE_BASE_URL = BASE_URL +"/api/users/";

class CourseService {
  saveCourse(employee) {
    return axios.post(COURSE_BASE_URL, employee);
  }

  getCourses() {
    return axios.get(COURSE_BASE_URL);
  }

  deleteCourse(id) {
    return axios.delete(COURSE_BASE_URL + "/" + id);
  }

  getCourseById(id) {
    return axios.get(COURSE_BASE_URL + "/" + id);
  }

  updateCourse(course, id) {
    return axios.put(COURSE_BASE_URL + "/" + id, course);
  }
}
 
export default new CourseService();
