import React, { useEffect, useState } from 'react';
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

    const onClickHandlePass = (isPassed:boolean) => {
        setMyPassResult(() => isPassed);
    }

    return(
        <>        
        {evaluationRes && <VolunteerContainer>
            <VolunteerContainer1>
                <NameContainer>
                    <Name>{props.memberName}</Name>
                    <img src={evaluationRes.isEvaluated ? FinishEval : CurrentEval} alt="Current Evaluation" />                    
                </NameContainer>
                <Evaluate>
                    <EvaluateNumContainer1>
                        <Text1>전체평가</Text1>
                        {totalCounts && <Text2>{`${evaluationRes.score}/${totalCounts}`}</Text2>}
                    </EvaluateNumContainer1>
                    <EvaluateNumContainer1>
                        <Text1>최종평가</Text1>
                        <PassFailFilter selectedOpt={evaluationRes.result} />
                    </EvaluateNumContainer1>
                </Evaluate>
            </VolunteerContainer1>
            <VolunteerContainer1>
                <VolunteerContainer3>
                <NameContainer2>
                        <Name>개인평가</Name>
                        <Text1>{userInfo.user.username}</Text1>
                </NameContainer2>
                <NameContainer3>
                    <EvaluateButtonPass 
                    className='passed'
                    $passed={myPassResult}
                    onClick={() => onClickHandlePass(true)}>합격</EvaluateButtonPass>
                    <EvaluateButtonPass
                    className='fail'
                    $passed={myPassResult}
                    onClick={() => onClickHandlePass(false)}>불합격</EvaluateButtonPass>
                </NameContainer3>
                <NameContainer2>
                    <TextBox value={texts} onChange={e=>setTexts(e.target.value)}></TextBox>
                </NameContainer2>
                <EvaluateNumContainer3>
                    <RegisterButton 
                    $registerActive={editActive}
                    onClick={() => handleCanPatch()}>{isEval ? "수정" : "등록"}</RegisterButton>
                </EvaluateNumContainer3>
                </VolunteerContainer3>
                <VolunteerContainer4>
                    <Name>개인 코멘트</Name>
                    {comments && comments.map((evaluationItem, idx)=>(
                        <Comment key={idx} content = {evaluationItem.comment} name={evaluationItem.name}></Comment>
                    ))}
                </VolunteerContainer4>       
            </VolunteerContainer1>            
        </VolunteerContainer>}
        </>
    )
}
export default EvaluateContainerContent

const VolunteerContainer = styled.div`
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    gap: 10px;
    background: #F7F8FA;
    border-radius: 10px;
`
const VolunteerContainer1 = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 16px;
    gap: 20px;
`
const NameContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 20px;
    border-bottom: 1px solid #000000;
`
const NameContainer2 = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 18px;
`
const NameContainer3 = styled.div`
    width: 90%;
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
    font-size: 18px;
    line-height: 50px;
    color: #000000;
`
const Evaluate = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 20px;
    gap: 20px;
    border-bottom: 1px solid #000000;
`
const EvaluateNumContainer1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
`
const Text1 = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #000000;
`
const Text2 = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 150%;
    color: #000000;
`

const VolunteerContainer3 = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`
const RegisterButton = styled.button<{$registerActive:boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    height: 32px;
    background: ${props => props.$registerActive ? 'rgba(106, 199, 239, 0.2)':'#DDDDDD'};
    border-radius: 30px;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #000000;
    border: none;
    &:hover{
        ${props => props.$registerActive ? {cursor:'pointer'} : {}}
    }
`
const EvaluateNumContainer3 = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px;
    gap: 8px;
`

const EvaluateButtonPass = styled.button<{$passed:boolean|undefined}>`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    width: 186px;
    height: 29px;
    background: #FFFFFF;
    border: 1px solid #A0A0A0;
    border-radius: 2px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
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
`

const TextBox = styled.input`
    box-sizing: border-box;
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 8px;
    height: 129px;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 2px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* or 21px */
    color: #000000;
`
const VolunteerContainer4 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 8px;
    width: 100%;
`
