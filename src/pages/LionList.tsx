import { styled } from "styled-components";
import { ArticleFlex } from "../styles/globalStyle";
import ListFilter from "../components/lionlist/ListFilter";
import ListTable from "../components/lionlist/ListTable";
import { useEffect, useRef, useState } from "react";
import { LionListType, NAVBARSIZE } from "../dummy/datatypes";
import { getAllLists } from "../apis/lionlist";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../atom";
import { useNavigate } from "react-router-dom";

const LionList = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [userCount, setUserCount] = useState<number>();
  const [memberDatas, setMemberDatas] = useState<LionListType[]>();
  const [filterSize, setFilterSize] = useState<number>();
  const accessToken = useRecoilValue(accessTokenAtom);
  const navigate = useNavigate();

  const pageheight = window.innerHeight;
  const titleRef = useRef<HTMLDivElement>(null);
  const titleSize = titleRef.current?.offsetHeight === undefined ? 50 : titleRef.current.offsetHeight;

  const defaultList = async() => {
    const result = await getAllLists("", accessToken);
    if(result === false){console.log("error")}
    else if(result === "logout"){
      alert("토큰이 만료되었습니다. 로그아웃 후 다시 로그인해주세요.");
      navigate("/");
    }
    else {
      setMemberDatas(result.applicants);
      setUserCount(result.userCount);
    }
  }

  useEffect(() => {
    defaultList();
  }, []);

  return (
    <ArticleFlex $innerheight={pageheight} $navheight={NAVBARSIZE}>
      <Title ref={titleRef}>지원자 명단</Title>
      {memberDatas && userCount &&
        <>
        <ListFilter
          activeFilter={activeFilter}
          memberDatas={memberDatas}
          setActiveFilter={setActiveFilter}
          setMemberDatas={setMemberDatas}
          setFilterSize={setFilterSize}
        />
        <ListTable 
        memberDatas={memberDatas}
        activeFilter={activeFilter}
        userCount={userCount}
        tableHeight={pageheight-(NAVBARSIZE + titleSize + (filterSize!==undefined ? filterSize : 40))} />
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
