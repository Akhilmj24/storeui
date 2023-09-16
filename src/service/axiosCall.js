import axios from "axios";
import { baseUrl } from "./api";
import { userinfo } from "./UserCheck";

export const postApi = async (data, url) => {
  const res = await axios.post(`${baseUrl}${url}`, data, {
    headers: {
      access_token: userinfo?.token,
    },
  });
  return res.data;
};
export const putApi = async (data, url) => {
  const res = await axios.put(`${baseUrl}${url}`, data, {
    headers: {
      access_token: userinfo?.token,
    },
  });
  return res.data;
};
export const getApi = async (url) => {
  const res = await axios.get(`${baseUrl}${url}`, {
    headers: {
      access_token: userinfo?.token,
    },
  });

  return res.data;
};
export const removeApi = async (url) => {
  const res = await axios.delete(`${baseUrl}${url}`, {
    headers: {
      access_token: userinfo?.token,
    },
  });
  return res.data;
};
