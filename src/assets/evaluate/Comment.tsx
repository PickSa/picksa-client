import styled from 'styled-components'
import LogoComment from './LogoComment.png'
const Comment = () => {
    return(
        <CommentContainer>
            <NameContainer>
            <img src={LogoComment} alt="Logo" />
                유승빈
            </NameContainer>
            <CommentContent>
            근거1 근거2 근거3 아쉬운점1 아쉬운점2 아쉬운점3
            </CommentContent>

        </CommentContainer>
        
    )
}
export default Comment
const CommentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 365px;
height: 158px;
`

const NameContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

height: 20px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;

color: #000000;

`
const CommentContent = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;
gap: 10px;

width: 365px;
height: 134px;

background: rgba(220, 220, 220, 0.4);
border-radius: 10px 10px 10px 10px;


color: #000000;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;


`





