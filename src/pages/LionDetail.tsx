import React, { useEffect, useState } from 'react'
import { ArticleFlex } from '../styles/globalStyle'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { LionDetailType, LionListType } from '../dummy/datatypes'
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

  const getDetailById = async(id:string) => {
    const result = await getLionDetail(id, accessToken);
    if(result === false) {console.log("error occur")}
    else {
      setMember(result);
    }
  }

  const getPartListApi = async(part:string) => {
    const result = await getPartLists(part, "", accessToken);
    if(result){
      if(part === "PM") {
        console.log(result);
        setPmList(result.applicants)
      }
      else if(part === "DESIGN") {setDesignList(result.applicants)}
      else if(part === "FRONTEND") {setFeList(result.applicants)}
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
    console.log(params.id);
    if(params.id){
      getDetailById(params.id);
    }
  }, [params]);

  return (
    <ArticleFlex className='lion-detail-row'>
      {pmList && designList && feList && beList &&
        <PeopleList>
          <div className='title'>지원자 목록</div>
          <PartWrapper>
            <div className='part-label'>{`기획 ${pmList.length}`}</div>
            <ScrollBox>{pmList.map((person, idx)=>(
              <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>{person.name}</div>
            ))}</ScrollBox>
          </PartWrapper>
          <PartWrapper>
            <div className='part-label'>{`디자인 ${designList.length}`}</div>
            <ScrollBox>{designList.map((person, idx)=>(
              <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>{person.name}</div>
            ))}</ScrollBox>
          </PartWrapper>
          <PartWrapper>
            <div className='part-label'>{`프론트엔드 ${feList.length}`}</div>
            <ScrollBox>{feList.map((person, idx)=>(
              <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>{person.name}</div>
            ))}</ScrollBox>
          </PartWrapper>
          <PartWrapper>
            <div className='part-label'>{`백엔드 ${beList.length}`}</div>
            <ScrollBox>{beList.map((person, idx)=>(
              <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.applicantId}`)}>{person.name}</div>
            ))}</ScrollBox>
          </PartWrapper>
        </PeopleList>
      }
      <ContentWrapper>
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

const PeopleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 70rem;
  border-top: 1px solid rgba(221, 221, 221, 1);
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  border-right: 1px solid rgba(221, 221, 221, 1);
  background-color: white;
  gap: 2rem;
  & > .title{
    display: flex;
    padding-top: 2rem;
    padding-bottom: 2rem;
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
    margin-bottom: 1rem;
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
  gap: 0.5rem;
  & > div{
    &:hover{
      cursor: pointer;
    }
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 83%;
  overflow-y: scroll;
`