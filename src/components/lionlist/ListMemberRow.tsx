import { styled } from "styled-components"
import { GridContent } from "../../styles/globalStyle"
import { memberType } from "./ListTable"

const ListMemberRow = (props:memberType) => {
  return (
    <GridContent className="member">
        <PartHighlight className={props.part}>{props.part}</PartHighlight>
        <div>{props.name}</div>
        <div>{props.primeNum}</div>
        <div>{props.firstScore}</div>
        <div>{props.firstResult}</div>
        <div>{props.firstState}</div>
        <div>{props.phone}</div>
    </GridContent>
  )
}

export default ListMemberRow

const PartHighlight = styled.div`
    width: fit-content;
    padding: 0.2rem 0.7rem 0.2rem 0.7rem;
    border-radius: 10px;
    &.기획{
        background-color : #FAEDCC;
    }
    &.디자인{
        background-color : #DEECDC;
    }
    &.프론트엔드{
        background-color : #D6E4EE;
    }
    &.백엔드{
        background-color : #E6DEED;
    }
`