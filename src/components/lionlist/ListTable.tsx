import { styled } from "styled-components"
import { GridContent } from "../../styles/globalStyle"
import ListMemberRow from "./ListMemberRow"
import { memberType } from "./TestDatas"

const ListTable = (props: {memberDatas:memberType[]}) => {
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
            props.memberDatas.map((data:memberType, idx:number)=>(
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