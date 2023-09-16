import axios from "axios";

export const getIPData = async () => {
  const res = await axios.get("https://api.ipify.org/?format=json");
  return res.data.ip;
};
