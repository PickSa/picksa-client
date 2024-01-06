import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../assets/evaluate/CloseButton.png'
import {getAllList} from "../../apis/Evaluate/SideBarApi"
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../atom';
import { useNavigate, Link } from 'react-router-dom';
function SideBar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const outside = useRef<any>(); 
  const accessToken = useRecoilValue(accessTokenAtom);
  const [planningApplicants, setPlanningApplicants] = useState<any[]>([]);
  const [designApplicants, setDesignApplicants] = useState<any[]>([]);
  const [frontendApplicants, setFrontendApplicants] = useState<any[]>([]);
  const [backendApplicants, setBackendApplicants] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
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
      console.log(planningData);
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
          <>
          <Link to={`/evaluate/${applicant.id}`}>
          <label htmlFor={`checkbox${idx}`}>{applicant.name}
              <input type="checkbox" key={idx} id={`checkbox${idx}`}/>
              </label>
              </Link>              
              </>
            ))}</ScrollBox>
        </Part>
        <Part>디자인
        <ScrollBox>{designApplicants.map((applicant, idx)=>(
          <>
          <Link to={`/evaluate/${applicant.id}`}>
          <label htmlFor={`checkbox${idx}`}>{applicant.name}
              <input type="checkbox" key={idx} id={`checkbox${idx}`} />
              </label>    
              </Link>   
              </>
            ))}</ScrollBox>
        </Part>
        <Part>프론트엔드
        <ScrollBox>{frontendApplicants.map((applicant, idx)=>(
          <>
          <Link to={`/evaluate/${applicant.id}`}>
          <label htmlFor={`checkbox${idx}`} onClick={() => navigate(`/evaluate/${applicant.id}`)}>{applicant.name}
              <input type="checkbox" key={idx} id={`checkbox${idx}`} />
              </label>    
              </Link>   
              </>              
            ))}</ScrollBox>     
        </Part>
        <Part>백엔드
        <ScrollBox>{backendApplicants.map((applicant, idx) => (
  <>
    <Link to={`/evaluate/${applicant.id}`}>
      <label htmlFor={`checkbox${idx}`} onClick={() => navigate(`/evaluate/${applicant.id}`)}>{applicant.name}
        <input 
          type="checkbox" 
          key={idx} 
          id={`checkbox${idx}`} 
          checked={checkedItems === applicant.id}
          onChange={(e) => setCheckedItems(applicant.id)}
        />
      </label>  
    </Link>     
  </>
))}</ScrollBox>
        </Part>
      </ApplicantByPart>
    </SideBarWrap>
  );
} 
export default SideBar;
const ScrollBox = styled.div`
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 150%;
color: #000000;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  overflow-y: scroll;
  height: 30rem;
  width: 250px;
  /* border: 1px solid blue; */
  gap: 0.6rem;
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
width: 300px;
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
width: 250px;
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
width: 280px;
`;
const Part = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
gap: 12px;

width: 250px;
background: #DDDDDD;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
text-align: center;
color: #000000;

`;



