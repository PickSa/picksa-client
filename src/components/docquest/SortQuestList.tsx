import React from 'react'
import styled from 'styled-components'
import { GetQuestType } from '../../dummy/datatypes';
import { MdDragIndicator } from "react-icons/md";

const SortQuestList = (props:{questionData : GetQuestType[], setQuestionData: React.Dispatch<React.SetStateAction<GetQuestType[]|undefined>>}) => {
    
  return (
    <Wrapper>
        {props.questionData && props.questionData.map((data, idx) => (
            <ContentRow key={idx}>
                <div className='drag-icon'><MdDragIndicator/></div>
                <div className='tag'>{data.tagContent}</div>
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