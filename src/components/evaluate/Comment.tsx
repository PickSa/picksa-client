import styled from 'styled-components';
import React from 'react';
interface CommentProps {
    content: string;
    name: string;
    pass: boolean;
}
const Comment: React.FC<CommentProps> = ({content, name, pass}) => {
    return(
        <CommentContainer>
            <CommentContent>{content}</CommentContent>
            <NameContainer>{name}
            <PassText pass={pass}>
                {pass? "합격선택" : "불합선택"}
            </PassText>
            </NameContainer>
        </CommentContainer>
        
    )
}
export default Comment

const CommentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 2rem; /* 18px */
gap: 1rem; /* 10px */
width: 32rem; /* 420px */
/* Blue/Blue2 */
background: #EAF1F9;
border-radius: 0.5rem; /* 8px */
`

const NameContainer = styled.div`
display: flex;
flex-direction: row;
height: 1rem; /* 14px */
gap: 0.5rem;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 1.1rem; /* 12px */
line-height: 0.875rem; /* 14px */
color: #B0B0B0;
`
const CommentContent = styled.div`
width: 90%;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 540;
font-size: 1.35rem; /* 14px */
line-height: 150%;
/* or 21px */
padding: 1.25rem; /* 20px */
color: #000000;
`
const PassText = styled.span<{pass:boolean}>`
color: ${props => props.pass ? "blue" : "red"}`


