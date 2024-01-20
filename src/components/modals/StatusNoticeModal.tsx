import React from 'react'
import styled from 'styled-components'

const StatusNoticeModal = (props:{
    content: string,
}) => {
  return (
    <ModalBox>{props.content}</ModalBox>
  )
}

export default StatusNoticeModal

const ModalBox = styled.div`
    display: flex;
    background-color: #EAF1F9;
    position: absolute;
    top: 5rem;
    font-size: 1.5rem;
    padding: 1rem 2rem 1rem 2rem;
`