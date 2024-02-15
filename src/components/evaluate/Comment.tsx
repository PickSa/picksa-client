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
align-items: center;
gap: 1rem; /* 10px */
width: 90%;
/* Blue/Blue2 */
padding-top: 2rem;
padding-bottom: 2rem;
background: #EAF1F9;
border-radius: 0.5rem; /* 8px */
`

const NameContainer = styled.div`
display: flex;
flex-direction: row;
width: 90%;
justify-content: flex-end;
height: 1rem; /* 14px */
gap: 0.5rem;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 1.3rem;
line-height: 0.875rem; /* 14px */
color: #000000;
margin-right: 2rem;
`
const CommentContent = styled.div`
width: 90%;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 540;
font-size: 1.5rem;
line-height: 150%;
/* or 21px */
padding: 1.25rem; /* 20px */
color: #000000;
margin-left: 2rem;
margin-right: 2rem;
`
const PassText = styled.span<{pass:boolean}>`
    color: ${props => props.pass ? "blue" : "red"};
`


