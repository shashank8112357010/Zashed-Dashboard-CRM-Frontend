import axios from "axios";
let backendapi= 'http://localhost:8080/api/user'

export const login =  async(body) => {
    return await axios.post(`${backendapi}/login` , body);
  };

  export const validateOTP = async(body)=>{
    return await axios.post(`${backendapi}/generateOtp` , body)
  }

  export const changePassword = async(body)=>{
    return await axios.post(`${backendapi}/resetPassword` , body)
  }