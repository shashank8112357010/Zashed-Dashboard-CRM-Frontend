import axios from "axios";
let backendapi= 'http://localhost:8080/api/'

export const login =  (body) => {
    return  axios.post(`${backendapi + '/user/login'}` , body);
  };