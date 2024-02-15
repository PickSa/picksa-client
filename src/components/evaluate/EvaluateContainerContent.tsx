import React, { useEffect, useRef, useState } from 'react';
import CurrentEval from '../../assets/evaluate/CurrentEval.png'
import FinishEval from '../../assets/evaluate/FinishEval.png'
import styled from 'styled-components'
import Comment from './Comment'
import { getEvalOthers, getPassFail, patchEvaluation, postEvaluation } from "../../apis/Evaluate/PassFailComments";
import { useRecoilValue } from 'recoil';
import { EvaluateResult, OthersEvaluation } from "../../dummy/evaluate";
import { UserInfoAtom, accessTokenAtom } from '../../atom';
import { getAllLists } from '../../apis/lionlist';
import PassFailFilter from './PassFailFilter';

const EvaluateContainerContent=(props:{
    currentId: string|undefined, 
    memberName: string,
    parentContainerHeight: number,
}) => {
    const accessToken = useRecoilValue(accessTokenAtom);
    const userInfo = useRecoilValue(UserInfoAtom);
    const [manageBefore, setManageBefore] = useState<{
        id: number,
        comment: string,
        pass: boolean,
    }|undefined>();
    const [texts, setTexts] = useState<string>("");
    const [comments, setComments] = useState<OthersEvaluation[]>();
    const [evaluationRes, setEvaluationRes] = useState<EvaluateResult>();
    const [totalCounts, setTotalCounts] = useState<number>();
    const [isEval, setIsEval] = useState<boolean>(false);
    const [myPassResult, setMyPassResult] = useState<boolean|undefined>();
    const [editActive, setEditActive] = useState(false);
    const [clickEdit, setClickEdit] = useState(false);

    const nameRef = useRef<HTMLDivElement>(null);
    const myEvalRef = useRef<HTMLDivElement>(null);

    const nameRefSize = nameRef.current ? nameRef.current.offsetHeight : 129.5;
    const myEvalRefSize = myEvalRef.current ? myEvalRef.current.offsetHeight : 210.75;

    useEffect(()=>{
        const fetchComments = async()=>{
            const res = await getEvalOthers(props.currentId!, accessToken);
            if (res!== undefined && res.length!==0) {
                if(res[0].name === userInfo.user.username){
                    setIsEval(true);
                    setTexts(res[0].comment);
                    setMyPassResult(res[0].pass);
                    setManageBefore({
                        id:res[0].evaluationId,
                        comment:res[0].comment,
                        pass:res[0].pass
                    });
                    res.splice(0,1);
                    setComments(res);
                } else {
                    setIsEval(false);
                    setTexts("");
                    setMyPassResult(undefined);
                    setManageBefore(undefined);
                    setComments(res);
                }
            } else {
                setIsEval(false);
                setIsEval(false);
                setTexts("");
                setMyPassResult(undefined);
                setManageBefore(undefined);
                setComments(undefined);
            }
            const PassFail = await getPassFail(props.currentId!, accessToken);     
            if (PassFail!== undefined) {
                setEvaluationRes(PassFail);
            }
            const allMemCount = await getAllLists("", accessToken);
            if(allMemCount!==undefined){
                setTotalCounts(allMemCount.userCount);
            }
        };
        fetchComments();
    }, [props.currentId]);

    useEffect(() => {
        if(isEval){
            if(texts === manageBefore?.comment && myPassResult === manageBefore.pass){
                setEditActive(() => false);
            } else {
                setEditActive(() => true);
            }
        } else {
            if(texts.length !== 0 && myPassResult!=undefined){
                setEditActive(true);
            } else {
                setEditActive(false);
            }
        }
    }, [texts,myPassResult]);

    const handleCanPatch = () => {
        if(isEval){
            if(editActive){
                //여기 수정 api 호출
                const patchMyEval = async() => {
                    const response = await patchEvaluation(manageBefore!.id, myPassResult!, texts ,accessToken);
                    if(response !== undefined){
                        setEditActive(() => false);
                        setClickEdit(() => false);
                    } else {
                        alert("오류 발생, 다시 시도해주세요.");
                        //이 부분 error code 분리하기
                    }
                }
                patchMyEval();
            }
        } else {
            if(editActive){
                //여기 등록 api 호출
                const postMyEval = async() => {
                    const response = await postEvaluation(props.currentId!, myPassResult!, texts ,accessToken);
                    if(response !== undefined){
                        location.reload();
                    }
                }
                postMyEval();
            }
        }
    };

    const onClickEditBtn = () => {
        setClickEdit(() => true);
    }

    const onClickHandlePass = (isPassed:boolean) => {
        if(isEval){
            if(clickEdit){
                setMyPassResult(() => isPassed);
            }
        } else {
            setMyPassResult(() => isPassed);
        }
    }

    return(
        <>        
        {evaluationRes && <VolunteerContainer>
            <VolunteerContainer1 ref={nameRef}>
                <NameContainer>
                    <Name>{props.memberName}</Name>
                    <img src={evaluationRes.isEvaluated ? FinishEval : CurrentEval} alt="Current Evaluation" />                    
                </NameContainer>
                <Evaluate>
                    <EvaluateNumContainer1>
                        <Text1>서류점수</Text1>
                        {totalCounts && <Text2>{`${evaluationRes.score}/${totalCounts}`}</Text2>}
                    </EvaluateNumContainer1>
                    <EvaluateNumContainer1>
                        <Text1>서류결과</Text1>
                        <PassFailFilter selectedOpt={evaluationRes.result} currentId={props.currentId!} />
                    </EvaluateNumContainer1>
                </Evaluate>
            </VolunteerContainer1>
            <VolunteerContainer1 ref={myEvalRef}>
                <VolunteerContainer3>
                <NameContainer2>
                        <Name>내 평가</Name>
                        <Text1>{userInfo.user.username}</Text1>
                </NameContainer2>
                {isEval ? 
                    <NameContainer3>
                        <EvaluateButtonPass 
                        className='passed'
                        $passed={myPassResult}
                        $canclick={clickEdit}
                        onClick={() => onClickHandlePass(true)}>합격</EvaluateButtonPass>
                        <EvaluateButtonPass
                        className='fail'
                        $passed={myPassResult}
                        $canclick={clickEdit}
                        onClick={() => onClickHandlePass(false)}>불합격</EvaluateButtonPass>
                    </NameContainer3>
                    :
                    <NameContainer3>
                        <EvaluateButtonPass 
                        className='passed'
                        $passed={myPassResult}
                        $canclick={true}
                        onClick={() => onClickHandlePass(true)}>합격</EvaluateButtonPass>
                        <EvaluateButtonPass
                        className='fail'
                        $passed={myPassResult}
                        $canclick={true}
                        onClick={() => onClickHandlePass(false)}>불합격</EvaluateButtonPass>
                    </NameContainer3>
                }
                <NameContainer2>
                    {
                        isEval === false ? 
                        <TextBox maxLength={250} value={texts} onChange={e=>setTexts(e.target.value)}></TextBox>
                        :
                        clickEdit === true ?
                        <TextBox maxLength={250} value={texts} onChange={e=>setTexts(e.target.value)}></TextBox>
                        :
                        <TextBoxCannotEdit>
                           <div>{texts}</div>
                        </TextBoxCannotEdit>
                    }
                </NameContainer2>
                <EvaluateNumContainer3>
                    {isEval === false ? 
                        <RegisterButton 
                        $registerActive={editActive}
                        onClick={() => handleCanPatch()}>등록</RegisterButton> 
                        :
                        clickEdit === true ? 
                        <RegisterButton 
                        $registerActive={editActive}
                        onClick={() => handleCanPatch()}>등록</RegisterButton>
                        :
                        <EditButton 
                        onClick={() => onClickEditBtn()}>수정</EditButton>
                    }
                </EvaluateNumContainer3>
                </VolunteerContainer3>
            </VolunteerContainer1>
            <VolunteerContainer1>
                <VolunteerContainer4 $conheight={props.parentContainerHeight - (nameRefSize + myEvalRefSize + 60)}>
                    <Name>운영진 평가</Name>
                    <div className='comment-box'>
                    {comments && comments.map((evaluationItem, idx)=>(
                        <Comment key={idx} content = {evaluationItem.comment} name={evaluationItem.name} pass={evaluationItem.pass}></Comment>
                    ))}
                    </div>
                </VolunteerContainer4>       
            </VolunteerContainer1>            
        </VolunteerContainer>}
        </>
    )
}
export default EvaluateContainerContent

const VolunteerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    gap: 1rem;
    background: #F7F8FA;
    border-radius: 0.625rem;
`
const VolunteerContainer1 = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2rem;
    gap: 1.5rem;
`
const NameContainer = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 1rem;
    gap: 1.5rem;
    border-bottom: 1px solid #000000;
`
const NameContainer2 = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
`
const NameContainer3 = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 0px;
`
const Name = styled.div`
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 3.125rem;
    color: #000000;
`
const Evaluate = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1.25rem;
    gap: 1.5rem;
    border-bottom: 1px solid #000000;
`
const EvaluateNumContainer1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 1rem;
`
const Text1 = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 150%;
    color: #000000;
`
const Text2 = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 150%;
    color: #000000;
`
const VolunteerContainer3 = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
`
const RegisterButton = styled.button<{$registerActive:boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem;
    height: 3rem;
    background: ${props => props.$registerActive ? 'rgba(106, 199, 239, 0.2)':'#DDDDDD'};
    border-radius: 1.875rem;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 1rem;
    color: #000000;
    border: none;
    &:hover{
        ${props => props.$registerActive ? {cursor:'pointer'} : {}}
    }
`

const EditButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem;
    height: 3rem;
    background: #DDDDDD;
    border-radius: 1.875rem;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 1rem;
    color: #000000;
    border: none;
    &:hover{
        cursor: pointer;
    }
`
const EvaluateNumContainer3 = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px;
    gap: 0.5rem;
`
const EvaluateButtonPass = styled.button<{$passed:boolean|undefined, $canclick:boolean}>`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0.5rem;
    gap: 0.5rem;
    width: 16rem;
    height: 2.7rem;
    background: #FFFFFF;
    border: 1px solid #A0A0A0;
    border-radius: 0.125rem;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 150%;
    color: #A0A0A0;
    &.passed{
        background: ${props => 
            props.$passed !== undefined ? 
            props.$passed ? '#0368FF' : '#FFFFFF'
            : '#FFFFFF'
        };
        color: ${props => 
             props.$passed !== undefined ? 
            props.$passed ? '#FFFFFF'  : '#A0A0A0'
            : '#A0A0A0'
        };
    }
    &.fail{
        background: ${props => 
             props.$passed !== undefined ? 
            props.$passed ? '#FFFFFF' : 'rgba(255, 1, 1, 1)'
            : '#FFFFFF'
        };
        color: ${props => 
             props.$passed !== undefined ? 
            props.$passed ? '#A0A0A0'  : '#FFFFFF'
            : '#A0A0A0'
        };
    }
    &:hover{
        ${props => props.$canclick ? {cursor:'pointer'} : {cursor:'not-allowed'}}
    }
`
const TextBox = styled.textarea`
    box-sizing: border-box;
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
    height: 8rem;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 0.125rem;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 150%;
    overflow-y: scroll;
    /* or 21px */
    color: #000000;
`

const TextBoxCannotEdit = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 8rem;
    width: 100%;
    background: #EAF1F9;
    border-radius: 0.125rem;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    overflow-y: scroll;
    color: #000000;
    & > div{
        display: flex;
        padding: 1rem;
    }
`
const VolunteerContainer4 = styled.div<{$conheight:number}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    width: 100%;
    & > .comment-box{
        display: flex;
        gap: 1.5rem;
        flex-direction: column;
        width: 100%;
        /* height: ${props => `${props.$conheight - 31 - 15}px`};
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        } */
    }
`

