import { useEffect, useState } from 'react';
import { LionDetailAnsType } from '../../dummy/datatypes'
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
    portfolio: string|null,
    answers: LionDetailAnsType[],
}

const Application = (props:applicationProps) => {
    const [customLink, setCustomLink] = useState<string[]|null>();

    const navigate = useNavigate();
    const params = useParams();
    const currentLocation = useLocation();

    useEffect(() => {
        console.log(currentLocation.pathname);
        setCustomLink(() => undefined)
        if(props.portfolio!==null && props.portfolio!==undefined){
            if(props.portfolio.includes('\n')){
                try{
                    const arr = props.portfolio.split('\n');
                    const modifiedArr = arr.map((element) => {
                        if(element.includes('http')){
                            return (`http${element.substring(element.indexOf('http')+4, )}`);
                        } else {
                            return ''
                        }
                    });
                    setCustomLink(() => modifiedArr);
                } catch {
                    setCustomLink(() => [props.portfolio!])
                }
            } else if (props.portfolio.includes(',')){
                try{
                    const arr = props.portfolio.split(',');
                    const modifiedArr = arr.map((element) => {
                        if(element.includes('http')){
                            return (`http${element.substring(element.indexOf('http')+4, )}`);
                        } else {
                            return ''
                        }
                    });
                    setCustomLink(() => modifiedArr);
                } catch {
                    setCustomLink(() => [props.portfolio!])
                }
            } else if (props.portfolio.includes(' ')){
                try{
                    const arr = props.portfolio.split(' ');
                    const modifiedArr = arr.map((element) => {
                        if(element.includes('http')){
                            return (`http${element.substring(element.indexOf('http')+4, )}`);
                        } else {
                            return ''
                        }
                    });
                    setCustomLink(() => modifiedArr);
                } catch {
                    setCustomLink(() => [props.portfolio!])
                }
            } else {
                try{
                    setCustomLink(() => [`http${props.portfolio!.substring(props.portfolio!.indexOf('http')+4, )}`])
                } catch{
                    setCustomLink(() => [props.portfolio!])
                }
            }
        }
        else {
            setCustomLink(() => null);
        }
    }, [props.portfolio]);

  return (
    props && 
    <>
    <NameSpace $inEval={currentLocation.pathname.includes('evaluate') ? false : true}>
        <div className='name-wrapper'>
            <div className='name'>{`${props.name}(${props.gender === "여성" ? "여" : "남"})`}</div>
            <div className='part'>{props.part}</div>
        </div>
        {!(currentLocation.pathname.includes('evaluate')) && 
            <div className='btn-wrapper' onClick={() => navigate(`/evaluate/${params.id}`)}>지원자 평가페이지 바로가기</div>
        }
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
        props.answers.map((data, idx) => (
            <AnswerWrapper key={idx}>
                <div className='question'>
                    <div>{`Q${idx+1}.${data.question}`}</div>
                    {data.answer.includes('[!]') ? 
                        <div className='notice'>{`(파란 글씨 부분은 지원자가 서류 제출시 작성하지 않아 메일로 재제출된 답변입니다.)`}</div>
                        :
                        <></>
                    }
                </div>
                <div className='answer'>
                    {data.answer && 
                    /* 재제출 구분을 위한 코드 */
                    data.answer.includes('[!]') ? 
                    data.answer.split('[!]').map((column, index) => {
                        if(index === 0) {
                            return column.split('\n').map((line, index) => (
                                (line[0] === ' ') ? 
                                <div key={index}>
                                    &nbsp;{line}
                                    <br />
                                </div>
                                :
                                <div key={index}>
                                    {line}
                                    <br />
                                </div>))
                        } else {
                            return column.split('\n').map((line, index) => (
                                (line[0] === ' ') ? 
                                <div className='color-ans' key={index}>
                                    &nbsp;{line}
                                    <br />
                                </div>
                                :
                                <div className='color-ans' key={index}>
                                    {line}
                                    <br />
                                </div>))
                        }
                    })
                    :
                    /* 기존 코드 */
                    data.answer.split('\n').map((line, index) => (
                        (line[0] === ' ') ? 
                        <div key={index}>
                            &nbsp;{line}
                            <br />
                        </div>
                        :
                        <div key={index}>
                            {line}
                            <br />
                        </div>
                    ))}
                    {
                        data.question.includes('(') ? 
                        <div className='count-len'>
                            <div>{`${data.answer.length}`}</div>
                            <div style={{color : "#797979"}}>
                                {`/${data.question.substring(data.question.lastIndexOf('(')+1, data.question.lastIndexOf('이내')-2)}`}
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            </AnswerWrapper>
        ))
    }
    <AnswerWrapper>
        <div className='question'>포트폴리오 링크</div>
        <div className='answer'>
            {customLink && 
            <>
                <div>{props.portfolio}</div>
                <br />
                {
                    customLink.map((link, idx) => (
                        <>
                        <div>
                            <a key={idx} href={link} target="_blank">{link}</a>
                        </div>
                        </>
                    ))
                }
            </>
            }
        </div>
    </AnswerWrapper>
    </>
  )
}

export default Application

const NameSpace = styled.div<{$inEval:boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 95%;
    gap:0.4rem;
    & > .name-wrapper{
        flex-direction: column;
        & > .name{
        font-size: 1.8rem;
        font-weight: 700;
        }
        & > .part{
            font-size: 1.7rem;
            font-weight: 700;
            color: rgba(160, 160, 160, 1);
        }
    }
    & > .btn-wrapper{
        display: flex;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 500;
        border-radius: 1rem;
        color: white;
        background-color: #0368FF;
        &:hover{
            cursor: pointer;
        }
    }
`

const Notice = styled.div`
    display: flex;
    width: 95%;
    margin-top: 1rem;
    color: #0368FF;
    font-size: 1.7rem;
    font-weight: 700;
`

const InfoGrid = styled.div`
    display: grid;
    width: 95%;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
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
    height: 100%;
    & > div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70%;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        word-break: break-all;
    }
    & > .title{
        width: 30%;
        background-color: rgba(234, 241, 249, 1);
    }
`

const AnswerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-bottom: 3rem;
    & > .question {
        display: flex;
        flex-direction: column;
        font-size: 1.7rem;
        font-weight: 700;
        margin-bottom: 1rem;
        & > .notice{
            font-size: 1.5rem;
            font-weight: 700;
            color: #0368FF;
        }
    }
    & > .answer {
        display: flex;
        flex-direction: column;
        background-color: white;
        font-size: 1.6rem;
        font-weight: 400;
        padding: 2rem;
        line-height: 150%;
        & > .color-ans{
            color: #0368FF;
        }
        & > .count-len{
            display: flex;
            justify-content: flex-end;
            margin-top: 1rem;
            font-weight: 600;
        }
    }
`