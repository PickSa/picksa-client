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
    const [applicantLists, setApplicantLists] = useState<applicantsType[]>();
    const accessToken = useRecoilValue(accessTokenAtom);
    useEffect(() => {
        async function fetchIntervieweeData() {
          const result = await getInterviewee(accessToken);
          console.log(result);
          setApplicantLists(result.applicants);
          setScheduleDay1(result.schedules[0]);
          setScheduleDay2(result.schedules[1]);
          console.log(result.schedules[1]);
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
      const start1 = scheduleDay1 ? scheduleDay1.startAt : "12:00:00";
      const finish1 = scheduleDay1 ? scheduleDay1.finishAt : "22:00:00";
      const start2 = scheduleDay2 ? scheduleDay2.startAt : "12:00:00";
      const finish2 = scheduleDay2 ? scheduleDay2.finishAt : "22:00:00";
      const timeSlots1 = getTimeSlots(start1, finish1);
      const timeSlots2 = getTimeSlots(start2, finish2);
    const formatDate = (date: string) =>{
        const d= new Date(date);
        return `${d.getMonth()+1}/${d.getDate()}`
    }
  return (
    <TableWrapper>       
         <Table2>
            <tbody>  
                <ListTitle2><td style={{ color: 'red' }}>날짜</td></ListTitle2>
                <ListTitle2>시간</ListTitle2>       
                {
                    applicantLists && applicantLists.map((data: memberType, idx:number)=>(
                        <>
                        <tr key={idx}>
                            <Text><PartHighlight part={data.part}>{getPartName(data.part)}</PartHighlight></Text>
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

                    {timeSlots1.map((_, index) => {
                        if (index === 0) {
                            return <Td1 style={{ color: 'red' }}>{scheduleDay1 ? formatDate(scheduleDay1.date) : ""}</Td1>;
                        }
                        else {
                            return <td style={{width: '2em'}}></td>;
                        }
                    })}
                    {timeSlots2.map((_, index) => {
                        if (index === 0) {
                            return <Td1 style={{ color: 'red' }}>{scheduleDay2 ? formatDate(scheduleDay2.date) : ""}</Td1>;
                        }
                        else {
                            return <td style={{width: '2em'}}></td>;
                        }
                    })}
                    

                <tr>
                    {timeSlots1.map((time, index) => (
                        <Td1 key={index}>{time}</Td1>
                    ))}
                    {timeSlots2.map((time, index) => (
                        <Td1 key={index}>{time}</Td1>
                    ))}
                </tr>
                        {
                            
                            applicantLists && applicantLists.map((data: memberType, idx:number)=>(
                                   
                                <ListTitle3 key={idx}>  
                                            
                                {timeSlots1.map((_, i) => {
                                    if (data.available) {
                                        const availabilityArray = data.available.split('');
                                        const isAvailable = availabilityArray[i];
                                        return <Td key={i}>{isAvailable === '1' ? <Check /> : <Nocheck />}</Td>
                                    } 
                                    // 'available' 값이 없으면 <Nocheck />를 렌더링
                                    else {
                                        return <Td key={i}><Nocheck /></Td>
                                    }
                                })}
                                   
                                            
                                {timeSlots2.map((_, i) => {
                                    if (data.available) {
                                        const availabilityArray = data.available.split('');
                                        const isAvailable = availabilityArray[i];
                                        return <Td key={i}>{isAvailable === '1' ? <Check /> : <Nocheck />}</Td>
                                    } 
                                    // 'available' 값이 없으면 <Nocheck />를 렌더링
                                    else {
                                        return <Td key={i}><Nocheck /></Td>
                                    }
                                })}  
                                </ListTitle3>                               
                                
                            ))                                      
                        }  
                        
                    </tbody>                    
                </Table>  
                </Scrollable>     
    </TableWrapper>
  )
}
function getPartName(part:string){
    switch(part){
        case "PM":
            return "기획";
        case "DESIGN":
            return "디자인";
        case "FRONTEND":
            return "프론트엔드";
        case "BACKEND":
            return "백엔드";
    }
}
export default ListTable
const TableWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 98%;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.2rem;
    overflow-y: scroll;

    
`;
const GridContent2 = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.9rem;

`
const Table = styled.table`
width: 100%
gap: 0.3rem;
`;
const Table2 = styled.table`
width: 18rem;
text-align: center;
font-size: 1.4rem;
`;
const ListTitle2 = styled.tr`
justify-content: center;
padding-left: 3rem;
font-size: 1.4rem;
`;
const ListTitle4 = styled.tr`
gap: 5rem;
`;
const ListTitle3 = styled.tr`
padding-top: 1rem;
gap: 5rem;
`;
const Td = styled.td`
padding-top: 2rem;
font-size: 1.4rem;
`;
const Td1 = styled.td`
padding-bottom: 0.5rem;
font-size: 1.4rem;
`;
const ListTitle = styled.tr`
padding-bottom: 1rem;

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
const Text = styled.td`
width: 6rem;
font-size: 1.4rem;
`;
const Text1 = styled.td`
width: 5rem;
padding-bottom: 0.5rem;
`;
const PartHighlight = styled.div<{part:string}>`
    font-size: 1.4rem;
    width: 4.5rem;
    padding: 0.5rem 0.5rem 0.5rem 0.9rem;
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
width: 5rem; /* adjust as needed */
height: 3rem; /* adjust as needed */
`;
const Nocheck = styled.div`

background: #EAF1F9;
border-radius: 10px;
width: 5rem; /* adjust as needed */
height: 3rem; /* adjust as needed */
`;
const Sticky = styled.td`
    position: sticky;
    left: 0;
`;

const Scrollable = styled.td`
    overflow-x: scroll;
    
    padding: 5px;
    font-size: 1.4rem;
`;