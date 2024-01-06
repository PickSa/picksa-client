import { styled } from "styled-components";
import { ArticleFlex } from "../styles/globalStyle";
import ListFilter from "../components/lionlist/ListFilter";
import ListTable from "../components/lionlist/ListTable";
import { useEffect, useState } from "react";
import { LionListType } from "../dummy/datatypes";
import { getAllLists } from "../apis/lionlist";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../atom";

const LionList = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [userCount, setUserCount] = useState<number>();
  const [memberDatas, setMemberDatas] = useState<LionListType[]>();
  const accessToken = useRecoilValue(accessTokenAtom);

  const defaultList = async() => {
    const result = await getAllLists("", accessToken);
    if(result === false){console.log("error")}
    else {
      setMemberDatas(result.applicants);
      setUserCount(result.userCount);
    }
  }

  useEffect(() => {
    defaultList();
  }, []);

  return (
    <ArticleFlex>
      <Title>지원자 명단</Title>
      {memberDatas && userCount &&
        <>
        <ListFilter
          activeFilter={activeFilter}
          memberDatas={memberDatas}
          setActiveFilter={setActiveFilter}
          setMemberDatas={setMemberDatas}
        />
        <ListTable 
        memberDatas={memberDatas}
        activeFilter={activeFilter}
        userCount={userCount} />
        </>
      }
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
