import React, { useEffect, useRef, useState } from 'react'
import { ArticleFlex } from '../styles/globalStyle'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { LionDetailType, LionListType, NAVBARSIZE } from '../dummy/datatypes'
import { useRecoilValue } from 'recoil'
import { accessTokenAtom } from '../atom'
import { getLionDetail, getPartLists } from '../apis/lionlist'
import Application from '../components/common/Application'

const LionDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const accessToken = useRecoilValue(accessTokenAtom);
  const [pmList, setPmList] = useState<LionListType[]>();
  const [designList, setDesignList] = useState<LionListType[]>();
  const [feList, setFeList] = useState<LionListType[]>();
  const [beList, setBeList] = useState<LionListType[]>();
  const [member, setMember] = useState<LionDetailType>();

  const pageheight = window.innerHeight;
  const scrollRef = useRef<HTMLDivElement>(null);

  const getDetailById = async(id:string) => {
    const result = await getLionDetail(id, accessToken);
    if(result === false) {console.log("error occur")}
    else {
      setMember(result);
      scrollRef.current?.scroll({top:0})
    }
  }

  const getPartListApi = async(part:string) => {
    const result = await getPartLists(part, "", accessToken);
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

  useEffect(() => {
    //useMemo? 같은 hook으로 변경할 방법 고민해보기
    getPartListApi("PM");
    getPartListApi("DESIGN");
    getPartListApi("FRONTEND");
    getPartListApi("BACKEND");
  }, []);

  useEffect(() => {
    if(params.id){
      getDetailById(params.id);
    }
  }, [params]);

  return (
    <ArticleFlex className='lion-detail-row' $innerheight={pageheight} $navheight={NAVBARSIZE}>
      {pmList && designList && feList && beList &&
        <PeopleList $innerheight={pageheight} $navheight={NAVBARSIZE}>
          <div className='title'>지원자 목록</div>
          <PartWrapper>
            <div className='part-label'>
              <div>기획</div>
              <div className='part-num'>
                {pmList.length}
              </div>
            </div>
            <ScrollBox>{pmList.map((person, idx)=>(
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>
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
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>
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
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>
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
              <MemberStyle key={idx} $currentid={params.id!} $memberid={String(person.applicantId)} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>
                {person.name}
              </MemberStyle>
            ))}</ScrollBox>
          </PartWrapper>
        </PeopleList>
      }
      <ContentWrapper ref={scrollRef} $innerheight={pageheight} $navheight={NAVBARSIZE}>
        {member && 
        <Application
          id={member.id}
          name={member.name}
          major={member.major}
          multimajor={member.multimajor}
          studentId={member.studentId}
          gender={member.gender}
          semester={member.semester}
          part={member.part}
          email={member.email}
          phone={member.phone}
          portfolio={member.portfolio}
          answers={member.answers} />}
      </ContentWrapper>
    </ArticleFlex>
  )
}

export default LionDetail

const PeopleList = styled.div<{$innerheight:number, $navheight:number}>`
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: ${props => `${props.$innerheight - props.$navheight - 30}px`};;
  border-top: 1px solid rgba(221, 221, 221, 1);
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
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
  height: 23%;
  gap: 0.4rem;
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

const ContentWrapper = styled.div<{$innerheight:number, $navheight:number}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: ${props => `${props.$innerheight - props.$navheight - 20}px`};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`