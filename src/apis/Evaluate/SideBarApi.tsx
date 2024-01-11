import axios from "axios";
import { baseUrl } from "../login";

export const getAllList = async(part:string, token:string) => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/applicants/list?part=${part}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
    } catch {
        return false;
    }
}