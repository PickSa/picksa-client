import React, { useEffect, useState } from 'react';
import CurrentEval from '../../assets/evaluate/CurrentEval.png'
import FinishEval from '../../assets/evaluate/FinishEval.png'
import styled from 'styled-components'
import Comment from './Comment'
import PassFailFilter from "./PassFailFilter";
import {postEvaluation, getEvalOthers, getPassFail, patchEvaluation} from "../../apis/Evaluate/PassFailComments";
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../atom';
interface ButtonProps {
    selected: boolean;
}
const EvaluateContainerContent: React.FC = () => {
    const accessToken = useRecoilValue(accessTokenAtom);
    const [passSelected, setPassSelected] = useState(false);
    const [failSelected, setFailSelected] = useState(false);
    const [comments, setComments] = useState<string[]>([]);
    const [texts, setTexts] = useState<string>("");
    const [evaluation, setEvaluation] = useState<any>(null);
    const applicant_id = "1"; //실제 applicant_id로 변경
    useEffect(()=>{
        const fetchComments = async()=>{
            const data  = await getEvalOthers(applicant_id);
            if (data!== undefined) {
                setComments(data); 
            }
            const evaluationData = await getPassFail(applicant_id);
            setEvaluation(evaluationData);            
        };
        fetchComments();
    }, []);
    const handleTextClick = ()=>{        
    };
    const handleButtonClick = async () => {
        const evaluationId = "your-evaluation-id";
        const memberId = "your-member-id";        
        try{
            let data;
            if (comments.length === 0){
                data = await postEvaluation(applicant_id, 
                    passSelected, texts, accessToken);                
            } else {
                data = await patchEvaluation(evaluationId, 
                    passSelected, texts, memberId);
            }
            console.log(data);
            setComments([...comments, texts]);           
        }catch{
            console.log(false);
        }
    };
    const handlePassClick = async () =>{
        setPassSelected(true);
        setFailSelected(false);
        //서버에 "합격"을 전송하는 코드를 작성
        console.log("합격");
    };
    const handleFailClick = async () =>{
        setPassSelected(false);
        setFailSelected(true);
        //서버에 "불합격"을 전송하는 코드를 작성
        console.log("불합격");
    }
    const passCount = evaluation ? evaluation.score : 0;
    const totalCount = comments.length;
    const imgSrc = evaluation && evaluation.isEvaluated ? FinishEval: CurrentEval;
    return(
        <>        
        <VolunteerContainer>
            <VolunteerContainer1>
                <NameContainer>
                    <Name>김사자</Name>
                    <img src={imgSrc} alt="Current Evaluation" />                    
                </NameContainer>
                <Evaluate>
                    <EvaluateNumContainer1>
                        <Text1>전체평가</Text1>
                        <Text2>{`${passCount}/${totalCount}`}</Text2>
                    </EvaluateNumContainer1>
                    <EvaluateNumContainer1>
                        <Text1>최종평가</Text1>
                        <PassFailFilter></PassFailFilter>
                    </EvaluateNumContainer1>
                </Evaluate>
            </VolunteerContainer1>
            <VolunteerContainer1>
                <VolunteerContainer3>
                <NameContainer2>
                        <Name>개인평가</Name>
                        <Text1>박재윤</Text1>
                </NameContainer2>
                <NameContainer3>
                    <EvaluateButtonPass selected={passSelected} onClick={handlePassClick}>합격</EvaluateButtonPass>
                    <EvaluateButtonFail selected={failSelected} onClick={handleFailClick}>불합격</EvaluateButtonFail>
                </NameContainer3>
                <NameContainer2>
                    <TextBox value={texts} onClick={handleTextClick} onChange={e=>setTexts(e.target.value)}></TextBox>
                </NameContainer2>
                <EvaluateNumContainer3>
                    <RegisterButton onClick={handleButtonClick}>등록</RegisterButton>
                </EvaluateNumContainer3>
                </VolunteerContainer3>
                <VolunteerContainer4>
                    <Name>개인 코멘트</Name>
                    {comments && comments.length > 0 && comments.map((comment, index)=>(
                        <Comment key={index} content = {comment.comment} name={comment.name}></Comment>
                    ))}
                </VolunteerContainer4>       
            </VolunteerContainer1>
            
        </VolunteerContainer>

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
const RegisterButton = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 10px;
height: 32px;
background: #DDDDDD;
border-radius: 30px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 16px;
color: #000000;
`
const EvaluateNumContainer3 = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-end;
padding: 0px;
gap: 8px;
`

const EvaluateButtonPass = styled.button<ButtonProps>`
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
background: ${props => props.selected ? '#0368FF' : '#FFFFFF'};
color: ${props => props.selected ? '#FFFFFF' : '#A0A0A0'};
`
const EvaluateButtonFail = styled.button<ButtonProps>`
box-sizing: border-box;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px;

width: 186px;
height: 29px;

background: ${props => props.selected ? '#FF0101' : '#FFFFFF'};
color: ${props => props.selected ? '#FFFFFF' : '#A0A0A0'};
border: 1px solid #A0A0A0;
border-radius: 2px;
font-family: 'Pretendard';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 150%;
/* identical to box height, or 21px */

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
