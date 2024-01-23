import React from 'react'
import styled from 'styled-components'

const StatusNoticeModal = (props:{
    content: string,
}) => {
  const windowWidth = window.innerWidth;
  return (
    <ModalBox $width={windowWidth}>{props.content}</ModalBox>
  )
}

export default StatusNoticeModal

const ModalBox = styled.div<{$width:number}>`
    display: flex;
    background-color: #EAF1F9;
    position: absolute;
    width: fit-content;
    top: 5rem;
    left: 50%;
    font-size: 1.5rem;
    padding: 1rem 2rem 1rem 2rem;
    transform: translate(-50%, 0%);
`