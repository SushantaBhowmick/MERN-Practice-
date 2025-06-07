


import axios from "axios";
import { BaseUrl } from "../constant";

export const checkOutSession = async (address: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${BaseUrl}/payment/create-checkout-session`,{address},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return res.data;
};