import axios from "axios";
import { BaseUrl } from "../constant";

export const removeCartItem = async (address: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${BaseUrl}/order/create`,{address},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return res.data;
};