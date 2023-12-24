import axios from "axios";

export const baseUrl = 'https://picksa-server.o-r.kr';

export const getLoginLink = async() => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/auth`);
        // console.log(response.headers.location);
        return response.headers.location;
    } catch {
        return false;
    }
}

export const getToken = async(code:string) => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/auth/signin?code=${code}`);
        return response.data;
    } catch {
        return false;
    }
}

export const getUserName = async(token: string) => {
    try{
        const response = await axios.get(`${baseUrl}/api/v1/user`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return false;
    }
}