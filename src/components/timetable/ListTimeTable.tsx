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
    const [applicantLists, setApplicantLists] = useState<applicantsType[]>();
    const accessToken = useRecoilValue(accessTokenAtom);
    useEffect(() => {
        async function fetchIntervieweeData() {
          const result = await getInterviewee(accessToken);
          setApplicantLists(result.applicants);
          console.log(result.applicants[0].available);
          setScheduleDay1(result.schedules[0]);
          console.log(scheduleDay1);
        }    
        fetchIntervieweeData();
      }, []);
      const getTimeSlots = (start: string, end: string) => {
        const timeSlots = [];
        let current = new Date(`1970-01-01T${start}Z`);
        const finish = new Date(`1970-01-01T${end}Z`);

        while (current <= finish) {
            timeSlots.push(current.toISOString().slice(11,16));
            current.setMinutes(current.getMinutes() + 30);
        }
        return timeSlots;
    };
      const start = scheduleDay1 ? scheduleDay1.startAt : "12:00:00";
      const finish = scheduleDay1 ? scheduleDay1.finishAt : "22:00:00";
      const timeSlots = getTimeSlots(start, finish);
  return (
    <TableWrapper>
        
         <Table2>
            <tbody>  
            <ListTitle2>
            <Text>시간</Text>
            <Text>(30분)</Text></ListTitle2>                  
                {
                    applicantLists && applicantLists.map((data: memberType, idx:number)=>(
                        <>
                        <tr key={idx}>
                            <Text><PartHighlight part={data.part}>{data.part}</PartHighlight></Text>
                            <Text>{data.name}</Text>
                        </tr>
                        </>
                    ))            
                }    
            </tbody>            
        </Table2>          
        <Scrollable> 
            <Table>
                <tbody>
                <ListTitle2>
                    {timeSlots.map((time, index) => (
                        <Text key={index}>{time}</Text>
                    ))}
                </ListTitle2>
                        {
                            applicantLists && applicantLists.map((data: memberType, idx:number)=>(
                                <>    
                                <tr key={idx}>  
                                            
                                {timeSlots.map((_, i) => {
                                    if (data.available) {
                                        const availabilityArray = data.available.split('');
                                        const isAvailable = availabilityArray[i];
                                        return <td key={i}>{isAvailable === '1' ? <Check /> : <Nocheck />}</td>
                                    } 
                                    // 'available' 값이 없으면 <Nocheck />를 렌더링
                                    else {
                                        return <td key={i}><Nocheck /></td>
                                    }
                                })}
                                </tr>
                                
                                </>
                            ))            
                        }  </tbody>
                </Table>  
                </Scrollable>     
    </TableWrapper>
  )
}
export default ListTable
const TableWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 97%;
    padding-left: 10px;
    padding-right: 10px;
    overflow-y: scroll; // 세로 스크롤 추가
    
`;
const GridContent2 = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.2rem;

`
const Table = styled.table`
width: 100%

`;
const Table2 = styled.table`
width: 50rem;
`;
const ListTitle2 = styled.tr`
justify-content: center;
`;
const ListTitle = styled.tr`
// display: flex;
// flex-direction: row;
// width: 100%
// gap: 5rem;
// flex-wrap: wrap;
//     padding-left: 10px;
//     padding-right: 10px;
//     font-size: 1.2rem;
//     font-weight: bolder;
//     background-color: rgba(106, 199, 239, 0.2);
//     padding-top: 1rem;
//     padding-bottom: 0.3rem;
`;
const MemberList = styled.div`
gap: 5rem;
display: flex;
flex-direction: row;
flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.2rem;
    padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #DDDDDD;
`;
const Container = styled.div`
overflow-x: scroll; // 가로 스크롤 추가
width: 100%;
`;
const Text = styled.td`
width: 7rem;
`;
const PartHighlight = styled.div<{part:string}>`
    font-size: 1rem;
    width: 5rem;
    padding: 0.4rem 0.9rem 0.4rem 0.9rem;
    border-radius: 10px;
    height: 15px;
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
height: 2.5rem; /* adjust as needed */
`;
const Nocheck = styled.div`
background: #EAF1F9;
border-radius: 10px;
    width: 6rem; /* adjust as needed */
    height: 2.5rem; /* adjust as needed */
`;
const Sticky = styled.td`
    position: sticky;
    left: 0;
`;

const Scrollable = styled.td`
    overflow-x: scroll;
    overflow-y: scroll;
`;