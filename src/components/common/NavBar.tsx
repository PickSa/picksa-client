import styled from "styled-components"
import {MdOutlineLogout} from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { TABS } from "../../assets/tabs";
import { useEffect, useState } from "react";
import { SpaceBetweenFlex } from "../../styles/globalStyle";

const NavBar = ({ where }: { where: string }) => {
  const { pathname } = useLocation();
	const [tab, setTab] = useState(TABS.HOME);

	useEffect(() => {
		if (pathname.includes('pre-lionlist')) {
			setTab(TABS.LIONLIST);
    } else if (pathname.includes('evaluate')){
      setTab(TABS.EVALUATE);
    } else {
      setTab(TABS.HOME);
    }
	}, [pathname]);

  const navigate = useNavigate();
  const onClickhandel = (page:string) => {
    navigate(`/${page}`);
  }
  if (where === 'landing') {
    return (
      <SpaceBetweenFlex className="navbar">
        <MenuWrapper>
          <img onClick={() => navigate(`/`)} src='/img/logo-main.svg'/>
          <MenuPageBox className='landing' onClick={() => onClickhandel(`pre-lionlist`)}>아기 사자</MenuPageBox>
          <MenuPageBox className='landing'>서류 질문</MenuPageBox>
          <MenuPageBox className='landing' onClick={() => onClickhandel(`evaluate`)}>지원 평가</MenuPageBox>
          <MenuPageBox className='landing'>면접 시간</MenuPageBox>
        </MenuWrapper>
        <MenuWrapper>
          <MenuPageBox className="logout"><MdOutlineLogout />Log Out</MenuPageBox>
        </MenuWrapper>
      </SpaceBetweenFlex>
    )
  } else {
    return (
      <SpaceBetweenFlex className="navbar">
        <MenuWrapper>
          <img onClick={() => navigate(`/`)} src='/img/logo.svg'/>
          <MenuPageBox className={(tab===TABS.LIONLIST)?'active':''} onClick={() => onClickhandel(`pre-lionlist`)}>아기 사자</MenuPageBox>
          <MenuPageBox>서류 질문</MenuPageBox>
          <MenuPageBox className={(tab===TABS.EVALUATE)?'active':''} onClick={() => onClickhandel(`evaluate`)}>지원 평가</MenuPageBox>
          <MenuPageBox>면접 시간</MenuPageBox>
        </MenuWrapper>
        <MenuWrapper>
          <MenuPageBox className="logout"><MdOutlineLogout />Log Out</MenuPageBox>
        </MenuWrapper>
      </SpaceBetweenFlex>
    );
  }
}

export default NavBar

const MenuWrapper = styled.div`
  display: flex;
  /* border: 1px solid red; */
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
`