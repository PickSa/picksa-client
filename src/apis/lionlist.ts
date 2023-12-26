import axios from "axios"
import { baseUrl } from "./login"

export const getAllLists = async(order:string, token:string) => {
    try{
        if(order === "") {
            const response = await axios.get(`${baseUrl}/api/v1/applicants/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } else {
            const response = await axios.get(`${baseUrl}/api/v1/applicants/all?order=${order}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }
    } catch {
        return false;
    }
}

export const getPartLists = async(part:string, order:string, token:string) => {
    try{
        if(order === "") {
            const response = await axios.get(`${baseUrl}/api/v1/applicants/list?part=${part}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } else {
            const response = await axios.get(`${baseUrl}/api/v1/applicants/all?part=${part}&order=${order}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }
    } catch {
        return false;
    }
}

export const getLionDetail = async(id:string, token:string) => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/applicants/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}