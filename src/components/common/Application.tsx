import React from 'react'
import { LionDetailAnsType } from '../../dummy/datatypes'
import styled from 'styled-components';

type applicationProps = {
    id: number,
    name: string,
    major: string,
    multimajor: string,
    studentId: string,
    gender: string,
    semester: string,
    part: string,
    email: string,
    phone: string,
    portfolio: string,
    answers: LionDetailAnsType[],
}

const Application = (props:applicationProps) => {
  return (
    props && 
    <>
    <NameSpace>
        <div className='name'>{`${props.name}(${props.gender === "female" ? "여" : "남"})`}</div>
        <div className='part'>{props.part}</div>
    </NameSpace>
    <InfoGrid>
        <TableFrame>
            <div className='title'>학번</div>
            <div>{props.studentId}</div>
        </TableFrame>
        <TableFrame>
            <div className='title'>학과</div>
            <div>{props.major}</div>
        </TableFrame>
        <TableFrame>
            <div className='title'>다전공</div>
            <div>{props.multimajor}</div>
        </TableFrame>
        <TableFrame>
            <div className='title'>학기</div>
            <div>{props.semester}</div>
        </TableFrame>
        <TableFrame>
            <div className='title'>이메일</div>
            <div>{props.email}</div>
        </TableFrame>
        <TableFrame>
            <div className='title'>전화번호</div>
            <div>{props.phone}</div>
        </TableFrame>
    </InfoGrid>
    {
        props.answers.map((data) => (
            <AnswerWrapper>
                <div className='question'>{`Q${data.sequence}.${data.question}`}</div>
                <div className='answer'>{data.answer}</div>
            </AnswerWrapper>
        ))
    }
    <AnswerWrapper>
        <div className='question'>포트폴리오 링크</div>
        <div className='answer'>{props.portfolio}</div>
    </AnswerWrapper>
    </>
  )
}

export default Application

const NameSpace = styled.div`
    display: flex;
    flex-direction: column;
    gap:0.4rem;
    & > .name{
        font-size: 1.8rem;
        font-weight: 700;
    }
    & > .part{
        font-size: 1.7rem;
        font-weight: 700;
        color: rgba(160, 160, 160, 1);
    }
`

const InfoGrid = styled.div`
    display: grid;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1.2rem;
    margin-bottom: 2rem;
    row-gap: 1px;
    background-color: #D9D9D9;
    @media (max-width: 1920px) {
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row;
    }
    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-flow: row;
    }
    @media (max-width: 700px) {
        grid-template-columns: repeat(1, 1fr);
        grid-auto-flow: row;
    }
`

const TableFrame = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 500;
    background-color: white;
    text-align: center;
    & > div{
        width: 70%;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
    }
    & > .title{
        width: 30%;
        background-color: rgba(234, 241, 249, 1);
    }
`

const AnswerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1.2rem;
    & > .question {
        font-size: 1.7rem;
        font-weight: 700;
    }
    & > .answer {
        background-color: white;
        font-size: 1.6rem;
        font-weight: 400;
        padding: 1rem 1.2rem 1rem 1.2rem;
    }
`