import styled from 'styled-components';
import React from 'react';
interface CommentProps {
    content: string;
    name: string;
}
const Comment: React.FC<CommentProps> = ({content, name}) => {
    return(
        <CommentContainer>
            
            <CommentContent>
            {content}
            </CommentContent>
            <NameContainer>
                {name}
            </NameContainer>

        </CommentContainer>
        
    )
}
export default Comment
const CommentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
padding: 18px;
gap: 10px;

width: 420px;
height: 195px;

/* Blue/Blue2 */
background: #EAF1F9;
border-radius: 8px;
`

const NameContainer = styled.div`
height: 14px;

/* Caption2 */
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;

color: #B0B0B0;

`
const CommentContent = styled.div`
width: 90%;
height: 147px;

font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
/* or 21px */
padding: 20px;
color: #000000;
`



