import styled from "styled-components"
import {MdOutlineLogout} from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { TABS } from "../../assets/tabs";
import { useEffect, useState } from "react";
import { SpaceBetweenFlex } from "../../styles/globalStyle";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { LoginCodeAtom, UserInfoAtom, accessTokenAtom } from "../../atom";
import { getLoginLink, getToken, getUserName } from "../../apis/login";

const NavBar = ({ where }: { where: string }) => {
  const { pathname } = useLocation();
	const [tab, setTab] = useState(TABS.HOME);
  const [userinfo, setUserinfo] = useRecoilState(UserInfoAtom);
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  const [code, setCode] = useRecoilState(LoginCodeAtom);

	useEffect(() => {
		if (pathname.includes('pre-lionlist')) {
			setTab(TABS.LIONLIST);
    } else if (pathname.includes('document-question')) {
      setTab(TABS.DOCQUEST);
    } else if (pathname.includes('evaluate')){
      setTab(TABS.EVALUATE);
    } else if (pathname.includes('timetable')){
      setTab(TABS.TIMETABLE);
    } else {
      setTab(TABS.HOME);
    }
	}, [pathname]);

  const navigate = useNavigate();
  const onClickhandel = (page:string) => {
    if(userinfo.isUser){
      navigate(`/${page}`);
    } else {
      alert("로그인해주세요!");
    }
  }

  const onClickLogout = async() => {
    setAccessToken("");
    setUserinfo({
      isUser: false,
      user: {
        username: "",
      }
    })
    navigate(`/`);
  }

  const onClickLogin = async() => {
    const result = await getLoginLink();
    if(result === false) {
      console.log('로그인 에러 발생');
    } else {
      window.open(result, "_self");
    }
  }

  const getAccessToken = async() => {
    if(userinfo.isUser === false){
      const result = await getToken(code!);
      if(result === false){
        console.log('로그인 에러 발생: access token 취득 불가');
      } else {
        console.log(result);
        console.log(result.accessToken);
        setAccessToken(result.accessToken);
        console.log(accessToken);
        const nameResult = await getUserName(result.accessToken);
        if(nameResult === false){
          console.log('유저 이름을 찾을 수 없음');
        } else {
          console.log(nameResult);
          setUserinfo({
            isUser : true,
            user : {
              username: nameResult.name,
              userrole: nameResult.role,
            }
          })
        }
      }
    }
  }

  useEffect(() => {
    console.log(accessToken);
    if(code !== undefined){
      console.log(1);
      getAccessToken();
    }
  }, [code]);

  useEffect(() => {
    const getCode = new URL(window.location.href).searchParams.get("code");
    if(getCode){
      setCode(getCode!);
      navigate("/");
    }
  }, [where === 'landing']);

  if (where === 'landing') {
    return (
      <SpaceBetweenFlex className="navbar-landing">
        <MenuWrapper>
          <img onClick={() => navigate(`/`)} src='/img/logo-main.svg'/>
          <MenuPageBox className='landing' onClick={() => onClickhandel(`pre-lionlist`)}>아기 사자</MenuPageBox>
          <MenuPageBox className='landing' onClick={() => onClickhandel(`document-question`)}>서류 질문</MenuPageBox>
          <MenuPageBox className='landing' onClick={() => onClickhandel(`evaluate`)}>지원 평가</MenuPageBox>
          <MenuPageBox className='landing' onClick={() => onClickhandel(`timetable`)}>면접 시간</MenuPageBox>
        </MenuWrapper>
        <MenuWrapper>
          {
            userinfo.isUser ? 
            <>
            <MenuPageBox className="user-landing">{`${userinfo.user.username} 님`}</MenuPageBox>
            <MenuPageBox className="logout" onClick={onClickLogout}><MdOutlineLogout />Log out</MenuPageBox>
            </>
            :
            <MenuPageBox className="logout" onClick={onClickLogin}><MdOutlineLogout />Log in</MenuPageBox>
          }
        </MenuWrapper>
      </SpaceBetweenFlex>
    )
  } else {
    return (
      <SpaceBetweenFlex className="navbar">
        <MenuWrapper>
          <img onClick={() => navigate(`/`)} src='/img/logo.svg'/>
          <MenuPageBox className={(tab===TABS.LIONLIST)?'active':''} onClick={() => onClickhandel(`pre-lionlist`)}>아기 사자</MenuPageBox>
          <MenuPageBox className={(tab===TABS.DOCQUEST)?'active':''} onClick={() => onClickhandel(`document-question`)}>서류 질문</MenuPageBox>
          <MenuPageBox className={(tab===TABS.EVALUATE)?'active':''} onClick={() => onClickhandel(`evaluate`)}>지원 평가</MenuPageBox>
          <MenuPageBox className={(tab===TABS.TIMETABLE)?'active':''} onClick={() => onClickhandel(`timetable`)}>면접 시간</MenuPageBox>
        </MenuWrapper>
        <MenuWrapper>
          {
            userinfo.isUser ? 
            <>
            <MenuPageBox className="user">{`${userinfo.user.username} 님`}</MenuPageBox>
            <MenuPageBox className="logout" onClick={onClickLogout}><MdOutlineLogout />Log out</MenuPageBox>
            </>
            :
            <MenuPageBox className="logout"><MdOutlineLogout />Log in</MenuPageBox>
          }
        </MenuWrapper>
      </SpaceBetweenFlex>
    );
  }
}

export default NavBar

const MenuWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  & > img{
    &:hover{
      cursor: pointer;
    }
  }
`
const MenuPageBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  color: #AAAAAA;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem 0;
  margin : 0 2rem 0 2rem;
  font-weight: bolder;
  &:hover{
    cursor: pointer;
  }
  &.logout{
    gap: 1rem;
  }
  &.active{
    color:#0368FF;
    border-bottom: 2px solid #0368FF;
  }
  &.landing{
    color: #DDDDDD;
  }
  &.user{
    color: black;
  }
  &.user-landing{
    color: white;
  }
  &:hover{
    cursor: pointer;
  }
`;