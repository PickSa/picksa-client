import { styled } from "styled-components"
import { SpaceBetweenFlex } from "../../styles/globalStyle"
import Select from "react-select"
import { useEffect, useState } from "react";
import { UserInfoAtom, accessTokenAtom } from "../../atom";
import { useRecoilValue } from "recoil";
import { patchLeaderPassFail } from "../../apis/Evaluate/PassFailComments";

const sortOpt = [
  {value: "PASS", label: " 합격 "},
  {value: "FAILURE", label: " 불합격 "},
  {value: "PENDING", label: " 미정 "},
]

const PassFailFilter = (props:{selectedOpt:string, currentId:string}) => {
  const userinfo = useRecoilValue(UserInfoAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
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

  const handleSelectedSort = (opt: {
    value: string;
    label: string;
}) => {
    const patchFinalEval = async(opt:{
      value: string;
      label: string;
    }) => {
      const response = await patchLeaderPassFail(props.currentId!, accessToken, opt.value);
      if(response === '파트가 일치하지 않습니다.'){
        alert(response);
      } else if(response !== false) {
        setSelectedSort(() => opt);
      }
    }
    patchFinalEval(opt);
  }

  return (
    <SpaceBetweenFlex>
      <SelectWrapper>
        {userinfo.user.userrole === "파트장" ? 
        <Select 
        className="select-box" 
        options={(sortOpt)} 
        value={selectedSort} 
        onChange={(opt)=>{opt && handleSelectedSort(opt)}}/>
      :
      <div className="select-text">{selectedSort.label}</div>}
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
     font-size: 1.4rem;
     font-weight: 600;
   }
   & > .select-text {
    display : flex;
    width: 100%;
    font-weight: 600;
    font-size: 1.4rem;
   }

`