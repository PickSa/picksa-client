import axios from "axios";
import { baseUrl } from "../login";

export const getInterviewSchedules = async (accessToken: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/applicants/interview/schedules`, 
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      console.log(response.data);
      return response.data;
    } catch {
      console.log("false")
    }
  }
  