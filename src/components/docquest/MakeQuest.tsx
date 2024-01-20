import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import MakeQuestList from "./MakeQuestList";
import { getAllQuests, patchfinalQuest } from "../../apis/docquest";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../atom";
import { GetQuestType } from "../../dummy/datatypes";
import MakeQuestInput from "./MakeQuestInput";
import StatusNoticeModal from "../modals/StatusNoticeModal";

const sortTag = [
    {value: "LASTEST", label: "---기본---"},
    {value: "TAG", label: "태그순"},
];

const MakeQuest = (props:{
    delModalIsOpen:boolean,
    setDeletedId:React.Dispatch<React.SetStateAction<number|undefined>>,
    setDelModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [selectedSortTag, setSelectedSortTag] = useState<{value:string, label:string}>(sortTag[0]);
    const [questionData, setQuestionData] = useState<GetQuestType[]>();
    const [newInputData, setNewInputData] = useState(false);
    const [changedIsDetermined, setChangedIsDetermined] = useState(false);
    const [changedDetermineData, setChangedDetermineData] = useState<{id:number, isDetermined:boolean}[]>([]);
    const [statusNotiModalOpen, setStatusNotiModalOpen] = useState(false);

    const accessToken = useRecoilValue(accessTokenAtom);

    // 기본값으로(공통질문, 최신순) 질문 리스트 불러오기
    useEffect(() => {
        requestGetAllQuestApi("ALL", "LASTEST");
    }, []);

    // 필터 적용 값으로 불러오기
    useEffect(() => {
        requestGetAllQuestApi(activeFilter, selectedSortTag?.value);
        if(newInputData === true){
            setNewInputData(false);
        }
    }, [selectedSortTag, activeFilter, newInputData === true, changedIsDetermined === true, props.delModalIsOpen === false]);

    useEffect(() => {
        if(changedIsDetermined === true){
            setChangedIsDetermined(false);
        }
    }, [changedIsDetermined === true]);

    const requestGetAllQuestApi = async(part:string, order:string) => {
        const result = await getAllQuests(part, order, accessToken);
        if(result === false) {
            console.log('질문 목록 불러오기 오류 발생');
        } else {
            setQuestionData(() => result);
        }
    }

    const requestDeterminQuestApi = async(data:{id:number, isDetermined:boolean}[]) => {
        const result = await patchfinalQuest(data, accessToken);
        if(result === false) {
            console.log("error");
        } else {
            setChangedIsDetermined(() => true);
            setStatusNotiModalOpen(true);
            setTimeout(() => {
                setStatusNotiModalOpen(false);
            }, 1000);
        }
    }

    const handleFilterClick = (part:string) => {
        //해당 부분 useEffect 충분한 테스트 필요
        setQuestionData(() => undefined);
        setSelectedSortTag(() => sortTag[0]);
        setActiveFilter(part);
    }

    const handleDeterminedBtn = () => {
        requestDeterminQuestApi(changedDetermineData);
    }

  return (
    <Wrapper>
        {statusNotiModalOpen === true && <StatusNoticeModal content="선택한 질문이 확정되었습니다." />}
        <SetFlexStart>
            <FilterWrapper>
                <FilterSelection
                className={activeFilter === "ALL" ? "active" : ""}
                onClick={() => handleFilterClick("ALL")}
                >
                ALL
                </FilterSelection>
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
        </SetFlexStart>
        <MakeQuestInput 
            activeFilter={activeFilter}
            setNewInputData={setNewInputData} />
        <ContentWrapper>
            <ContentUtilBar>
                <SelectWrapper>
                    <Select className="select-box" options={(sortTag)} value={selectedSortTag} onChange={(opt)=>{opt && setSelectedSortTag(opt)}} />
                </SelectWrapper>
                <div className="btn" onClick={() => handleDeterminedBtn()}>확정 여부 등록</div>
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
                questionData && questionData.map((row, idx)=>{
                    return (
                    <MakeQuestList
                        key={`${activeFilter}-${idx}`}
                        lists={row}
                        changedDetermineData={changedDetermineData}
                        setDeletedId={props.setDeletedId}
                        setDelModalIsOpen={props.setDelModalIsOpen}
                        setChangedDetermineData={setChangedDetermineData}
                         />)
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
  margin: 2rem 0rem 0.5rem 0rem;
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

const SelectWrapper = styled.div`
  display: flex;
  width : fit-content;
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
    height: 40vh;
    /* border: 1px solid red; */
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`