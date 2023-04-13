import axios from "axios";
import UserService from "./UserService";

const BASE_URL = "http://localhost:8080";
const COURSE_BASE_URL = "/api/courses/";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTYWphbiIsImlhdCI6MTY4MDQ1NjgxNywiZXhwIjoxNjgwNTQzMjE3fQ.JD-8IgHxKPsMTdZQPEmwG6U-qdVbbVW6Zypm1WQWLeQEgYL6Nv3efT5_0-LX-91oKH8ximf2U9VRIXHqC4qvog";
const config = UserService.config();

class CourseService {
  saveCourse(employee) {
    return this.post(COURSE_BASE_URL, employee);
  }

  getCourses(isAdmin) {
    return this.get(isAdmin ? COURSE_BASE_URL : '/api/my/courses');
  }

  deleteCourse(id) {
    return this.delete(COURSE_BASE_URL + id);
  }

  getCourseById(id) {
    return this.get(COURSE_BASE_URL + id);
  }

  updateCourse(course, id) {
    return this.update(COURSE_BASE_URL + id, course);
  }

  getEnrolledUsers(id) {
    return this.get(`${COURSE_BASE_URL}getUsers/${id}`);
  }

  addUserToCourse(enrolledUsers) {
    return this.post(`${COURSE_BASE_URL}addUsersToCourse`, enrolledUsers);
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

export default new CourseService();
