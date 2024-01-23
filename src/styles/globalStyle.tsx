import { styled } from "styled-components";

export const PageFlex = styled.div<{$innerheight?:number}>`
    display: flex;
    width: 100%;
    height: ${props => props.$innerheight ? `${props.$innerheight}px` : ''};
    flex-direction: column;
    align-items: center;
    &.landing{
        background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/img/HomeBG.png);
        background-size: cover;
        background-position: center center;
    }
    &.docquest-background{
        background-color: rgba(221, 221, 221, 1);
    }
    &.liondetail-bg-active{
        background-color: rgba(247, 248, 250, 1);
    }
`

export const ArticleFlex = styled.div<{$innerheight?:number, $navheight?:number}>`
    display: flex;
    flex-direction: column;
    width: 95%;
    &.landing{
        height: ${props => `${props.$innerheight! - props.$navheight!}px`};
        justify-content: center;
        align-items: center;
    }
    &.lion-detail-row{
        flex-direction: row;
        height: ${props => `${props.$innerheight! - props.$navheight! - 20}px`};
        justify-content: space-between;
        margin-top: 2rem;
    }
`

export const GridContent = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding-left: 10rem;
    font-size: 1.2rem;
    &.listTitle{
        font-weight: bolder;
        background-color: #ddf1fb;
        padding-top: 1rem;
        padding-bottom: 1rem;
        position: sticky;
        top: 0;
        z-index: 30;
    }
    &.member{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #DDDDDD;
        &:hover{
            cursor: pointer;
        }
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