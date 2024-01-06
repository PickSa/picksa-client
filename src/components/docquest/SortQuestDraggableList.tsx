import React, { useRef } from 'react'
import styled from 'styled-components'
import { GetQuestType } from '../../dummy/datatypes';
import { MdDragIndicator } from "react-icons/md";

const SortQuestDraggableList = (props:{
    questionData : GetQuestType[], 
    setQuestionData: React.Dispatch<React.SetStateAction<GetQuestType[]|undefined>>,
}) => {
    const dragItem = useRef<number>();
    const dragOverItem = useRef<number>();

    const dragStart = (e:React.DragEvent<HTMLDivElement>, position:number) => {
        dragItem.current = position;
        const eventTarget = e.target as HTMLElement;
    }
    const dragEnter = (e:React.DragEvent<HTMLDivElement>, position:number) => {
        dragOverItem.current = position;
        const eventTarget = e.target as HTMLElement;
    }
    const drop = () => {
        const newList = [...props.questionData];
        const dragItemValue = newList[dragItem.current!];
        newList.splice(dragItem.current!, 1);
        newList.splice(dragOverItem.current!, 0, dragItemValue);
        props.setQuestionData(newList);
        dragItem.current = undefined;
        dragOverItem.current = undefined;
    }
  return (
    <Wrapper>
        {props.questionData.map((data, idx) => (
            <ContentRow
            key={idx+1}
            draggable
            onDragStart={(e)=>dragStart(e, idx)}
            onDragEnter={(e)=>dragEnter(e, idx)}
            onDragEnd={drop}
            onDragOver={(e) => e.preventDefault}>
                <div className='drag-icon'><MdDragIndicator /></div>
                <div className='tag'>{data.tagContent}</div>
                <div className='content'>{data.content}</div>
            </ContentRow>
        ))}
    </Wrapper>
  )
}

export default SortQuestDraggableList

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ContentRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
    &>.drag-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5.5rem;
    }
    &>.tag{
        display: flex;
        justify-content: center;
        width: 7rem;
    }
    &>.content{
        display: flex;
        justify-content: flex-start;
        width: 180rem;
    }
`