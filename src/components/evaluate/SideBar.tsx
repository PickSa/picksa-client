import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../assets/evaluate/CloseButton.png'
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../atom';
import { LionListType } from '../../dummy/datatypes';
import { getPartLists } from '../../apis/lionlist';
import { useNavigate } from 'react-router-dom';
const SideBar= (
  { isOpen, currentId, setIsOpen }: 
  { isOpen: boolean;
    currentId: string|undefined;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  })=> {
  const navigate = useNavigate();
  const outside = useRef<any>(); 
  const accessToken = useRecoilValue(accessTokenAtom);
  const [checkedId, setCheckedId] = useState<number|null>(null);
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

  const handlerOutside = (e: MouseEvent) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  }; 

  useEffect(() => {
    document.addEventListener('mousedown', handlerOutside);
    return () => {
      document.removeEventListener('mousedown', handlerOutside);
    };
  }); 
  
  useEffect(() => {
    setCheckedId(Number(currentId));
  }, [currentId]);

  const handleCheckboxChange = (personId:number)=> {
    setIsOpen(false); 
    navigate(`/evaluate/${personId}`)
    setCheckedId(personId);   
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
              onChange={()=>handleCheckboxChange(person.applicantId)}/>
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
              onChange={()=>handleCheckboxChange(person.applicantId)}/>
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
              onChange={()=>handleCheckboxChange(person.applicantId)}
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
              onChange={()=>handleCheckboxChange(person.applicantId)}/>
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
font-size: 0.8125rem;
line-height: 150%;
color: #000000;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  overflow-y: scroll;
  height: 20rem;
  width: 25rem;
  /* border: 1px solid blue; */
  gap: 0.375rem;
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
width: 30rem;
top: 5rem;
background: #FFFFFF;
  z-index: 100;
  padding: 0.75rem;
  border-radius: 0px 0.9375rem 0.9375rem 0px;
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
padding: 0.625rem;
gap: 1.25rem;
width: 20rem;
height: 2.75rem;
background: #FFFFFF;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 600;
font-size: 1.5rem;
line-height: 1.1875rem;
/* identical to box height */
text-align: center;
color: #000000;
`;

const ApplicantByPart = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 0px 0.625rem;
gap: 1.25rem;
width: 30rem;
`;
const Part = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 1rem;
gap: 1.2rem;
width: 20rem;
background: #DDDDDD;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 600;
font-size: 1.5rem;
line-height: 1.1875rem;
text-align: center;
color: #000000;
`;
