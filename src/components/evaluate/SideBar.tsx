import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../assets/evaluate/CloseButton.png'
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../atom';
import { LionListType, NAVBARSIZE } from '../../dummy/datatypes';
import { getPartLists } from '../../apis/lionlist';
import { useNavigate, useParams } from 'react-router-dom';
const SideBar= (
  { isOpen, setIsOpen }: 
  { isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  })=> {
  const navigate = useNavigate();
  const params = useParams();
  const outside = useRef<any>(); 
  const accessToken = useRecoilValue(accessTokenAtom);
  const [pmList, setPmList] = useState<LionListType[]>();
  const [designList, setDesignList] = useState<LionListType[]>();
  const [feList, setFeList] = useState<LionListType[]>();
  const [beList, setBeList] = useState<LionListType[]>();

  const pageheight = window.innerHeight;

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
      <PeopleList $innerheight={pageheight} $navheight={NAVBARSIZE}>
      <PartWrapper>
        <div className='part-label'>{`기획 ${pmList.length}`}</div>
        <ScrollBox>{pmList.map((person, idx)=>(
          <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/evaluate/${person.applicantId}`)}>
            {person.name}
          </MemberStyle>
        ))}</ScrollBox>
      </PartWrapper>
      <PartWrapper>
        <div className='part-label'>{`디자인 ${designList.length}`}</div>
        <ScrollBox>{designList.map((person, idx)=>(
          <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/evaluate/${person.applicantId}`)}>
            {person.name}
          </MemberStyle>
        ))}</ScrollBox>
      </PartWrapper>
      <PartWrapper>
        <div className='part-label'>{`프론트엔드 ${feList.length}`}</div>
        <ScrollBox>{feList.map((person, idx)=>(
          <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/evaluate/${person.applicantId}`)}>
            {person.name}
          </MemberStyle>
        ))}</ScrollBox>
      </PartWrapper>
      <PartWrapper>
        <div className='part-label'>{`백엔드 ${beList.length}`}</div>
        <ScrollBox>{beList.map((person, idx)=>(
          <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/evaluate/${person.applicantId}`)}>
            {person.name}
          </MemberStyle>
        ))}</ScrollBox>
      </PartWrapper>
    </PeopleList>
      }
    </SideBarWrap>
  );
} 
export default SideBar;

const SideBarWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 20rem;
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
width: 100%;
height: 2.75rem;
margin-bottom: 1.8rem;
background: #FFFFFF;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 600;
font-size: 1.5rem;
line-height: 1.1875rem;
/* identical to box height */
text-align: center;
color: #000000;
border-bottom: 1px solid rgba(221, 221, 221, 1);
`;

const PeopleList = styled.div<{$innerheight:number, $navheight:number}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => `${props.$innerheight - props.$navheight - 50}px`};;
  background-color: white;
  gap: 1.8rem;
  & > .title{
    display: flex;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 500;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
  }
`

const PartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  & > .part-label{
    display: flex;
    font-size: 1.6rem;
    color: #A0A0A0;
    margin-bottom: 0.8rem;
  }
`

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  overflow-y: scroll;
  height: 10rem;
  /* border: 1px solid blue; */
  margin-left: 0.5rem;
  gap: 0.6rem;
`

const MemberStyle = styled.div<{$currentid:string, $memberid:string}>`
  display: flex;
  font-weight: ${props => props.$currentid === props.$memberid ? '600' : '400'};
  color: ${props => props.$currentid === props.$memberid ? '#0368FF' : 'black'};
  &:hover{
      cursor: pointer;
      color: #EAF1F9;
    }
`
