import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { questionForAllData, questionForBEData, questionForDesignData, questionForFEData, questionForPMData, questionType } from "../../dummy/QuestTestDatas";
import MakeQuestList from "./MakeQuestList";

const sortTag = [
    {value: "질문 태그", label: "질문 태그"},
    {value: "tag1", label: "tag1"},
    {value: "tag2", label: "tag2"},
    {value: "tag3", label: "tag3"},
];

const MakeQuest = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedSortTag, setSelectedSortTag] = useState({value: "질문 태그", label: "질문 태그"});
    const [questionData, setQuestionData] = useState<questionType[]>(questionForAllData);
    const [inputData, setInputData] = useState('');

    // const [confirmedIds, setConfirmedIds] = useState<number[]>([]);

    // useEffect(() => {
    //     for(let i=0; i<questionData.length; i++){
    //         if(questionData[i].is_confirm === true){
    //             setConfirmedIds([...confirmedIds, questionData[i].id]);
    //         }
    //     }
    // }, [questionData]);

    const handleFilterClick = (part:string) => {
        setActiveFilter(part);
    
        //아래 필터 부분 추후 route로는 백틱 이용한 형식으로 수정. 현재는 테스트용
        if(part==='all'){setQuestionData(questionForAllData)}
        else if (part==='pm'){setQuestionData(questionForPMData)}
        else if (part==='design'){setQuestionData(questionForDesignData)}
        else if (part==='fe'){setQuestionData(questionForFEData)}
        else {setQuestionData(questionForBEData)}
    }

    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    }

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
        </SetFlexStart>
        <InputWrapper>
            <SetFlexStart>
                <SelectWrapper>
                    <Select className="select-box" options={(sortTag)} value={selectedSortTag} onChange={(opt)=>{opt && setSelectedSortTag(opt)}} />
                </SelectWrapper>
            </SetFlexStart>
            <InputBox>
                <input placeholder="질문을 입력하세요" value={inputData} onChange={(e) => onChangeInput(e)} />
            </InputBox>
            <SetFlexStart>
                <div className="btn">등록</div>
            </SetFlexStart>
        </InputWrapper>
        <ContentWrapper>
            <ContentUtilBar>
                <SelectWrapper>
                    <Select className="select-box" options={(sortTag)} value={selectedSortTag} onChange={(opt)=>{opt && setSelectedSortTag(opt)}} />
                </SelectWrapper>
                <div className="btn">확정 여부 등록</div>
            </ContentUtilBar>
            <ContentInfoBar>
                <div className="is_confirm">확정 여부</div>
                <div className="tag">태그</div>
                <div className="content">질문</div>
                <div className="writer">작성자</div>
                <div className="date">작성일자</div>
                <div className="delete">삭제</div>
            </ContentInfoBar>
            <ContentBox>{
                questionData.map((row, idx)=>{
                    return (
                    <MakeQuestList 
                        key={idx} 
                        id={row.id}
                        part={row.part}
                        tag={row.tag}
                        is_confirm={row.is_confirm}
                        content={row.content}
                        writer={row.writer}
                        date={row.date} />)
                })
            }</ContentBox>
        </ContentWrapper>
    </Wrapper>
  );
};

export default MakeQuest;

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
    width: 96%;
    justify-content: flex-start;
    align-items: flex-start;
    & > .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-size: 1.3rem;
        background-color: rgba(234, 241, 249, 1);
        border-radius: 15px;
        &:hover{
            cursor: pointer;
        }
    }
`

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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 96%;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: rgba(247, 248, 250, 1);
`;

const SelectWrapper = styled.div`
  display: flex;
  width : 10%;
  height: fit-content;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1.3rem;
  padding: 0;
  margin: 0;
  /* justify-content: flex-end; */
  & > .select-box {
    width: 100%;
  }
`

const InputBox = styled.div`
    width: 96%;
    height: 6rem;
    background-color:rgba(234, 241, 249, 1);
    font-size: 1.5rem;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    & > input{
        display: flex;
        width: 100%;
        border: none;
        padding: 1rem;
        background-color: transparent;
        &:focus{
            outline: none;
        }
       flex-wrap: wrap;
    }
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 96%;
`

const ContentUtilBar = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1.2rem;
    & > .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-size: 1.3rem;
        background-color: rgba(234, 241, 249, 1);
        border-radius: 15px;
        &:hover{
            cursor: pointer;
        }
    }
`

const ContentInfoBar = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 2rem;
    background-color: rgba(234, 241, 249, 0.2);
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    &>.is_confirm{
        display: flex;
        justify-content: center;
        width: 6rem;
    }
    &>.tag{
        display: flex;
        justify-content: center;
        width: 18rem;
    }
    &>.content{
        display: flex;
        justify-content: flex-start;
        width: 67rem;
    }
    &>.writer{
        display: flex;
        justify-content: flex-start;
        width: 9rem;
    }
    &>.date{
        display: flex;
        justify-content: center;
        width: 10rem;
    }
    &>.delete{
        display: flex;
        justify-content: center;
        width: 3rem;
    }
`

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30rem;
    /* border: 1px solid red; */
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`