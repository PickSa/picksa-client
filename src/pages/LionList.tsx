import { styled } from "styled-components";
import { ArticleFlex } from "../styles/globalStyle";
import ListFilter from "../components/lionlist/ListFilter";
import ListTable from "../components/lionlist/ListTable";
import { useState } from "react";
import { TestDatasall } from "../dummy/TestDatasMember";

const LionList = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [memberDatas, setMemberDatas] = useState(TestDatasall);
  return (
    <ArticleFlex>
      <Title>지원자 명단</Title>
      <ListFilter
        activeFilter={activeFilter}
        memberDatas={memberDatas}
        setActiveFilter={setActiveFilter}
        setMemberDatas={setMemberDatas}
      />
      <ListTable memberDatas={memberDatas} />
    </ArticleFlex>
  );
};

export default LionList;

const Title = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bolder;
  margin: 2rem 0 1rem 0;
  /* background-color: aqua; */
`;
