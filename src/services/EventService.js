import axios from "axios";
import UserService from "./UserService";

const BASE_URL = "http://localhost:8080";
const EVENT_BASE_URL =  "/api/courses/";
const config = UserService.config();

class EventService {

  saveEvent(event) {
    return this.post(EVENT_BASE_URL + "addEvent", event);
  }

  getEvents(isAdmin) {
    return this.get(isAdmin ? EVENT_BASE_URL + "events" : '/api/my/events');
  }

  deleteEvent(id) {
    return this.delete(EVENT_BASE_URL + "events/" + id);
  }

  getEventById(id) {
    return this.get(EVENT_BASE_URL + "events/" + id);
  }

  updateEvent(event, id) {
    return this.update(EVENT_BASE_URL + "events/" + id, event);
  }

  getEventsByCourseId(courseId) {
    return this.get(EVENT_BASE_URL + "/courseEvents?courseId=" + courseId);
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
 
export default new EventService();
