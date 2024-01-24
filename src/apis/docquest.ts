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
    } catch(error:any) {
        if(error.code === "ERR_NETWORK"){
            return "logout";
        } else {
            return false;
        }
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

export const patchfinalQuest = async(data:{id:number, isDetermined:boolean}[], token:string) => {
    try{
        const response = await axios.patch(`${baseUrl}/api/v1/questions/final`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}

export const getQuestForSort = async(part:string, token:string) => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/questions/final?part=${part}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}

export const patchReorder = async(data:{id:number, sequence:number}[], token:string) => {
    try{
        const response = await axios.patch(`${baseUrl}/api/v1/questions/reorder`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}