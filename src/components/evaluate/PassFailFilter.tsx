import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"
import Select from "react-select"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../atom";
import {patchLeaderPassFail} from "../../apis/Evaluate/PassFailComments"
const sortOpt = [
  {value: "PASS", label: " 합격 "},
  {value: "FAILURE", label: " 불합격 "},
  {value: "PENDING", label: " 미정 "},
]


const ListFilter = () => {
  const [selectedSort, setSelectedSort] = useState(sortOpt[0]);
  const accessToken = useRecoilValue(accessTokenAtom);
  const applicant_id = 1;
  useEffect(() => {
    if (selectedSort){
      patchLeaderPassFail(applicant_id, accessToken, selectedSort.value);
    }
    console.log(selectedSort);
  }, [selectedSort])
  
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
const SelectWrapper = styled.div`
  display: flex;
  width : 120px;
  justify-content: flex-end;
   & > .select-box {
     width: 100%;
   }

`
export default ListFilter