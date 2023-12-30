import axios from "axios";
import { baseUrl } from "./login";

export const getPartsTags = async(part:string, token:string) => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/tags?part=${part}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}

export const getAllQuests = async(part:string, order:string, token:string) => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/questions?part=${part}&order=${order}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}

export const deleteQuestion = async(id:number, token:string) => {
    try{
        const response = await axios.delete(`${baseUrl}/api/v1/questions/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}

export const makeQuests = async(tagId:number, content:string, token:string) => {
    const data = {
        "content": content,
        "tagId": tagId,
    }
    try{
        const response = await axios.post(`${baseUrl}/api/v1/questions`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}