import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GetQuestType } from '../../dummy/datatypes';
import { FaTrash } from "react-icons/fa6";
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../../atom';

const MakeQuestList = (props:{
    lists: GetQuestType,
    changedDetermineData:{id:number, isDetermined:boolean}[],
    setDeletedId:React.Dispatch<React.SetStateAction<number|undefined>>,
    setDelModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setChangedDetermineData:React.Dispatch<React.SetStateAction<{id:number, isDetermined:boolean}[]>>,
}) => {
    const [isChecked, setIsChecked] = useState<boolean|undefined>(undefined);
    const userinfo = useRecoilValue(UserInfoAtom);

    useEffect(() => {
        setIsChecked(() => props.lists.isDetermined);
    }, [props.lists]);

    const findSameId = (element:{id:number, isDetermined:boolean}) => {
        if(element.id === props.lists.id) return true
    };

    const handleDeterminedChanged = (state:boolean) => {
        if(props.changedDetermineData.length === 0){
            props.setChangedDetermineData((bfData) => bfData.concat({id:props.lists.id, isDetermined:state}));
        } else {
            const ridIndex = props.changedDetermineData.findIndex(findSameId);
            if(ridIndex === -1) {
                props.setChangedDetermineData((bfData) => bfData.concat({id:props.lists.id, isDetermined:state}));
            } else {
                const newList = props.changedDetermineData
                newList.splice(ridIndex, 1);
                props.setChangedDetermineData(() => newList);
            }
        }
    };

    const onChangeInput = () => {
        handleDeterminedChanged(!isChecked);
        setIsChecked(() => !isChecked);
    };
    const onClickDelete = () => {
        props.setDeletedId(props.lists.id);
        props.setDelModalIsOpen(true);
    };
  return (isChecked!==undefined && 
    <ContentRow>
        <div className="is_confirm">
            <input type='checkbox' checked={isChecked} onChange={onChangeInput} />
        </div>
        <div className="tag">{props.lists.tagContent}</div>
        <div className="content">{props.lists.content}</div>
        <div className="writer">{props.lists.writerName}</div>
        <div className="date">{(String(props.lists.createdAt)).split('T')[0]}</div>
        {userinfo.user.username === props.lists.writerName ? 
            <div className="delete" onClick={() => onClickDelete()}><FaTrash /></div>
            : 
            <div className="delete"></div>
        }
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