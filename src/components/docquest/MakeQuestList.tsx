import React, { useState } from 'react'
import styled from 'styled-components'
import { questionType } from '../../dummy/QuestTestDatas'

const MakeQuestList = (props:questionType) => {
    const [isChecked, setIsChecked] = useState(props.is_confirm);
    const onChangeInput = () => {
        if(isChecked){
            setIsChecked(() => false);
        } else {
            setIsChecked(() => true);
        }
    }
  return (
    <ContentRow>
        <div className="is_confirm">
            <input type='checkbox' checked={isChecked} onChange={onChangeInput} />
        </div>
        <div className="tag">{props.tag}</div>
        <div className="content">{props.content}</div>
        <div className="writer">{props.writer}</div>
        <div className="date">{props.date}</div>
        <div className="delete">{`삭제`}</div>
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
    }
`