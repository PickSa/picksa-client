import { styled } from "styled-components"
import NavBar from "../components/common/NavBar"
import { ArticleFlex, PageFlex } from "../styles/globalStyle"
import {AiOutlineArrowRight} from "react-icons/ai"
import { NAVBARSIZE } from "../dummy/datatypes"

const Home = () => {
  const pageheight = window.innerHeight;
  return (
    <PageFlex className="landing" $innerheight={pageheight}>
      <NavBar where="landing" />
      <ArticleFlex className="landing" $innerheight={pageheight} $navheight={NAVBARSIZE}>
        <Title className="title-larger">Growl to Growth</Title>
        <Title className="title-largest">성장을 향한 포효</Title>
        <Title>의와 참의 요람, 중앙대학교와 멋쟁이사자처럼이 함께합니다.</Title>
        <HomePageBtn>
          <BtnElement onClick={() => window.open("https://cau-likelion.org/", "_blank")}>홈페이지 바로가기</BtnElement> 
          <AiOutlineArrowRight />
        </HomePageBtn>
      </ArticleFlex>
    </PageFlex>
  )
}

export default Home

const Title = styled.div`
  text-align: center;
  color: white;
  font-size: 1.8rem;
  font-weight: lighter;
  margin-top: 3rem;
  &.title-largest{
    font-size: 5rem;
    font-weight: bolder;
    margin-top: 1rem;
  }
  &.title-larger{
    font-size: 3rem;
    margin-top: none;
    font-weight: normal;
  }
`

const HomePageBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 2rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  gap: 1rem;
  color: white;
  font-size: 1.2rem;
  background-color: rgba(160, 160, 160, 0.65);
`

const BtnElement = styled.div`
  text-align: center;
  &:hover{
    cursor: pointer;
  }
`