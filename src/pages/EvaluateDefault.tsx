import NavBar from "../components/common/NavBar"
import { PageFlex } from "../styles/globalStyle"
import styled from "styled-components"
import { useState } from 'react';
import SideBar from '../components/evaluate/SideBar';


const Evaluate = () => {
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
          <div><img width="30rem" src="/img/MdChevronRight.png" /></div>
        </SlideBtn>
        <div>지원자 선택하기</div>
        <SideBar isOpen={isOpen} currentId={undefined} setIsOpen={setIsOpen} />
        </FileContainer>
        <EvaluateContainer />       
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
  padding-top: 3.75rem;
  justify-content: space-evenly;
  align-items: flex-start;
`

const FileContainer = styled.div`
  width: 55%;
  height: 68rem;
  /* background: #D9D9D9; */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 2.1875rem;
  line-height: 2.625rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: start;
  color: #000000;
  overflow-y: scroll;
`
const SlideBtn = styled.div`
  z-index: 50;
  position: sticky;
  width: 4rem;
  height: 3rem;
  top:0;
  left: 0;
  display: flex;
  padding: 1rem 0rem 0rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 20rem;
  background-color: white;
  &:hover{
    cursor: pointer;
  }
`
const EvaluateContainer = styled.div`
  display: flex;
  /* background: #D9D9D9; */
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 1.5rem;
  width: 35%;
  height: 68rem;
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