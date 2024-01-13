import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"
import Select from "react-select"
import { useEffect, useState } from "react";

const sortOpt = [
  {value: "PASS", label: " 합격 "},
  {value: "FAILURE", label: " 불합격 "},
  {value: "PENDING", label: " 미정 "},
]

const PassFailFilter = (props:{selectedOpt:string}) => {
  const [selectedSort, setSelectedSort] = useState(
    props.selectedOpt === "PASS" ? sortOpt[0] :
    props.selectedOpt === "FAILURE" ? sortOpt[1] :
    sortOpt[2]
  );

  useEffect(() => {
    setSelectedSort(() => 
      props.selectedOpt === "PASS" ? sortOpt[0] :
      props.selectedOpt === "FAILURE" ? sortOpt[1] :
      sortOpt[2]
    );
  }, [props.selectedOpt])

  return (
    <SpaceBetweenFlex>
      <SelectWrapper>
        <Select 
        className="select-box" 
        options={(sortOpt)} 
        value={selectedSort} 
        onChange={(opt)=>{opt && setSelectedSort(opt)}}/>
      </SelectWrapper>
    </SpaceBetweenFlex>
  )
}
export default PassFailFilter;
const SelectWrapper = styled.div`
  display: flex;
  width : 120px;
  justify-content: flex-end;
   & > .select-box {
     width: 100%;
     font-size: 1rem;
     font-weight: 600;
   }

`