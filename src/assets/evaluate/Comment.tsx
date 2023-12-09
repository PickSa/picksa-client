import styled from 'styled-components'
const Comment = () => {
    return(
        <CommentContainer>
            
            <CommentContent>
            질문에 대한 의도를 정확히 파악하였고, 적절한 근거와 경험을 들어 답하였음. 멋쟁이 사자처럼 기획 부서에 맞는 협업 가치를 답하였고, 특히 협업 과정에서 발생한 갈등을 해결했던 경험을 적절히 설명함. 하지만 수익화 모델을 이용한 서비스 기획에서는 설명이 부족하였음
            </CommentContent>
            <NameContainer>
                유승빈
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

width: 360px;
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
width: 345px;
height: 147px;

font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
/* or 21px */

color: #000000;
`



