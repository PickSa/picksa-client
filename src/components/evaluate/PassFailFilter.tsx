import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"
import Select from "react-select"
import { useEffect, useState } from "react";

const sortOpt = [
  {value: " 합격 ", label: " 합격 "},
  {value: " 불합격 ", label: " 불합격 "},
  {value: " 미정 ", label: " 미정 "},
]


const ListFilter = () => {
  const [selectedSort, setSelectedSort] = useState({value: "-----합격-----", label: "-----합격-----"});
  useEffect(() => {
    console.log(selectedSort);
  }, [selectedSort])
  
  return (
    <SpaceBetweenFlex>
      <SelectWrapper>
        <Select className="select-box" options={(sortOpt)} value={selectedSort} onChange={(opt)=>{opt && setSelectedSort(opt)}}/>
      </SelectWrapper>
    </SpaceBetweenFlex>
  )
}

// const FilterWrapper = styled.div`
//   display: flex;
//   width : fit-content;
//   margin: 0.5rem 1rem 0.5rem 1rem;
//   padding-right: 1rem;
//   padding-left: 1rem;
//   gap: 1rem;
//   border: 1px solid #DDDDDD;
//   border-radius: 20px;
// `

// const FilterSelection = styled.div`
//   display: flex;
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #A0A0A0;
//   padding: 0.5rem;
//   border-radius: 15px;
//   &.active{
//     color: white;
//     background-color: blue;
//   }
// `

const SelectWrapper = styled.div`
  display: flex;
  width : 120px;
  justify-content: flex-end;
   & > .select-box {
     width: 100%;
   }

`

export default ListFilter