import { styled } from "styled-components"
import { GridContent } from "../../styles/globalStyle"
import ListMemberRow from "./ListMemberRow"
import { LionListType } from "../../dummy/datatypes"

const ListTable = (props: {memberDatas:LionListType[], activeFilter:string, userCount:number}) => {
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
        props.activeFilter === "ALL" ? 
            props.memberDatas.map((data:LionListType, idx:number)=>(
                <ListMemberRow 
                key={idx}
                applicantId={data.applicantId}
                part={data.part}
                name={data.name}
                studentId={data.studentId}
                score={data.score}
                isEvaluated={data.isEvaluated}
                result={data.result}
                phone={data.phone}
                userCount={props.userCount}
                />
            )) 
            :
            props.memberDatas.map((data:LionListType, idx:number)=>(
                <ListMemberRow 
                key={idx}
                applicantId={data.applicantId}
                part={data.part}
                name={data.name}
                studentId={data.studentId}
                score={data.score}
                isEvaluated={data.status}
                result={data.result}
                phone={data.phone}
                userCount={props.userCount}
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