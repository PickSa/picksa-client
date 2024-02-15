import axios from "axios";
import { baseUrl } from "../login";

export const getInterviewee = async (accessToken: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/applicants/interview/schedules`, 
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      return response.data;
    } catch {
      console.log("false")
    }
  }
  export const getInterviewTime = async (accessToken: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/applicants/interview/schedules`, 
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      return response.data;
    } catch {
      console.log("false")
    }
  } 

  export const getSettedTime = async(accessToken:string) => {
    try{
      const response = await axios.get(`${baseUrl}/api/v1/interview/schedules`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      return response.data;
    } catch(error:any) {
      if(error.code === "ERR_NETWORK"){
          return "logout";
      } else {
          return false;
      }
  }
  }