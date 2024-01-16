import NavBar from "../components/common/NavBar"
import { PageFlex } from "../styles/globalStyle"
import styled from "styled-components"
import EvaluateContainerContent from "../components/evaluate/EvaluateContainerContent"
import { MdChevronRight } from "react-icons/md";
import { useEffect, useState } from 'react';
import SideBar from '../components/evaluate/SideBar';
import { useParams } from "react-router-dom"
import Application from "../components/common/Application"
import { getLionDetail } from "../apis/lionlist"
import { useRecoilValue } from "recoil"
import { accessTokenAtom } from "../atom"
import { LionDetailType } from "../dummy/datatypes"



const Evaluate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string|undefined>();
  const [member, setMember] = useState<LionDetailType>();
  const params = useParams();
  const accessToken = useRecoilValue(accessTokenAtom);

  const toggleSide = () => {
      setIsOpen(true);
  };

  useEffect(() => {
    if(params.id){
      setCurrentId(params.id);
      getDetailById(params.id);
    }
  }, [params]);

  const getDetailById = async(id:string) => {
    const result = await getLionDetail(id, accessToken);
    if(result === false) {console.log("error occur")}
    else {
      setMember(result);
    }
  }
  return (
    <>
    <PageFlex>      
      <NavBar where="evaluate" />
      <ContainerWrapper>
        <FileContainer>
        <SlideBtn role="button" onClick={toggleSide}>
          <div><MdChevronRight /></div>
        </SlideBtn>
        {member && 
        <Application 
          id={member.id}
          name={member.name}
          major={member.major}
          multimajor={member.multimajor}
          studentId={member.studentId}
          gender={member.gender}
          semester={member.semester}
          part={member.part}
          email={member.email}
          phone={member.phone}
          portfolio={member.portfolio}
          answers={member.answers} />}
        <SideBar isOpen={isOpen} currentId={currentId} setIsOpen={setIsOpen} />
        </FileContainer>        
        <EvaluateContainer>
          {member && 
          <EvaluateContainerContent 
            currentId={currentId}
            memberName={member.name} />
          }
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
  top:0;
  left: 0;
  display: flex;
  padding: 1rem 1rem 0rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  background-color: white;
`
const EvaluateContainer = styled.div`
  display: flex;
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





