import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"
import { useState } from "react"

const ListFilter = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleFilterClick = (part:string) => {
    setActiveFilter(part);
  }
  return (
    <SpaceBetweenFlex>
      <FilterWrapper>
        <FilterSelection className={activeFilter==="all" ? "active" : ""} onClick={() => handleFilterClick("all")}>ALL</FilterSelection>
        <FilterSelection className={activeFilter==="pm" ? "active" : ""} onClick={() => handleFilterClick("pm")}>기획</FilterSelection>
        <FilterSelection className={activeFilter==="design" ? "active" : ""} onClick={() => handleFilterClick("design")}>디자인</FilterSelection>
        <FilterSelection className={activeFilter==="fe" ? "active" : ""} onClick={() => handleFilterClick("fe")}>프론트엔드</FilterSelection>
        <FilterSelection className={activeFilter==="be" ? "active" : ""} onClick={() => handleFilterClick("be")}>백엔드</FilterSelection>
      </FilterWrapper>
      <div>dropdown</div>
    </SpaceBetweenFlex>
  )
}

const FilterWrapper = styled.div`
  display: flex;
  width : fit-content;
  margin: 0.5rem 1rem 0.5rem 1rem;
  padding-right: 1rem;
  padding-left: 1rem;
  gap: 1rem;
  border: 1px solid #DDDDDD;
  border-radius: 20px;
`

const FilterSelection = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  color: #A0A0A0;
  padding: 0.5rem;
  border-radius: 15px;
  &.active{
    color: white;
    background-color: blue;
  }
`

export default ListFilter