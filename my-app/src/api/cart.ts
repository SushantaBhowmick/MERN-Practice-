import axios from "axios";
import { BaseUrl } from "../constant";

export const addToCart = async (productId: number, quantity: number = 1) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${BaseUrl}/cart/add-item`,
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getCart = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${BaseUrl}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateCartIem = async (itemId: number, quantity: number) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${BaseUrl}/cart/${itemId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const removeCartItem = async (itemId: number) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${BaseUrl}/cart/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
