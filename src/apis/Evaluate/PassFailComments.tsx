import axios from "axios";
export const baseUrl = 'https://picksa-server.o-r.kr';

//리뷰 전체 정보 받기
export const postEvaluation = async (applicant_id: string, 
  passSelected:boolean, texts: string, accessToken: string) => {
    const requestBody = {
      pass: passSelected,
      comment: texts,
    };
    try{
        const response = await axios.post(`${baseUrl}/api/v1/evaluations/${applicant_id}`, 
        requestBody, {
          headers: {
            "Authorization" : `Bearer ${accessToken}`
          },
        });
        return response.data;
    }catch{
      console.log("false")
    }
}
export const patchEvaluation = async (evaluationId: string, 
  passSelected:boolean, texts: string, accessToken: string) => {
    const requestBody = {
      pass: passSelected,
      comment: texts,
    };
    try{
        const response = await axios.post(`${baseUrl}/api/v1/evaluations/${evaluationId}`, 
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
//지원자 id를 통해 한 지원자에 대한 다른 운영진의 평가를 조회가능. 
export const getEvalOthers = async (applicant_id: string) => {
  try {
      const response = await axios.get(
        `${baseUrl}/api/v1/evaluations/applicant/${applicant_id}`);
      console.log(response.data);
  } catch{
    console.log("false")
  }
}
//지원자 평가 현황 조회
export const getPassFail = async (applicant_id: string) => {
  try {
      const response = await axios.get(
        `${baseUrl}/api/v1/evaluations/final/${applicant_id}`);
      console.log(response.data);
  } catch{
    console.log("false")
  }
}
//파트장이 결정하는 합불 결과
export const patchLeaderPassFail = async (applicant_id: string, accessToken: string,
  result: string) => {
  try {
      const response = await axios.patch
      (`${baseUrl}/api/v1/evaluations/final/${applicant_id}`,
      {result},
      {headers: {Authorization: `Bearer ${accessToken}`}});      
      console.log(response.data);
      return response.data;
  } catch(error){
    console.log(error);
    return false;
  }
}