import CurrentEval from '../../assets/evaluate/CurrentEval.png'
import styled from 'styled-components'
import Pass from '../../assets/evaluate/pass.png'
import Nopass from '../../assets/evaluate/Nopass.png'
import Uncertain from '../../assets/evaluate/uncertain.png'
import Logo from '../../assets/evaluate/Logo.png'
import ToggleButton from '../../assets/evaluate/ToggleButton'
import Comment from '../../assets/evaluate/Comment'
const EvaluateContainerContent = () => {
    return(
        <>
        
        <VolunteerContainer>
            <VolunteerContainer1>
                <NameContainer>
                    <Name>김사자
                    <img src={CurrentEval} alt="Current Evaluation" />
                    </Name>
                    <EvalNum>10명 중 8명 찬성</EvalNum>
                </NameContainer>
                <Evaluate>
                    <img src={Pass} alt="Pass" />
                    <img src={Nopass} alt="No Pass" />
                    <img src={Uncertain} alt="Uncertain" />
                </Evaluate>
            </VolunteerContainer1>
            <VolunteerContainer2>
                <Interviewer>
                    <img src={Logo} alt="Logo" />
                    <InterviewerName>박재윤</InterviewerName>
                    <ToggleButton></ToggleButton>
                    
                    
                </Interviewer>
                <EvaluateContent>
                    <EvaluateText>
                    </EvaluateText>
                    <RegisterButton>등록</RegisterButton>
                </EvaluateContent>        
            </VolunteerContainer2>
            <VolunteerContainer3>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
            </VolunteerContainer3>
        </VolunteerContainer>

        </>
    )
}
export default EvaluateContainerContent

const VolunteerContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 20px;
`
const VolunteerContainer1 = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 20px;

`
const NameContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 20px;

`
const Name = styled.div`
display: flex;
flex-direction: row;
padding: 0px;
gap: 20px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 1.5;
color: #000000;
`
const EvalNum = styled.div`
height: 36px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 23px;
line-height: 150%;

color: #000000;

`
const Evaluate = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px 40px;
gap: 36px;

width: 365px;

`
const VolunteerContainer2 = styled.div`

box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 28px 0px;
gap: 16px;
width: 365px;
height: 295px;
border-width: 1px 0px;
border-style: solid;
border-color: #DDDDDD;

`
const Interviewer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px 0px 0px 10px;
gap: 20px;

width: 365px;
height: 36px;
`
const InterviewerName = styled.div`
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 20px;

color: #000000;
`
const EvaluateContent= styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 0px;
gap: 8px;

width: 365px;
height: 187px;
`
const EvaluateText= styled.input`
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 10px;

width: 365px;
height: 147px;

background: #FFFFFF;
/* Light Gray */
border: 1px solid #DDDDDD;
border-radius: 10px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 150%;
/* or 20px */

color: #000000;
`
const VolunteerContainer3 = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;
width: 365px;
height: 506px;
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
/* identical to box height */

color: #000000;
`




