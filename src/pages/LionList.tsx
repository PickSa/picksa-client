import { styled } from "styled-components"
import NavBar from "../components/common/NavBar"
import { ArticleFlex, PageFlex } from "../styles/globalStyle"
import ListFilter from "../components/lionlist/ListFilter"
import ListTable from "../components/lionlist/ListTable"
import { useState } from "react"
import { TestDatasall } from "../components/lionlist/TestDatas"

const LionList = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [memberDatas, setMemberDatas] = useState(TestDatasall);
  return (
    <PageFlex>
      <NavBar where="lionlist" />
      <ArticleFlex>
        <Title>지원자 명단</Title>
        <ListFilter 
          activeFilter={activeFilter} 
          memberDatas={memberDatas}
          setActiveFilter={setActiveFilter}
          setMemberDatas={setMemberDatas} />
        <ListTable memberDatas={memberDatas} />
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