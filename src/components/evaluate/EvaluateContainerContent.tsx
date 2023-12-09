import React, { useState } from 'react';
import CurrentEval from '../../assets/evaluate/CurrentEval.png'
import styled from 'styled-components'
import Comment from '../../assets/evaluate/Comment'
interface ButtonProps {
    selected: boolean;
}
const EvaluateContainerContent: React.FC = () => {
    const [passSelected, setPassSelected] = useState(false);
    const [failSelected, setFailSelected] = useState(false);
    return(
        <>        
        <VolunteerContainer>
            <VolunteerContainer1>
                <NameContainer>
                    <Name>김사자</Name>
                    <img src={CurrentEval} alt="Current Evaluation" />                    
                </NameContainer>
                <Evaluate>
                    <EvaluateNumContainer1>
                        <Text1>전체평가</Text1>
                        <Text2>9/10</Text2>
                    </EvaluateNumContainer1>
                    <EvaluateNumContainer1>
                        <Text1>최종평가</Text1>
                        <Text1></Text1>
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
                    <EvaluateButtonPass selected={passSelected} onClick={() => {setPassSelected(true); setFailSelected(false);}}>합격</EvaluateButtonPass>
                    <EvaluateButtonFail selected={failSelected} onClick={() => {setFailSelected(true); setPassSelected(false);}}>불합격</EvaluateButtonFail>
                </NameContainer3>
                <NameContainer2>
                    <TextBox>텍스트를 입력하세요</TextBox>
                </NameContainer2>
                <EvaluateNumContainer3>
                    <RegisterButton>등록</RegisterButton>
                </EvaluateNumContainer3>
                </VolunteerContainer3>
                <VolunteerContainer4>
                    <Name>개인 코멘트</Name>
                    <Comment></Comment>
                    <Comment></Comment>
                    <Comment></Comment>
                </VolunteerContainer4>       
            </VolunteerContainer1>
            
        </VolunteerContainer>

        </>
    )
}
export default EvaluateContainerContent

const VolunteerContainer = styled.div`
width: 460px;
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 25px;
gap: 10px;
background: #F7F8FA;
`
const VolunteerContainer1 = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: flex-start;
padding-left: 16px;
gap: 20px;
`
const NameContainer = styled.div`
width: 410px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 20px;
border-bottom: 1px solid #000000;
`
const NameContainer2 = styled.div`
width: 410px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 18px;
`
const NameContainer3 = styled.div`
width: 410px;
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
display: flex;
flex-direction: column;
align-items: flex-start;
padding-bottom: 20px;
gap: 20px;
width: 410px;
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
const TextBox = styled.textarea`
box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px;
gap: 8px;
height: 129px;
width: 410px;

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
`
