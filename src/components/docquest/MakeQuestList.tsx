import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GetQuestType } from '../../dummy/datatypes';
import { FaTrash } from "react-icons/fa6";

const MakeQuestList = (props:{
    index:number,
    lists: GetQuestType,
    changedDetermineList:GetQuestType[],
    setDeletedId:React.Dispatch<React.SetStateAction<number|undefined>>,
    setDelModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setChangedDetermineList:React.Dispatch<React.SetStateAction<GetQuestType[]>>,
}) => {
    const [isChecked, setIsChecked] = useState(props.lists.isDetermined);

    useEffect(() => {
        // console.log(props.index);
        handleDeterminedChanged();
        console.log(props.changedDetermineList);
    }, [isChecked]);

    const handleDeterminedChanged = () => {
        const list = props.changedDetermineList;
        list.splice(props.index, 1);
        list.splice(props.index, 0, {
            id:props.lists.id,
            sequence: props.lists.sequence,
            isDetermined: isChecked,
            createdAt: props.lists.createdAt,
            content: props.lists.content,
            tagId: props.lists.tagId,
            tagContent: props.lists.tagContent,
            writerId: props.lists.writerId,
            writerName: props.lists.writerName,
        });
        props.setChangedDetermineList(() => list);
    }

    const onChangeInput = () => {
        setIsChecked(() => !isChecked);
    };
    const onClickDelete = () => {
        props.setDeletedId(props.lists.id);
        props.setDelModalIsOpen(true);
    };
  return (
    <ContentRow>
        <div className="is_confirm">
            <input type='checkbox' checked={isChecked} onChange={onChangeInput} />
        </div>
        <div className="tag">{props.lists.tagContent}</div>
        <div className="content">{props.lists.content}</div>
        <div className="writer">{props.lists.writerName}</div>
        <div className="date">{(String(props.lists.createdAt)).split('T')[0]}</div>
        <div className="delete" onClick={() => onClickDelete()}><FaTrash /></div>
    </ContentRow>
  )
}

export default MakeQuestList

const ContentRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
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
        &:hover{
            cursor: pointer;
        }
    }
`