import { styled } from "styled-components"
import NavBar from "../components/common/NavBar"
import { ArticleFlex, PageFlex } from "../styles/globalStyle"
import ListFilter from "../components/lionlist/ListFilter"
import ListTable from "../components/lionlist/ListTable"

const LionList = () => {
  return (
    <PageFlex>
      <NavBar where="lionlist" />
      <ArticleFlex>
        <Title>지원자 명단</Title>
        <ListFilter />
        <ListTable />
      </ArticleFlex>
    </PageFlex>
  )
}

export default LionList

const Title = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bolder;
  margin: 2rem 0 1rem 0;
  /* background-color: aqua; */
`