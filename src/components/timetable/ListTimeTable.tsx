import { styled } from "styled-components"
import ListMemberRow from "./ListMemberTime"
export type memberType = {
    id:number,
    part:string,
    name:string,
}
const ListTable = () => {
    const TestData = [
        {"id" : 0, "part": "기획", "name": "박재윤", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 1, "part": "기획", "name": "유승빈", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 2, "part": "디자인", "name": "김성민", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 3, "part": "프론트엔드", "name": "박경빈", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 4, "part": "프론트엔드", "name": "윤예원", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 5, "part": "백엔드", "name": "나영경", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 6, "part": "백엔드", "name": "민병록", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 7, "part": "백엔드", "name": "박소은", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 8, "part": "백엔드", "name": "양희철", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 9, "part": "기획", "name": "박재윤", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 10, "part": "기획", "name": "유승빈", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 11, "part": "디자인", "name": "김성민", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 12, "part": "프론트엔드", "name": "박경빈", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 13, "part": "프론트엔드", "name": "윤예원", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 14, "part": "백엔드", "name": "나영경", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 15, "part": "백엔드", "name": "민병록", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 16, "part": "백엔드", "name": "박소은", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 17, "part": "백엔드", "name": "양희철", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 18, "part": "기획", "name": "박재윤", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 19, "part": "기획", "name": "유승빈", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 20, "part": "디자인", "name": "김성민", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 21, "part": "프론트엔드", "name": "박경빈", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 22, "part": "프론트엔드", "name": "윤예원", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 23, "part": "백엔드", "name": "나영경", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 24, "part": "백엔드", "name": "민병록", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 25, "part": "백엔드", "name": "박소은", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
        {"id" : 26, "part": "백엔드", "name": "양희철", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"},
    ]
  return (
    <TableWrapper>
        <GridContent2 className="listTitle">
            <div>시간</div>
            <div>(30분)</div>
            <div>9:00</div>
            <div>9:30</div>
            <div>10:00</div>
            <div>10:30</div>
            <div>11:00</div>
            <div>11:30</div>
            <div>12:00</div>
            <div>12:30</div>
            <div>13:00</div>
            <div>13:30</div>
            <div>14:00</div>
            <div>14:30</div>
            <div>15:00</div>
            <div>15:30</div>
            <div>16:00</div>
            <div>16:30</div>
        </GridContent2>
        
        {
            TestData.map((data:memberType, idx:number)=>(
                <>
                <ListMemberRow 
                key={idx}
                id={data.id}
                part={data.part}
                name={data.name}                
                />
                
                </>
            ))
            
        }
        <Container>
        </Container>
        
    </TableWrapper>
  )
}

export default ListTable
const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 97%;
    height: 700px;
    padding-left: 10px;
    padding-right: 10px;
    overflow-y: scroll; // 세로 스크롤 추가
    
`;
const GridContent2 = styled.div`
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.2rem;
    
    &.listTitle{
        font-weight: bolder;
        background-color: rgba(106, 199, 239, 0.2);
        padding-top: 1rem;
        padding-bottom: 0.3rem;
    }
    &.member{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #DDDDDD;
    }
`
const Container = styled.div`
overflow-x: scroll; // 가로 스크롤 추가
width: 100%;
`;

