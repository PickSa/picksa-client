import React from 'react'
import styled from 'styled-components'
import { deleteQuestion } from '../../apis/docquest'
import { useRecoilValue } from 'recoil'
import { accessTokenAtom } from '../../atom'

const DeleteModal = (props:{deletedId:number, setDelModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const accessToken = useRecoilValue(accessTokenAtom);
    const handleDelete = async() => {
        if(props.deletedId){
            const result = await deleteQuestion(props.deletedId, accessToken);
            if(result === false){
                console.log("error");
            } else {
                props.setDelModalIsOpen(false);
            }
        }
    }
  return (
    <BGCompo onClick={() => props.setDelModalIsOpen(false)}>
        <ModalCompo onClick={(e) => e.stopPropagation()}>
            <div>삭제하시겠습니까?</div>
            <BtnWrapper>
                <div className='yes' onClick={() => handleDelete()}>네</div>
                <div className='no' onClick={() => props.setDelModalIsOpen(false)}>아니요</div>
            </BtnWrapper>
        </ModalCompo>
    </BGCompo>
  )
}

export default DeleteModal

const BGCompo = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 100;
    position: fixed;
`

const ModalCompo = styled.div`
    display: flex;
    flex-direction: column;
    width: 35rem;
    height: 20rem;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 100;
    & > div {
        font-size: 1.8rem;
        font-weight: 700;
    }
`

const BtnWrapper = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-between;
    align-items: center;
    & > div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        border-radius: 2rem;
        font-size: 1.8rem;
        font-weight: 700;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        &:hover{
            cursor: pointer;
        }
    }
    & > .yes{
        background-color: rgba(3, 104, 255, 1);
        color: white;
    }
    & > .no{
        background-color: rgba(170, 170, 170, 1);
        color: black;
    }
`