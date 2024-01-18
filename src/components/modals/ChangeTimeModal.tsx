import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { accessTokenAtom } from '../../atom'

const ChangeTimeModal = (props:{setModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const accessToken = useRecoilValue(accessTokenAtom);
  return (
    <BGCompo onClick={() => props.setModalIsOpen(false)}>
        <ModalCompo onClick={(e) => e.stopPropagation()}>
        </ModalCompo>
    </BGCompo>
  )
}

export default ChangeTimeModal

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