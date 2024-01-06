import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"
import Select from "react-select"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../atom";
import { LionListType } from "../../dummy/datatypes";
import { getAllLists, getPartLists } from "../../apis/lionlist";

//파트 ALL일시, 드롭다운 리스트
const sortAllOpt = [
  {value: "", label: "-----기본-----"},
  {value: "RESULT", label: "1차 결과순"},
  {value: "STATUS", label: "1차 평가상태순"},
];

//파트 특정 시, 드롭다운 리스트
const sortPartOpt = [
  {value: "", label: "-----기본-----"},
  {value: "SCORE", label: "1차 점수 높은 순"},
  {value: "RESULT", label: "1차 결과순"},
  {value: "STATUS", label: "1차 평가상태순"},
];

//props type
type FilterProps = {
  activeFilter : string;
  memberDatas : LionListType[];
  setActiveFilter : React.Dispatch<React.SetStateAction<string>>;
  setMemberDatas : React.Dispatch<React.SetStateAction<LionListType[]|undefined>>;
}

const ListFilter = (props:FilterProps) => {
  const [selectedSort, setSelectedSort] = useState(sortAllOpt[0]);
  const accessToken = useRecoilValue(accessTokenAtom);

  //All, part별 통합 api 호출 함수
  const getListApiUni = async(part:string, order:string) => {
    if(part === "ALL"){
      const result = await getAllLists(order, accessToken);
      if(result === false){console.log("error")}
      else {
        props.setMemberDatas(result.applicants);
      }
    } else {
      const result = await getPartLists(part, order, accessToken);
      if(result === false){console.log("error")}
      else {
        console.log(result.applicants);
        props.setMemberDatas(result.applicants);
      }
    }
  }

  // 필터값(파트별, 드롭다운)변화에 따른 리스트 호출 통합
  useEffect(() => {
    getListApiUni(props.activeFilter, selectedSort.value);
  }, [selectedSort, props.activeFilter])

  // part 필터 선택 관련 logic
  const handlePartFilterClick = (part:string) => {
    //파트 바뀔 때마다 기본값으로
    setSelectedSort(() => sortAllOpt[0]);
    props.setActiveFilter(() => part);
  }


  return (
    <SpaceBetweenFlex>
      <FilterWrapper>
        <FilterSelection className={props.activeFilter==="ALL" ? "active" : ""} onClick={() => handlePartFilterClick("ALL")}>ALL</FilterSelection>
        <FilterSelection className={props.activeFilter==="PM" ? "active" : ""} onClick={() => handlePartFilterClick("PM")}>기획</FilterSelection>
        <FilterSelection className={props.activeFilter==="DESIGN" ? "active" : ""} onClick={() => handlePartFilterClick("DESIGN")}>디자인</FilterSelection>
        <FilterSelection className={props.activeFilter==="FRONTEND" ? "active" : ""} onClick={() => handlePartFilterClick("FRONTEND")}>프론트엔드</FilterSelection>
        <FilterSelection className={props.activeFilter==="BACKEND" ? "active" : ""} onClick={() => handlePartFilterClick("BACKEND")}>백엔드</FilterSelection>
      </FilterWrapper>
      <SelectWrapper>
        {
          props.activeFilter === "ALL" ?
          <Select className="select-box" options={(sortAllOpt)} value={selectedSort} onChange={(opt)=>{opt && setSelectedSort(opt)}}/>
          :
          <Select className="select-box" options={(sortPartOpt)} value={selectedSort} onChange={(opt)=>{opt && setSelectedSort(opt)}}/>
        }
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