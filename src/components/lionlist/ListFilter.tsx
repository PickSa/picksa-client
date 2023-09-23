import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"

const ListFilter = () => {
  return (
    <SpaceBetweenFlex>
      <FilterWrapper>
        <FilterSelection>ALL</FilterSelection>
        <FilterSelection>기획</FilterSelection>
        <FilterSelection>디자인</FilterSelection>
        <FilterSelection>프론트엔드</FilterSelection>
        <FilterSelection>백엔드</FilterSelection>
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
  /* background-color: blue; */
`

export default ListFilter