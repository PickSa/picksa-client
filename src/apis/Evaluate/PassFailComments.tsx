import axios from "axios";
import { baseUrl } from "../login";

//리뷰 전체 정보 받기
export const postEvaluation = async (id: string, passSelected:boolean, texts: string, accessToken: string) => {
    const requestBody = {
      pass: passSelected,
      comment: texts,
    };
    try{
        const response = await axios.post(`${baseUrl}/api/v1/evaluations/${id}`, 
        requestBody, {
          headers: {
            "Authorization" : `Bearer ${accessToken}`
          },
        });
        console.log(response.data);
        return response.data;
    }catch{
      console.log("false")
    }
}
export const patchEvaluation = async(id: number, passSelected:boolean, texts: string, accessToken: string) => {
    const requestBody = {
      pass: passSelected,
      comment: texts,
    };
    try{
        const response = await axios.patch(`${baseUrl}/api/v1/evaluations/${id}`, 
        requestBody, {
          headers: {
            "Authorization" : `Bearer ${accessToken}`
          },
        });
        return response.data;
    }catch(error){
      console.error(error);
      return error
    }
}
//다른 운영진의 평가 조회가능. 
export const getEvalOthers = async (applicant_id: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/evaluations/applicant/${applicant_id}`, 
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    console.log(response.data);
    return response.data;
  } catch {
    console.log("false")
  }
}

//지원자 평가 현황 조회
export const getPassFail = async (applicant_id: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/evaluations/final/${applicant_id}`, 
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    console.log(response.data);
    return response.data;
  } catch {
    console.log("false")
  }
}
//파트장이 결정하는 합불 결과
export const patchLeaderPassFail = async (applicant_id: string, 
  accessToken: string, result: string) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/v1/evaluations/final/${applicant_id}`,
      { 
        "result" : result 
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(accessToken);
    console.log(result);
    console.log(applicant_id);
    console.log(error);
    return false;
  }
};
