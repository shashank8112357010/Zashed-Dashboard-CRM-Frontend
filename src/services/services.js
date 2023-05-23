import axios from "axios";
import { getToken } from "../helper/token.helper";
let backendapi = 'http://localhost:8080/api';


const config = {
  headers: {
    'Authorization': `Bearer ${getToken()}`,
  }
};

export const getClientUser = async () => {
  return await axios.get(`${backendapi}/user/getClients`,config);
};

export const login = async (body) => {
  return await axios.post(`${backendapi}/user/login`, body);
};
export const terms_Condition = async (token , body) => {
  return await axios.put(`${backendapi}/user/acceptTNC`, body ,{
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};

export const validateOTP = async (body) => {
  return await axios.post(`${backendapi}/user/generateOtp`, body)
}


export const changePassword = async (body) => {
  return await axios.post(`${backendapi}/user/resetPassword`, body)
}

export const createBrand = async (body) => {
  return await axios.post(`${backendapi}/brand/createBrand`, body, config)
}

export const getBrands = async () => {
  return await axios.get(`${backendapi}/brand/listBrands`, config)
}

export const getSalesCommission = async () => {
  return await axios.post(`${backendapi}/sales/totalCommission`,{} ,config)
}

export const getSalesRevenue = async () => {
  return await axios.post(`${backendapi}/sales/totalRevenue`,{}, config)
}

export const getSalesMonthOnMonth = async () => {
  return await axios.post(`${backendapi}/sales/monthlyRevenue`,{}, config)
}
