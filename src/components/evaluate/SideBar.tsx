import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../assets/evaluate/CloseButton.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenAtom, paramsState, applicantNameState } from '../../atom';
import { LionListType } from '../../dummy/datatypes';
import { getPartLists } from '../../apis/lionlist';
import { useNavigate, useParams } from 'react-router-dom';
const SideBar= ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any })=> {
  const navigate = useNavigate();
  const params = useParams();
  const outside = useRef<any>(); 
  const accessToken = useRecoilValue(accessTokenAtom);
  const [checkedId, setCheckedId] = useState<number|null>(null);
  const [idParams, setIdParams] = useRecoilState(paramsState);
  const [applicantName, setApplicantName] = useRecoilState(applicantNameState);
  const [pmList, setPmList] = useState<LionListType[]>();
  const [designList, setDesignList] = useState<LionListType[]>();
  const [feList, setFeList] = useState<LionListType[]>();
  const [beList, setBeList] = useState<LionListType[]>();
  const getPartListApi = async(part:string)=>{
    const result = await getPartLists(part, "", accessToken)
      if(result){
        if(part === "PM"){
          setPmList(result.applicants)          
        }
        else if(part === "DESIGN"){setDesignList(result.applicants)}
        else if(part === "FRONTEND"){setFeList(result.applicants)}
        else {setBeList(result.applicants)}
      }
      // console.log(pmList);
  }
  useEffect(()=>{
    getPartListApi("PM");
    getPartListApi("DESIGN");
    getPartListApi("FRONTEND");
    getPartListApi("BACKEND");
  },[])
  const toggleSide = () => {
    setIsOpen(false);
  };  
  const handlerOutsie = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  }; 
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  }); 
  const handleCheckboxChange = (personId:number, personName:string)=> {
    setIsOpen(false); 
    
    
    navigate(`/evaluate/${personId}`)
    setCheckedId(personId);   
    if(params.id){
      setIdParams(params.id);
      setApplicantName(personName);
      // console.log(idParams);
      // console.log(applicantName);
    }
  }
  return (
    <SideBarWrap id="sidebar" ref={outside} className={isOpen ? 'open' : ''}>      
      <ApplicantList>지원자 목록
      <img
        src={CloseButton}
        alt="close"
        onClick={toggleSide}
        onKeyDown={toggleSide}/>
      </ApplicantList>
      {pmList && designList && feList && beList &&
      <ApplicantByPart>
        <Part>기획
        <ScrollBox>{pmList.map((person, idx)=>(
          <label htmlFor={`checkbox${idx}`}>{person.name}{person.id}
              <input 
              type="checkbox" 
              id={`checkbox${idx}`}
              checked={person.applicantId === checkedId}
              onChange={()=>handleCheckboxChange(person.applicantId, person.name)}/>
              </label>            
            ))}</ScrollBox>
        </Part>
        <Part>디자인
        <ScrollBox>{designList.map((person, idx)=>(
          <label htmlFor={`checkbox${idx}`}>{person.name}
              <input 
              type="checkbox" 
              id={`checkbox${idx}`}
              checked={person.applicantId === checkedId}
              onChange={()=>handleCheckboxChange(person.applicantId, person.name)}/>
              </label>            
            ))}</ScrollBox>
        </Part>
        <Part>프론트엔드
        <ScrollBox>{feList.map((person, idx)=>(
          <label htmlFor={`checkbox${idx}`}>{person.name}
              <input 
              type="checkbox" 
              id={`checkbox${idx}`}
              checked={person.applicantId === checkedId}
              onChange={()=>handleCheckboxChange(person.applicantId, person.name)}
              />
              </label>            
            ))}</ScrollBox> 
        </Part>
        <Part>백엔드
        <ScrollBox>{beList.map((person, idx)=>(
          <label htmlFor={`checkbox${idx}`}>{person.name}
              <input 
              type="checkbox" 
              id={`checkbox${idx}`}
              checked={person.applicantId === checkedId}
              onChange={()=>handleCheckboxChange(person.applicantId, person.name)}/>
              </label>            
            ))}</ScrollBox>          
        </Part>
      </ApplicantByPart>
      }
    </SideBarWrap>
  );
} 
export default SideBar;

const ScrollBox = styled.div`
font-family: 'Pretendard Variable';
font-weight: 500;
font-size: 13px;
line-height: 150%;
color: #000000;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  overflow-y: scroll;
  height: 20rem;
  width: 20rem;
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