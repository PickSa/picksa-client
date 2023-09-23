import { styled } from "styled-components";

export const PageFlex = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`

export const ArticleFlex = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    /* border: 1px solid black; */
`

export const GridContent = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding-left: 10rem;
    padding-right: 10rem;
    font-size: 1.2rem;
    &.listTitle{
        font-weight: bolder;
        background-color: rgba(106, 199, 239, 0.2);
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    &.member{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #DDDDDD;
    }
`

export const SpaceBetweenFlex = styled.div`
  display: flex;
  /* border: 1px solid black; */
  justify-content: space-between;
  &.navbar{
    width: 98%;
    margin-top: 1rem;
  }
`