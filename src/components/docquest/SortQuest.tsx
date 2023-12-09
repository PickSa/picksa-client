import React, { useState } from "react";
import styled from "styled-components";
import {
  questionForAllData,
  questionForBEData,
  questionForDesignData,
  questionForFEData,
  questionForPMData,
  questionType,
} from "../../dummy/QuestTestDatas";
import SortQuestList from "./SortQuestList";

const SortQuest = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [questionData, setQuestionData] =
    useState<questionType[]>(questionForAllData);
  const handleFilterClick = (part: string) => {
    setActiveFilter(part);

    //아래 필터 부분 추후 route로는 백틱 이용한 형식으로 수정. 현재는 테스트용
    if (part === "all") {
      setQuestionData(questionForAllData);
    } else if (part === "pm") {
      setQuestionData(questionForPMData);
    } else if (part === "design") {
      setQuestionData(questionForDesignData);
    } else if (part === "fe") {
      setQuestionData(questionForFEData);
    } else {
      setQuestionData(questionForBEData);
    }
  };

  return (
    <Wrapper>
      <SetFlexStart>
        <FilterWrapper>
          <FilterSelection
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => handleFilterClick("all")}
          >
            ALL
          </FilterSelection>
          <FilterSelection
            className={activeFilter === "pm" ? "active" : ""}
            onClick={() => handleFilterClick("pm")}
          >
            기획
          </FilterSelection>
          <FilterSelection
            className={activeFilter === "design" ? "active" : ""}
            onClick={() => handleFilterClick("design")}
          >
            디자인
          </FilterSelection>
          <FilterSelection
            className={activeFilter === "fe" ? "active" : ""}
            onClick={() => handleFilterClick("fe")}
          >
            프론트엔드
          </FilterSelection>
          <FilterSelection
            className={activeFilter === "be" ? "active" : ""}
            onClick={() => handleFilterClick("be")}
          >
            백엔드
          </FilterSelection>
        </FilterWrapper>
        <ContentBox>
          <SortQuestList questionData={questionData} setQuestionData={setQuestionData} />
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
  margin: 0.5rem 1rem 0.5rem 1rem;
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

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 59rem;
    /* border: 1px solid red; */
    border-top: 1px solid rgba(106, 199, 239, 1);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
