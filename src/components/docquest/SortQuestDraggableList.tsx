import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { GetQuestType } from '../../dummy/datatypes';
import { MdDragIndicator } from "react-icons/md";
import StatusNoticeModal from '../modals/StatusNoticeModal';

const SortQuestDraggableList = (props:{
    questionData : GetQuestType[], 
    setQuestionData: React.Dispatch<React.SetStateAction<GetQuestType[]|undefined>>,
}) => {
    const [modalText, setModalText] = useState<string|undefined>();
    
    const dragItem = useRef<number>();
    const dragOverItem = useRef<number>();
    const dragOverElement = useRef<HTMLElement>();

    const dragStart = (e:React.DragEvent<HTMLDivElement>, position:number) => {
        dragItem.current = position;
    }
    const dragEnter = (e:React.DragEvent<HTMLDivElement>, position:number) => {
        e.preventDefault();
        dragOverItem.current = position;
        dragOverElement.current = e.target as HTMLElement;
        dragOverElement.current.style.marginTop = "20px";
    }
    const dragLeave = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragOverElement.current = e.target as HTMLElement;
        dragOverElement.current.style.marginTop = "0px";
    }
    const drop = () => {
        if(props.questionData[dragItem.current!].part === props.questionData[dragOverItem.current!].part){
            const newList = [...props.questionData];
            const dragItemValue = newList[dragItem.current!];
            newList.splice(dragItem.current!, 1);
            newList.splice(dragOverItem.current!, 0, dragItemValue);
            props.setQuestionData(newList);
            dragItem.current = undefined;
            dragOverItem.current = undefined;
        } else {
            setModalText("공통 질문은 상위에만 존재할 수 있습니다.");
            setTimeout(() => {
                setModalText(undefined);
            }, 1000);
            dragItem.current = undefined;
            dragOverItem.current = undefined;
        }
        dragOverElement.current!.style.marginTop = "0px";
        dragOverElement.current = undefined;
    }

  return (
    <Wrapper>
        {
            modalText && <StatusNoticeModal content={modalText}/>
        }
        {props.questionData.map((data, idx) => (
            <ContentRow
            key={idx+1}
            draggable
            onDragStart={(e)=>dragStart(e, idx)}
            onDragEnter={(e)=>dragEnter(e, idx)}
            onDragLeave={(e)=>dragLeave(e)}
            onDragEnd={drop}
            onDragOver={(e) => e.preventDefault}>
                <div className='drag-icon'><MdDragIndicator /></div>
                <div className='part'>
                    {data.part === "ALL" ? "공통"
                    : data.part === "PM" ? "기획"
                    : data.part === "DESIGN" ? "디자인"
                    : data.part === "FRONTEND" ? "프론트엔드" : "백엔드"}
                </div>
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
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
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
    &>.part{
        display: flex;
        justify-content: flex-start;
        width: 9rem;
    }
    &>.tag{
        display: flex;
        justify-content: flex-start;
        width: 6rem;
    }
    &>.content{
        display: flex;
        justify-content: flex-start;
        width: 70%;
    }
`