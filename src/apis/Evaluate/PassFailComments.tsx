import axios from "axios";
export const baseUrl = 'https://picksa-server.o-r.kr';

//리뷰 전체 정보 받기
export const postEvaluation = async (applicant_id: string, 
  managerId: string, passSelected:boolean, texts: string) => {
    const requestBody = {
      pass: passSelected,
      comment: texts,
    };
    try{
        const response = await axios.post(`${baseUrl}/api/v1/evaluations/{applicant_id}`, 
        requestBody, {
          headers: {managerId},
        });
        return response.data;
    }catch(error){
      if (error.response && error.response.status === 400){
        throw new Error(error.response.data.message);
      }else {
        throw new Error("알수 없는 에러가 발생했습니다.")
      }
    }
}
