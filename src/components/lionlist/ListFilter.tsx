import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"
import { memberType, TestDatasall, TestDataspm, TestDatasdesign, TestDatasfe, TestDatasbe } from "./TestDatas";
import Select from "react-select"
import { useEffect, useState } from "react";

const sortOpt = [
  {value: "-----기본-----", label: "-----기본-----"},
  {value: "1차 점수 높은순", label: "1차 점수 높은 순"},
  {value: "1차 결과순", label: "1차 결과순"},
  {value: "1차 평가상태순", label: "1차 평가상태순"},
]

type FilterProps = {
  activeFilter : string;
  memberDatas : memberType[];
  setActiveFilter : React.Dispatch<React.SetStateAction<string>>;
  setMemberDatas : React.Dispatch<React.SetStateAction<memberType[]>>;
}

const ListFilter = (props:FilterProps) => {
  const [selectedSort, setSelectedSort] = useState({value: "-----기본-----", label: "-----기본-----"});
  useEffect(() => {
    console.log(selectedSort);
  }, [selectedSort])
  const handleFilterClick = (part:string) => {
    props.setActiveFilter(part);

    //아래 필터 부분 추후 route로는 백틱 이용한 형식으로 수정. 현재는 테스트용
    if(part==='all'){props.setMemberDatas(TestDatasall)}
    else if (part==='pm'){props.setMemberDatas(TestDataspm)}
    else if (part==='design'){props.setMemberDatas(TestDatasdesign)}
    else if (part==='fe'){props.setMemberDatas(TestDatasfe)}
    else {props.setMemberDatas(TestDatasbe)}
  }
  return (
    <SpaceBetweenFlex>
      <FilterWrapper>
        <FilterSelection className={props.activeFilter==="all" ? "active" : ""} onClick={() => handleFilterClick("all")}>ALL</FilterSelection>
        <FilterSelection className={props.activeFilter==="pm" ? "active" : ""} onClick={() => handleFilterClick("pm")}>기획</FilterSelection>
        <FilterSelection className={props.activeFilter==="design" ? "active" : ""} onClick={() => handleFilterClick("design")}>디자인</FilterSelection>
        <FilterSelection className={props.activeFilter==="fe" ? "active" : ""} onClick={() => handleFilterClick("fe")}>프론트엔드</FilterSelection>
        <FilterSelection className={props.activeFilter==="be" ? "active" : ""} onClick={() => handleFilterClick("be")}>백엔드</FilterSelection>
      </FilterWrapper>
      <SelectWrapper>
        <Select className="select-box" options={(sortOpt)} value={selectedSort} onChange={(opt)=>{opt && setSelectedSort(opt)}}/>
      </SelectWrapper>
    </SpaceBetweenFlex>
  )
}

const FilterWrapper = styled.div`
  display: flex;
  width : fit-content;
  margin: 0.5rem 1rem 0.5rem 1rem;
  padding-right: 1rem;
  padding-left: 1rem;
  gap: 0.5rem;
  border: 1px solid #DDDDDD;
  border-radius: 20px;
`

const FilterSelection = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  color: #A0A0A0;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 15px;
  &.active{
    color: white;
    background-color: rgba(3, 104, 255, 1);
  }
  &:hover{
    cursor: pointer;
  }
`

const SelectWrapper = styled.div`
  display: flex;
  width : 10%;
  justify-content: flex-end;
  & > .select-box {
    width: 100%;
  }
`

export default ListFilter