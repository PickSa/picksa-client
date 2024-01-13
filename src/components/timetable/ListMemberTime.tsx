import { css, styled } from "styled-components"
import { memberType } from "./ListTimeTable"
const ListMemberRow = (props:memberType) => {
  return (
    <GridContent2 className="member">
        <PartHighlight part={props.part}>{props.part}</PartHighlight>
        <div>{props.name}</div>
        {Array.from({ length: 19 }).map((_, i) => <Nocheck key={i} />)}
        
    </GridContent2>
  )
}
export default ListMemberRow
const PartHighlight = styled.div<{part:string}>`
    font-size: 1rem;
    width: fit-content;
    padding: 0.2rem 0.7rem 0.2rem 0.7rem;
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
const GridContent2 = styled.div`
    gap: 5px;
    display: grid;
    grid-template-columns: repeat(21, 1fr);
    padding-left: 5px;
    padding-right: 5px;
    font-size: 1.2rem;
    
    &.listTitle{
        font-weight: bolder;
        background-color: rgba(106, 199, 239, 0.2);
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    &.member{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #DDDDDD;
    }
`
const Check = styled.div`
background: #73ABFF;
border-radius: 10px;
    width: 100%; /* adjust as needed */
    height: 30px; /* adjust as needed */
`;
const Nocheck = styled.div`
background: #EAF1F9;
border-radius: 10px;
    width: 100%; /* adjust as needed */
    height: 30px; /* adjust as needed */
`;




