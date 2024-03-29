import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Select from "react-select";
import { getPartsTags, makeQuests } from '../../apis/docquest';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../../atom';
import { DocQuestTagType } from '../../dummy/datatypes';

const MakeQuestInput = (props:{
    activeFilter: string,
    setNewInputData: React.Dispatch<React.SetStateAction<boolean>>,
    setInputBoxSize: React.Dispatch<React.SetStateAction<number|undefined>>,
}) => {
    const [inputData, setInputData] = useState('');
    const [tagList, setTagList] = useState<DocQuestTagType[]>();
    const [selectedSortTag, setSelectedSortTag] = useState<DocQuestTagType>();
    const [canPost, setCanPost] = useState(false);
    const accessToken = useRecoilValue(accessTokenAtom);

    const inputRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<any>(null);

    useEffect(() => {
        props.setInputBoxSize(inputRef.current?.offsetHeight);
    }, []);

    //등록 버튼 활성화 시키기
    useEffect(() => {
        if(selectedSortTag!==undefined && inputData!== ''){
            setCanPost(() => true);
        } else {
            setCanPost(() => false);
        }
    }, [selectedSortTag, inputData]);

    const getTagsApi = async() => {
        const result = await getPartsTags(props.activeFilter, accessToken);
        if(result === false){
            console.log("error");
        } else {
            const toTags:DocQuestTagType[] = [];
            for(let i=0;i<result.length;i++){
                toTags.push({label: result[i].content, value: result[i].id});
            }
            if(selectedSortTag){
                setSelectedSortTag(() => undefined);
                selectRef.current.clearValue();
            }
            setTagList(() => toTags);
        }
    }

    //필터 바뀔 때마다 tag 받아오기
    useEffect(() => {
        getTagsApi();
    }, [props.activeFilter]);

    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    }

    const questPostApi = async(tagId:number, content:string) => {
        const result = await makeQuests(tagId, content, accessToken);
        if(result === false){
            console.log("error");
        } else {
            setInputData('');
            props.setNewInputData(true);
        }
    }

    const handleInputClick = () => {
        if(canPost){
            questPostApi(selectedSortTag!.value, inputData);
        }
    }

  return (tagList!=undefined &&
    <InputWrapper ref={inputRef}>
        <SetFlexStart>
            <SelectWrapper>
                <Select 
                ref={selectRef}
                className="select-box" 
                options={(tagList)} 
                placeholder="질문 태그" 
                value={selectedSortTag} 
                onChange={(opt)=>{opt && setSelectedSortTag(opt)}} />
            </SelectWrapper>
        </SetFlexStart>
        <InputBox>
            <input placeholder="질문을 입력하세요" value={inputData} onChange={(e) => onChangeInput(e)} />
        </InputBox>
        <SetFlexStart $canpost={canPost}>
            <div className="btn" onClick={() => handleInputClick()}>등록</div>
        </SetFlexStart>
    </InputWrapper>
  )
}

export default MakeQuestInput

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

const SetFlexStart = styled.div<{$canpost?:boolean}>`
    display: flex;
    width: 96%;
    justify-content: flex-start;
    align-items: flex-start;
    & > .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        padding: 0.8rem 0.5rem 0.8rem 0.5rem;
        font-size: 1.3rem;
        background-color: ${props => props.$canpost === true ? 'rgba(234, 241, 249, 1)' : '#DDDDDD'};
        border-radius: 15px;
        &:hover{
            cursor: pointer;
        }
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