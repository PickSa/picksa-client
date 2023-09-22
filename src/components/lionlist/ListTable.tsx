import { styled } from "styled-components"
import { GridContent } from "../../styles/globalStyle"
import ListMemberRow from "./ListMemberRow"

export type memberType = {
    id:number,
    part:string,
    name:string,
    primeNum:string,
    firstScore:string,
    firstResult:string,
    firstState:string,
    phone:string,
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
        {"id" : 8, "part": "백엔드", "name": "양희철", "primeNum": "2023XXXX", "firstScore": "4/10", "firstResult": "합격", "firstState": "평가완료", "phone": "010-XXXX-XXXX"}
    ]
  return (
    <TableWrapper>
        <GridContent className="listTitle">
            <div>지원파트</div>
            <div>이름</div>
            <div>학번</div>
            <div>1차 점수</div>
            <div>1차 결과</div>
            <div>1차 평가상태</div>
            <div>전화번호</div>
        </GridContent>
        {
            TestData.map((data:memberType, idx:number)=>(
                <ListMemberRow 
                key={idx}
                id={data.id}
                part={data.part}
                name={data.name}
                primeNum={data.primeNum}
                firstScore={data.firstScore}
                firstResult={data.firstResult}
                firstState={data.firstState}
                phone={data.phone}
                />
            ))
        }
    </TableWrapper>
  )
}

export default ListTable

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
`