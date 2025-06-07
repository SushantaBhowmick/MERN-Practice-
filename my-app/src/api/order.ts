import axios from "axios";
import { BaseUrl } from "../constant";

export const getUserOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${BaseUrl}/order/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return res.data;
};