import axios from "axios"
import { BaseUrl } from "../constant"


export async function loginUser(email:string,password:string){
    const res = await axios.post(`${BaseUrl}/auth/login`,{email,password},{
        headers:{"Content-Type":"application/json"}
    });
    if(res){
        localStorage.setItem("token",res.data.token);
        return res.data;
    }
}

export async function registerUser(name:string,email:string,password:string){
    const res = await axios.post(`${BaseUrl}/auth/register`,{name,email,password},{
        headers:{"Content-Type":"application/json"}
    });
    if(res){
        localStorage.setItem("token",res.data.token);
        return res.data;
    }
}

export async function loadUser(){
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BaseUrl}/user/profile`,{
        headers:{Authorization: `Bearer ${token}`}
    });
    if(res){
        return res.data;
    }
}