import React, { useEffect, useState } from 'react'
import { ArticleFlex } from '../styles/globalStyle'
import styled from 'styled-components'
import { TestDatasall, TestDatasbe, TestDatasdesign, TestDatasfe, TestDataspm, memberType } from '../dummy/TestDatasMember'
import { useNavigate, useParams } from 'react-router-dom'

const LionDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [member, setMember] = useState<memberType>();

  useEffect(() => {
    console.log(params.id);
    for(let i=0;i<TestDatasall.length;i++){
      if(TestDatasall[i].id === Number(params.id)){
        setMember(TestDatasall[i]);
      }
    }
  }, [params]);

  return (
    <ArticleFlex className='lion-detail-row'>
      <PeopleList>
        <div className='title'>지원자 목록</div>
        <PartWrapper>
          <div className='part-label'>{`기획 ${TestDataspm.length}`}</div>
          <ScrollBox>{TestDataspm.map((person, idx)=>(
            <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.id}`)}>{person.name}</div>
          ))}</ScrollBox>
        </PartWrapper>
        <PartWrapper>
          <div className='part-label'>{`디자인 ${TestDatasdesign.length}`}</div>
          <ScrollBox>{TestDatasdesign.map((person, idx)=>(
            <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.id}`)}>{person.name}</div>
          ))}</ScrollBox>
        </PartWrapper>
        <PartWrapper>
          <div className='part-label'>{`프론트엔드 ${TestDatasfe.length}`}</div>
          <ScrollBox>{TestDatasfe.map((person, idx)=>(
            <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.id}`)}>{person.name}</div>
          ))}</ScrollBox>
        </PartWrapper>
        <PartWrapper>
          <div className='part-label'>{`백엔드 ${TestDatasbe.length}`}</div>
          <ScrollBox>{TestDatasbe.map((person, idx)=>(
            <div key={idx} onClick={() => navigate(`/pre-lionlist/${person.id}`)}>{person.name}</div>
          ))}</ScrollBox>
        </PartWrapper>
      </PeopleList>
      <ContentWrapper>
        <InfoTable>
          {member && 
            <>
            <div className='name'>{member.name}</div>
            <div>{member.firstResult}</div>
            <div>{'department'}</div>
            <div>{member.primeNum}</div>
            <div>{'성별'}</div>
            <div>{'n학년 n학기'}</div>
            <div>{'휴학여부'}</div>
            <div>{'다전공관련비고사항'}</div>
            </>
          }
        </InfoTable>
        <ContentBox>
          <div className='label'>서류 정보</div>
          <div className='doc-box'>지원서 보류</div>
          <div className='label'>포트폴리오</div>
          <div className='port-box'>포트폴리오 링크</div>
        </ContentBox>
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
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  width: 83%;
  gap: 4rem;
`

const InfoTable = styled.div`
  display: grid;
  width: 100%;
  height: 4rem;
  grid-template-columns: repeat(8, auto);
  gap: 1px;
  background-color: black;
  border: 1px solid black;
  & > div{
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
  }
  & > .name{
    font-size: 2.4rem;
    font-weight: 700;
  }
`

const ContentBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  & > .label{
    font-size: 1.8rem;
    font-weight: 700;
    margin-left: 1rem;
  }
  & > .doc-box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30rem;
    background-color: rgba(247, 248, 250, 1);
    margin-top: 0.8rem;
    margin-bottom: 2rem;
  }
  & > .port-box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7rem;
    background-color: rgba(247, 248, 250, 1);
    margin-top: 0.8rem;
  }
`