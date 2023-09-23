import { css, styled } from "styled-components"
import { GridContent } from "../../styles/globalStyle"
import { memberType } from "./ListTable"

const ListMemberRow = (props:memberType) => {
  return (
    <GridContent className="member">
        <PartHighlight part={props.part}>{props.part}</PartHighlight>
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

const PartHighlight = styled.div<{part:string}>`
    width: fit-content;
    padding: 0.2rem 0.7rem 0.2rem 0.7rem;
    border-radius: 10px;
    ${(props) => {
        if(props.part === '기획'){
            return css`
                background-color: #FAEDCC;
            `
        } else if(props.part === '디자인'){
            return css`
                background-color: #DEECDC;
            `
        } else if(props.part === '프론트엔드'){
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