import NavBar from "../components/common/NavBar"
import { PageFlex } from "../styles/globalStyle"
import styled from "styled-components"
import { useEffect, useState } from 'react';
import ListTimeTable from "../components/timetable/ListTimeTable"
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { UserInfoAtom, accessTokenAtom } from "../atom";
import { getSettedTime } from "../apis/Timetable/time";
import { SettedTimeType } from "../dummy/datatypes";
import ChangeTimeModal from "../components/modals/ChangeTimeModal";
const Evaluate = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const userinfo = useRecoilValue(UserInfoAtom);
  const navigate = useNavigate();
  const [settedTime, setSettedTime] = useState<SettedTimeType[]|undefined>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    console.log(accessToken);
    if(accessToken === ""){
      alert("로그인해주세요!");
      navigate("/");
    } else {
      const getTimeApi = async() => {
        const result = await getSettedTime(accessToken);
        if (result === "logout"){
          alert("토큰이 만료되었습니다. 로그아웃 후 다시 로그인해주세요.");
          navigate("/");
        } else if(result !== false){
          setSettedTime(result);
        }
      }
      getTimeApi();
    }
  }, []);

  return (
    <>      
      <PageFlex>
      {
        modalIsOpen === true && <ChangeTimeModal setModalIsOpen={setModalIsOpen} />
      }      
      <NavBar where="evaluate" />
        <TimeSetContainer>
          <TimeWrapper>
            <div className="label">면접시간설정</div>
            <TimeText>
              {
                settedTime && settedTime.map((item, idx) => (
                  <div key={idx}>{`${item.date} | ${item.startAt} ~ ${item.finishAt}`}</div>
                ))
              }
            </TimeText>
          </TimeWrapper>
          {userinfo.user.userrole === "회장단" ?<div className="change-btn" onClick={() => setModalIsOpen(true)}>수정하기</div> : ""}
        </TimeSetContainer>
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
`

const TimeSetContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 97%;
  border: 1px solid rgba(115, 171, 255, 1);
  margin-top: 2rem;
  padding: 1rem 1rem 1rem 1.2rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: space-between;
  & > .change-btn{
    display: flex;
    padding: 0.6rem 1rem 0.6rem 1rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    background-color: rgba(115, 171, 255, 1);
    color: white;
    &:hover{
      cursor: pointer;
    }
  }
`

const TimeWrapper = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  & > .label {
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    font-size: 1.8rem;
    color: rgba(115, 171, 255, 1);
  }
`

const TimeText = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  gap: 0.6rem;
`

const Text1 = styled.div`
padding-left: 21px;
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

width: 100%;

background: #F7F8FA;
border-radius: 10px;

`
