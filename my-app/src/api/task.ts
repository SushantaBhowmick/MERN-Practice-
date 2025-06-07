import axios from "axios";
import { BaseUrl, type Task } from "../constant";

export async function getUserTasks(page:number,limit:number) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BaseUrl}/user/getTasks?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res) {
    return res.data;
  }
}

export async function createTask(data: Task) {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${BaseUrl}/task/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res) {
    return res.data;
  }
}

export async function getTaskById(id: number) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BaseUrl}/task/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res) {
    return res.data;
  }
}

export async function updateTask(data: Partial<Task>, id: number) {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${BaseUrl}/task/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res) {
    return res.data;
  }
}

export async function deleteTask(id: number) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${BaseUrl}/task/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res) {
    return res.data;
  }
}

export async function getAllTask(page: number, limit: number,search:string) {
  const token = localStorage.getItem("token");
  const res = await axios.get(
    `${BaseUrl}/task/getAll?page=${page}&limit=${limit}&search=${search}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (res) {
    return res.data;
  }
}
