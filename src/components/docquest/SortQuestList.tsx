import React, { useRef, useState } from 'react'
import { questionType } from '../../dummy/QuestTestDatas'
import styled from 'styled-components'

const SortQuestList = (props:{questionData : questionType[], setQuestionData: React.Dispatch<React.SetStateAction<questionType[]>>}) => {
    const dragItem = useRef<number>();
    const dragOverItem = useRef<number>();
    const [list, setList] = useState(props.questionData);

    const dragStart = (e:React.DragEvent<HTMLDivElement>, position:number) => {
        dragItem.current = position;
        const eventTarget = e.target as HTMLElement;
        // console.log(e.target.innerHTML);
        console.log(eventTarget.innerHTML);
    }
    const dragEnter = (e:React.DragEvent<HTMLDivElement>, position:number) => {
        dragOverItem.current = position;
        const eventTarget = e.target as HTMLElement;
        // console.log(e.target.innerHTML);
        console.log(eventTarget.innerHTML);
    }
    const drop = () => {
        console.log(`drag대상1(dragItem): ${dragItem.current}, drag대상2(dragOverItem): ${dragOverItem.current}`);
        const newList = [...list];
        const dragItemValue = newList[dragItem.current!];
        newList.splice(dragItem.current!, 1);
        newList.splice(dragOverItem.current!, 0, dragItemValue);
        console.log(newList);
        setList(newList);
        dragItem.current = undefined;
        dragOverItem.current = undefined;
    }
  return (
    <Wrapper>
        {list && list.map((data, idx) => (
            <ContentRow
            key={idx}
            draggable
            onDragStart={(e)=>dragStart(e, idx)}
            onDragEnter={(e)=>dragEnter(e, idx)}
            onDragEnd={drop}
            onDragOver={(e) => e.preventDefault}>
                <div className='drag-icon'>i</div>
                <div className='tag'>{data.tag}</div>
                <div className='content'>{data.content}</div>
            </ContentRow>
        ))}
    </Wrapper>
  )
}

export default SortQuestList

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