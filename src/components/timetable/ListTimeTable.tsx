import { css, styled } from "styled-components"
import ListMemberRow from "./ListMemberTime"
import { getInterviewee } from "../../apis/Timetable/time"
import { useState, useEffect } from "react"
import { accessTokenAtom } from "../../atom"
import { useRecoilValue, useRecoilState } from "recoil"
import { applicantsType } from "../../dummy/timetabletypes"
export type memberType = {
    id:number,
    part:string,
    name:string,
    available:string
}
export type scheduleType = {
    date:string,
    startAt:string,
    finishAt:string
}
const ListTable = () => {
  const [scheduleDay1, setScheduleDay1] = useState<scheduleType>();
  const [scheduleDay2, setScheduleDay2] = useState<scheduleType>();
  const [scheduleDay3, setScheduleDay3] = useState<scheduleType>();
  const [applicantLists, setApplicantLists] = useState<applicantsType[]>();
  const accessToken = useRecoilValue(accessTokenAtom);
  useEffect(() => {
      async function fetchIntervieweeData() {
        const result = await getInterviewee(accessToken);
        console.log(result);
        const itemCount  = result.schedules.length;
        setApplicantLists(result.applicants);
        setScheduleDay1(result.schedules[0]);
        setScheduleDay2(result.schedules[1]);
        setScheduleDay3(result.schedules[2]);
        console.log(itemCount);
      }    
      fetchIntervieweeData();
    }, []);
    const getTimeSlots = (start: string, end: string) => {
      const timeSlots = [];
      let current = new Date(`1970-01-01T${start}Z`);
      const finish = new Date(`1970-01-01T${end}Z`);

      while (current <= finish) {
          timeSlots.push(current.toISOString().slice(11,16));
          current.setMinutes(current.getMinutes() + 60);
      }
      return timeSlots;
  };
  //마지막
  const getTimeSlots2 = (start: string, end: string) => {
    const timeSlots = [];
    let current = new Date(`1970-01-01T${start}Z`);
    const finish = new Date(`1970-01-01T${end}Z`);
    finish.setHours(finish.getHours() + 1);
    while (current <= finish) {
        timeSlots.push(current.toISOString().slice(11,16));
        current.setMinutes(current.getMinutes() + 60);
    }
    return timeSlots;
};
    const start1 = scheduleDay1 ? scheduleDay1.startAt : "12:00:00";
    const finish1 = scheduleDay1 ? scheduleDay1.finishAt : "22:00:00";
    const start2 = scheduleDay2 ? scheduleDay2.startAt : "12:00:00";
    const finish2 = scheduleDay2 ? scheduleDay2.finishAt : "22:00:00";
    const timeSlots1 = getTimeSlots(start1, finish1);
    const timeSlots2 = getTimeSlots(start2, finish2);
    const timeSlots3 = getTimeSlots2(start2, finish2);
  const formatDate = (date: string) =>{
      const d= new Date(date);
      return `${d.getMonth()+1}/${d.getDate()}`
  }
return (
  <>
  <TableWrapper>
    <Scrollable>
      <Table>
        <tbody>
          <tr style={{height: "4rem", background: "#F7F8FA"}}>
            <td style={{ position: 'sticky', top: 0, zIndex: 8, left:0, background: "#F7F8FA"}}><Text1>날짜</Text1></td>
            <td style={{width: '20rem', position: 'sticky', top: 0, left:60, zIndex: 7, background: "#F7F8FA"}}></td>
            {timeSlots1.map((_, index) => {
              if (index < 1) {
                return <Td1 style={{ position: 'sticky', top: 0,left: 5, zIndex: 6, background: "#F7F8FA" }}><Text4>{scheduleDay1 ? formatDate(scheduleDay1.date) : ""}</Text4></Td1>;
              }
              else {
                return <Td1 style={{position: 'sticky', top: 0, zIndex: 6, background: "#F7F8FA"}}></Td1>;
              }
            })}
            {timeSlots2.map((_, index) => {
              if (index < 1) {
                return <Td1 style={{ position: 'sticky', top: 0, zIndex: 6, background: "#F7F8FA" }}><Text4>{scheduleDay2 ? formatDate(scheduleDay2.date) : ""}</Text4></Td1>;
              }
              else {
                return <Td1 style={{position: 'sticky', top: 0, zIndex: 6, background: "#F7F8FA"}}></Td1>;
              }
            })}
            {timeSlots2.map((_, index) => {
              if (index < 1) {
                return <Td1 style={{ position: 'sticky', top: 0, zIndex: 6, background: "#F7F8FA" }}><Text4>{scheduleDay3 ? formatDate(scheduleDay3.date) : ""}</Text4></Td1>;
              }
              else {
                return <Td1 style={{position: 'sticky', top: 0, zIndex: 6, background: "#F7F8FA"}}></Td1>;
              }
            })}
          </tr>
          <tr style={{background: "#F7F8FA"}}>
            <Td1 style = {{ position: 'sticky', top: 40, zIndex: 8, left:0, background: "#F7F8FA" }}><Text1>시간</Text1></Td1>
            <td style={{width: '20rem', position: 'sticky', top: 40, left:60, zIndex: 7, background: "#F7F8FA"}}><Text></Text></td>
            {timeSlots1.map((time, index) => (
                <Td1 key={index} style={{ position: 'sticky', top: 40, left: 5, zIndex: 5, background: "#F7F8FA" }}><Text3>{time}</Text3></Td1>
              ))}
              {timeSlots2.map((time, index) => (
                <Td1 key={index} style={ {position: 'sticky', top: 40, zIndex: 5, background: "#F7F8FA"}}><Text3>{time}</Text3></Td1>
              ))}
              {timeSlots2.map((time, index) => (
                <Td1 key={index} style={ {position: 'sticky', top: 40, zIndex: 5, background: "#F7F8FA"}}><Text3>{time}</Text3></Td1>
              ))}
          </tr>
          {
            applicantLists && applicantLists.map((data: memberType, idx:number)=>(
              <tr key={idx} style={{background: "#F7F8FA"}}>
                <td style={{ position: 'sticky', left: 0, zIndex: 2, background: "#F7F8FA", top: 5 }}><PartHighlight part={data.part}>{getPartName(data.part)}</PartHighlight></td>
                <td style={{ position: 'sticky', left: 61, zIndex: 2, background: "#F7F8FA", top: 5 }}><Text2>{data.name}</Text2></td>
                <Td2 style={{ position: 'sticky', zIndex: 1, left: 5, top: 6 }}><Blank /></Td2>
                {timeSlots1.map((_, i) => {
                  if (data.available) {
                    const availabilityArray = data.available.split('');
                    const isAvailable = availabilityArray[i];
                    if(i !== 10){
                      return <Td2 key={i} style={{ position: 'sticky', zIndex: 1, left: 5, top: 6 }}>{isAvailable === '1' ? <Check /> : <Nocheck />}</Td2>
                    }
                    if(i === 10){
                      return <Td2 key={i} style={{ position: 'sticky', zIndex: 1, left: 5, top: 6 }}><Nocheck2 /></Td2>
                    }
                  }
                })}

                {timeSlots1.map((_, i) => {
                  if (data.available) {
                    const availabilityArray = data.available.split('');
                    const isAvailable = availabilityArray[i+10];
                    if(i !== 10){
                      return <Td2 key={i} style={{ position: 'sticky', zIndex: 1, left: 5, top: 6 }}>{isAvailable === '1' ? <Check /> : <Nocheck />}</Td2>
                    }
                    if(i === 10){
                      return <Td2 key={i} style={{ position: 'sticky', zIndex: 1, left: 5, top: 6 }}><Nocheck2 /></Td2>
                    }
                  }
                })}
                {timeSlots2.map((_, i) => {
                  if (data.available) {
                    const availabilityArray = data.available.split('');
                    const isAvailable = availabilityArray[i+20];
                    if(i !== 10){
                      return <Td2 key={i} style={{ position: 'sticky', zIndex: 1, left: 5, top: 6 }}>{isAvailable === '1' ? <Check /> : <Nocheck />}</Td2>
                    }
                  }
                })}
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Scrollable>
  </TableWrapper>
  
</>
 
)
}
function getPartName(part:string){
  switch(part){
      case "PM":
          return "기획";
      case "DESIGN":
          return "디자인";
      case "FRONTEND":
          return "프론트";
      case "BACKEND":
          return "백엔드";
  }
}
export default ListTable;
const TableWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 98%;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 1.2rem;
    height: 58rem;   
`;
const Table = styled.table`
width: 100%;
`;
const Td = styled.td`
padding-top: 2rem;
font-size: 1.4rem;
`;
const Td2 = styled.td`
padding-top: 2rem;
font-size: 1.4rem;
padding-right: 1.6rem;
`;
const Td1 = styled.td`
font-size: 1.4rem;
width: 20rem;
background: "#F7F8FA";
`;
const Div1 = styled.div`
  position: sticky;
  z-index: 1;
  left: 5px;
  top: 6px;
  display: flex;
  flex-direction: row;
`;

const MemberList = styled.div`
gap: 5rem;
display: flex;
flex-direction: row;
flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 2rem;
    padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #DDDDDD;
`;
const Container = styled.div`
overflow-x: scroll; // 가로 스크롤 추가
width: 100%;
`;
const Text = styled.div`
width: 8rem;
font-size: 1.4rem;
background-color: "#F7F8FA";
z-index:7;
text-align: center;
font-family: 'Pretendard Variable';
`;
const Text2 = styled.div`
width: 8rem;
font-size: 1.4rem;
background-color: "#F7F8FA";
z-index:7;
text-align: center;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
color: #141414;
`;

const Text1 = styled.div`
text-align: center;
font-size: 1.4rem;
background-color: "#F7F8FA";
font-family: 'Pretendard Variable';
font-weight: 550;
color: #141414;
`;
const Text3 = styled.div`
text-align: end;
font-size: 1.4rem;
background-color: "#F7F8FA";
font-family: 'Pretendard Variable';
font-weight: 520;
color: #141414;
`;

const Text4 = styled.div`
text-align: end;
font-size: 1.4rem;
background-color: "#F7F8FA";
font-family: 'Pretendard Variable';
font-weight: 600;
color: #141414;
`;
const PartHighlight = styled.div<{part:string}>`
    font-size: 1.4rem;
    text-align: center;
    font-family: 'Pretendard Variable';
    font-weight: 510;
    width: 4.5rem;
    padding: 0.5rem 0.9rem 0.5rem 0.9rem;
    border-radius: 10px;
    ${(props) => {
        if(props.part === "PM"){
            return css`
                background-color: #FAEDCC;
            `
        } else if(props.part === "DESIGN"){
            return css`
                background-color: #DEECDC;
            `
        } else if(props.part === "FRONTEND"){
            return css`
                background-color: #D6E4EE;
            `
        } else {
            return css`
                background-color: #E6DEED;
            `
        }
    }}
`
const Check = styled.div`
background: #73ABFF;
border-radius: 10px;
width: 6rem; /* adjust as needed */
height: 3rem; /* adjust as needed */
`;
const Blank = styled.div`
width: 2rem; /* adjust as needed */
height: 3rem; /* adjust as needed */
background: "#F7F8FA";
border-radius: 10px;
`;
const Nocheck = styled.div`
background: #EAF1F9;
border-radius: 10px;
width: 6rem; /* adjust as needed */
height: 3rem; /* adjust as needed */
`;
const Nocheck2 = styled.div`
background: #F7F8FA;
border-radius: 10px;
width: 4.8rem; /* adjust as needed */
height: 3rem; /* adjust as needed */
`;
const Sticky = styled.td`
    position: sticky;
    left: 0;
`;
const Scrollable = styled.td`
    overflow-x: scroll;
    font-size: 1.4rem;
    padding-right: 18px;
`;