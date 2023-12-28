import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../assets/evaluate/CloseButton.png'
import {getAllList} from "../../apis/Evaluate/SideBarApi"
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../atom';
import { useNavigate } from 'react-router-dom';
import { check } from 'prettier';
function SideBar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const outside = useRef<any>(); 
  const accessToken = useRecoilValue(accessTokenAtom);
  const [planningApplicants, setPlanningApplicants] = useState<any[]>([]);
  const [designApplicants, setDesignApplicants] = useState<any[]>([]);
  const [frontendApplicants, setFrontendApplicants] = useState<any[]>([]);
  const [backendApplicants, setBackendApplicants] = useState<any[]>([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState("")
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  }); 
  useEffect(()=>{
    const fetchApplicants = async()=>{
      const planningData = await getAllList("PM", accessToken);
      const designData = await getAllList("DESIGN", accessToken);
      const frontendData = await getAllList("FRONTEND", accessToken);
      const backendData = await getAllList("BACKEND", accessToken);
      if (planningData && planningData.applicants){
        setPlanningApplicants(planningData.applicants);
      }
      if (designData && designData.applicants){
        setDesignApplicants(designData.applicants);
      }
      if (frontendData && frontendData.applicants){
        setFrontendApplicants(frontendData.applicants);
      }
      if(backendData && backendData.applicants){
        setBackendApplicants(backendData.applicants);
      }
    };
    fetchApplicants();
  },[])
  const handlerOutsie = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  }; 
  const toggleSide = () => {
    setIsOpen(false);
  };  
  const handleChange = (applicantId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked("");
    if (event.target.checked){
      setChecked(applicantId)
      navigate(`/evaluate/${applicantId}`)
    }
  };
  return (
    <SideBarWrap id="sidebar" ref={outside} className={isOpen ? 'open' : ''}>
      
      <ApplicantList>지원자 목록
      <img
        src={CloseButton}
        alt="close"
        onClick={toggleSide}
        onKeyDown={toggleSide}
      />
      </ApplicantList>
      <ApplicantByPart>
        <Part>기획
          <ScrollBox>{planningApplicants.map((applicant, idx)=>(
              <div key={idx} onClick={() => navigate(`/evaluate/${applicant.id}`)}>{applicant.name}</div>
            ))}</ScrollBox>
          {planningApplicants.map((applicant)=>(
            <NameTag key = {applicant.id}>{applicant.name}
            <input type="checkbox" checked={checked === applicant.id}
            onChange={handleChange(applicant.id)} />
          </NameTag>
          ))}    
        </Part>
        <Part>디자인
          {designApplicants.map((applicant)=>(
            <NameTag key={applicant.id}>{applicant.name}
            <input type="checkbox" checked={checked === applicant.id}
            onChange={handleChange(applicant.id)} />
            </NameTag>
          ))}          
        </Part>
        <Part>프론트엔드
          {frontendApplicants.map((applicant)=>(
            <NameTag key={applicant.id}>{applicant.name}
            <input type="checkbox" checked={checked === applicant.id}
            onChange={handleChange(applicant.id)} />
            </NameTag>
          ))}          
        </Part>
        <Part>백엔드
          {backendApplicants.map((applicant)=>(
            <NameTag key={applicant.id}>{applicant.name}
            <input type="checkbox" checked={checked === applicant.id}
            onChange={handleChange(applicant.id)} />
            </NameTag>
          ))}
          
        </Part>
      </ApplicantByPart>
    </SideBarWrap>
  );
} 
export default SideBar;
const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  overflow-y: scroll;
  height: 10rem;
  /* border: 1px solid blue; */
  margin-left: 0.5rem;
  gap: 0.5rem;
  & > div{
    &:hover{
      cursor: pointer;
    }
  }
`
const SideBarWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 200px;
height: 1300px;
top: 80px;

background: #FFFFFF;
  z-index: 5;
  padding: 12px;
  border-radius: 0px 15px 15px 0px;
  left: -55%;
  
  position: absolute;
  transition: 0.5s ease;
  &.open {
    left: 0;
    transition: 0.2s ease;
  }
`;
const ApplicantList = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 10px;
gap: 20px;
width: 150px;
height: 44px;
background: #FFFFFF;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
/* identical to box height */
text-align: center;

color: #000000;
`;

const ApplicantByPart = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 0px 10px;
gap: 20px;

height: 946px;
`;
const Part = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
gap: 12px;

width: 150px;
background: #DDDDDD;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
/* identical to box height */
text-align: center;

color: #000000;

`;
const NameTag = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 150%;
/* identical to box height, or 20px */

color: #000000;


`;
const CheckBox = styled.div`
/* Vector */

position: absolute;
left: 16.67%;
right: 16.67%;
top: 16.67%;
bottom: 16.67%;

background: #000000;

`;



