import NavBar from "../components/common/NavBar"
import { PageFlex } from "../styles/globalStyle"
import styled from "styled-components"
import { useEffect } from 'react';
import ListTimeTable from "../components/timetable/ListTimeTable"
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { accessTokenAtom } from "../atom";
const Evaluate = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if(accessToken === ""){
      alert("로그인해주세요!");
      navigate("/");
    }
  }, []);
  return (
    <>      
      <PageFlex>      
      <NavBar where="evaluate" />
      <TimeTableContainer>
        <Text1>면접시간배정</Text1>
        <TimeTable>
        <ListTimeTable />
        </TimeTable>        

        </TimeTableContainer>      
    </PageFlex>     
    </>

  )
}
export default Evaluate

const TimeTableContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 40px 0px;
gap: 20px;
width: 100%;
height: 100%;
`

const Text1 = styled.div`
padding-left: 20px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 21px;
display: flex;
align-items: center;
text-align: center;

/* Black */
color: #141414;
`

const TimeTable = styled.div`



/* Frame 107 */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 10px;
gap: 20px;

width: 100%;
height: 100%;

/* Blue/Blue1

Background
*/
background: #F7F8FA;
border-radius: 10px;

`
