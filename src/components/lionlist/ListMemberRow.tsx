import { css, styled } from "styled-components"
import { GridContent } from "../../styles/globalStyle"
import { useNavigate } from "react-router-dom"

type ListMemberRowType = {
    applicantId: number,
    part: string,
    name: string,
    studentId: string,
    score: number,
    isEvaluated: boolean|string,
    result: string,
    phone: string,
    userCount: number,
}

const ListMemberRow = (props:ListMemberRowType) => {
    const router = useNavigate();
  return (
    <GridContent className="member" onClick={()=>{router(`${props.applicantId}`)}}>
        <PartHighlight $part={props.part}>
            {props.part === "PM" ? "기획"
            : props.part === "DESIGN" ? "디자인"
            : props.part === "FRONTEND" ? "프론트엔드"
            : "백엔드"}
        </PartHighlight>
        <div>{props.name}</div>
        <div>{props.studentId}</div>
        <div>{`${props.score}/${props.userCount}`}</div>
        <div>{props.result === "PASS" ? "합격" : props.result === "PENDING" ? "미정" : "불합격"}</div>
        <div>
            {
            // typeof(props.isEvaluated) === "string" ?
            // props.isEvaluated
            // :
            props.isEvaluated ? "평가완료" : "평가진행중"}</div>
        <div>{props.phone}</div>
    </GridContent>
  )
}

export default ListMemberRow

const PartHighlight = styled.div<{$part:string}>`
    width: fit-content;
    padding: 0.2rem 0.7rem 0.2rem 0.7rem;
    border-radius: 10px;
    ${(props) => {
        if(props.$part === 'PM'){
            return css`
                background-color: #FAEDCC;
            `
        } else if(props.$part === 'DESIGN'){
            return css`
                background-color: #DEECDC;
            `
        } else if(props.$part === 'FRONTEND'){
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