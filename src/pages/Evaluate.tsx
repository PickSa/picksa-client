import NavBar from "../components/common/NavBar"
import { PageFlex } from "../styles/globalStyle"
import styled from "styled-components"
import EvaluateContainerContent from "../components/evaluate/EvaluateContainerContent"
import SlideButton from '../assets/evaluate/SlideButton.png'
import { useState } from 'react';
import SideBar from '../components/evaluate/SideBar';
import { useNavigate, useParams } from 'react-router-dom'


const Evaluate = () => {
  const params = useParams<{id: string}>();
  const [isOpen, setIsOpen] = useState(false);
      const toggleSide = () => {
          setIsOpen(true);
      };
  return (
    <>      
      <PageFlex>      
      <NavBar where="evaluate" />
      <ContainerWrapper>
        <FileContainer>
        <SlideBtn role="button" onClick={toggleSide}>
          <img src={SlideButton}/>
        </SlideBtn>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </FileContainer>        
        <EvaluateContainer>
          <EvaluateContainerContent params = {params}></EvaluateContainerContent>
        </EvaluateContainer>
        </ContainerWrapper>  
        {isOpen && <Overlay onClick={toggleSide} />}      
    </PageFlex>     
    </>
  )
}
export default Evaluate

const ContainerWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
padding: 60px;
justify-content: space-evenly;
gap: 10px;
align-items: flex-start;
`

const FileContainer = styled.div`
width: 48%;
height: 1000px;
padding: 20px;
background: #D9D9D9;
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 35px;
line-height: 42px;
display: flex;
align-items: start;
text-align: center;
color: #000000;
`
const SlideBtn = styled.div`

`
const EvaluateContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 24px;
width: 40%;
height: 1000px;

`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;




