import { styled } from "styled-components";

export const PageFlex = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    &.landing{
        background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/img/HomeBG.png);
        background-size: cover;
    }
    &.docquest-background{
        background-color: rgba(221, 221, 221, 1);
    }
    &.liondetail-bg-active{
        background-color: rgba(247, 248, 250, 1);
    }
`

export const ArticleFlex = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    &.landing{
        height: 94vh;
        justify-content: center;
        align-items: center;
    }
    &.lion-detail-row{
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }
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
    &:hover{
        cursor: pointer;
    }
`

export const SpaceBetweenFlex = styled.div`
  display: flex;
  /* border: 1px solid black; */
  justify-content: space-between;
  &.navbar{
    width: 96%;
    padding-top: 1.5rem;
    padding-left: 2%;
    padding-right: 2%;
    background-color: white;
  }
  &.navbar-landing{
    width: 96%;
    padding-top: 1.5rem;
    padding-left: 2%;
    padding-right: 2%;
  }
`