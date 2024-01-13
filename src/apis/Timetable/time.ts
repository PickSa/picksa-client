import axios from "axios";

export const baseUrl = 'https://picksa-server.o-r.kr';
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