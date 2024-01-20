import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SortQuestList from "./SortQuestList";
import { GetQuestType } from "../../dummy/datatypes";
import { getQuestForSort, patchReorder } from "../../apis/docquest";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../atom";
import SortQuestDraggableList from "./SortQuestDraggableList";

const SortQuest = () => {
  const [activeFilter, setActiveFilter] = useState("PM");
  const [questionData, setQuestionData] = useState<GetQuestType[]|undefined>();
  const [btnClicked, setBtnClicked] = useState(false);
  const accessToken = useRecoilValue(accessTokenAtom);

  useEffect(() => {
    getQuestsApi();
  }, []);

  useEffect(() => {
    getQuestsApi();
  }, [activeFilter])
  
  const handleFilterClick = (part: string) => {
    if(btnClicked){
      setBtnClicked(() => false);
    }
    setActiveFilter(part);
  };

  const handleConfirmBtnClick = () => {
    setBtnClicked(() => false);
    const data = [];
    for(let i=0;i<questionData!.length; i++){
      data.push({"id" : questionData![i].id, "sequence": i+1});
    }
    patchReorderApi(data);
  }

  const getQuestsApi = async() => {
    const result = await getQuestForSort(activeFilter, accessToken);
    if(result === false){
      console.log("error");
    } else {
      setQuestionData(result);
    }
  }

  const patchReorderApi = async(data:{id:number, sequence:number}[]) => {
    const result = await patchReorder(data, accessToken);
    if(result === false){
      console.log("error occur");
    }
  }

  return (
    <Wrapper>
      <SetFlexStart>
        <FilterWrapper>
          <FilterSelection
            className={activeFilter === "PM" ? "active" : ""}
            onClick={() => handleFilterClick("PM")}
          >
            기획
          </FilterSelection>
          <FilterSelection
            className={activeFilter === "DESIGN" ? "active" : ""}
            onClick={() => handleFilterClick("DESIGN")}
          >
            디자인
          </FilterSelection>
          <FilterSelection
            className={activeFilter === "FRONTEND" ? "active" : ""}
            onClick={() => handleFilterClick("FRONTEND")}
          >
            프론트엔드
          </FilterSelection>
          <FilterSelection
            className={activeFilter === "BACKEND" ? "active" : ""}
            onClick={() => handleFilterClick("BACKEND")}
          >
            백엔드
          </FilterSelection>
        </FilterWrapper>
        {
          btnClicked === true ? 
          <EditBtn $type={""} onClick={() => handleConfirmBtnClick()}>확정</EditBtn>
          :
          <EditBtn $type={"edit"} onClick={() => setBtnClicked(() => true)}>수정</EditBtn>
        }
        <ContentBox>
        {(btnClicked === true) ? 
          questionData && 
          <SortQuestDraggableList 
          questionData={questionData}
          setQuestionData={setQuestionData} />
          :
          questionData && <SortQuestList questionData={questionData} setQuestionData={setQuestionData} />
        }
        </ContentBox>
      </SetFlexStart>
    </Wrapper>
  );
};

export default SortQuest;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const SetFlexStart = styled.div`
  display: flex;
  flex-direction: column;
  width: 96%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.2rem;
  & > .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 1.3rem;
    background-color: rgba(234, 241, 249, 1);
    border-radius: 15px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  width: fit-content;
  margin: 2rem 0rem 0.5rem 0rem;
  padding-right: 1rem;
  padding-left: 1rem;
  gap: 1rem;
  border: 1px solid #dddddd;
  border-radius: 20px;
`;

const FilterSelection = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  color: #a0a0a0;
  padding: 0.5rem;
  border-radius: 15px;
  &.active {
    color: white;
    background-color: blue;
  }
`;

const EditBtn = styled.div<{$type:string}>`
  display: flex;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: ${props => props.$type === "edit" ? '#D9D9D9': '#EAF1F9'};
  border-radius: 30px;
  &:hover{
    cursor: pointer;
  }
`

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 72vh;
    /* border: 1px solid red; */
    border-top: 1px solid rgba(106, 199, 239, 1);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
