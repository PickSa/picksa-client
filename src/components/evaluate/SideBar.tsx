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
          if(result === "logout"){
            alert("토큰이 만료되었습니다. 로그아웃 후 다시 로그인해주세요.");
            navigate("/");
          } else {
            setPmList(result.applicants);
          }        
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

  const handleMemberClick = (id:number) => {
    navigate(`/evaluate/${id}`);
    toggleSide();
  }

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
            <div className='part-label'>
              <div>기획</div>
              <div className='part-num'>
                {pmList.length}
              </div>
            </div>
            <ScrollBox>{pmList.map((person, idx)=>(
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => handleMemberClick(person.applicantId)}>
                {person.name}
              </MemberStyle>
            ))}</ScrollBox>
          </PartWrapper>
          <PartWrapper>
          <div className='part-label'>
              <div>디자인</div>
              <div className='part-num'>
                {designList.length}
              </div>
            </div>
            <ScrollBox>{designList.map((person, idx)=>(
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => handleMemberClick(person.applicantId)}>
                {person.name}
              </MemberStyle>
            ))}</ScrollBox>
          </PartWrapper>
          <PartWrapper>
            <div className='part-label'>
              <div>프론트엔드</div>
              <div className='part-num'>
                {feList.length}
              </div>
            </div>
            <ScrollBox>{feList.map((person, idx)=>(
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => handleMemberClick(person.applicantId)}>
                {person.name}
              </MemberStyle>
            ))}</ScrollBox>
          </PartWrapper>
          <PartWrapper>
            <div className='part-label'>
              <div>백엔드</div>
              <div className='part-num'>
                {beList.length}
              </div>
            </div>
            <ScrollBox>{beList.map((person, idx)=>(
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => handleMemberClick(person.applicantId)}>
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
  height: ${props => `${props.$innerheight - props.$navheight - 60}px`};;
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
  height: 23%;
  & > .part-label{
    display: flex;
    font-size: 1.6rem;
    color: #A0A0A0;
    margin-bottom: 0.8rem;
    align-items: center;
    gap: 0.4rem;
    & > .part-num{
      font-size: 1.3rem;
    }
  }
`

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  overflow-y: scroll;
  height: 90%;
  /* border: 1px solid blue; */
  margin-left: 0.5rem;
  gap: 0.6rem;
  &::-webkit-scrollbar {
    width: 5px;
    height: auto;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(3, 104, 255, 1);
    border-radius: 5rem;
  }
  &::-webkit-scrollbar-track {
    background: rgba(106, 199, 239, 0.2);
    border-radius: 10rem;
  }
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
