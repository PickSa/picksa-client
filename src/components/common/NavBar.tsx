import styled from "styled-components"
import {MdOutlineLogout} from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { TABS } from "../../assets/tabs";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { pathname } = useLocation();
	const [tab, setTab] = useState(TABS.HOME);

	useEffect(() => {
		if (pathname.includes('pre-lionlist')) {
			setTab(TABS.LIONLIST);
    }
	}, [pathname]);

  const navigate = useNavigate();
  const onClickhandel = (page:string) => {
    navigate(`/${page}`);
  }
  return (
    <NavWrapper>
      <MenuWrapper>
        <img onClick={() => navigate(`/`)} src='/img/logo.svg'/>
        <MenuPageBox className={(tab===TABS.LIONLIST)?'active':''} onClick={() => onClickhandel(`pre-lionlist`)}>아기 사자</MenuPageBox>
        <MenuPageBox>서류 질문</MenuPageBox>
        <MenuPageBox>지원 평가</MenuPageBox>
        <MenuPageBox>면접 시간</MenuPageBox>
      </MenuWrapper>
      <MenuWrapper>
        <MenuPageBox className="logout"><MdOutlineLogout />Log Out</MenuPageBox>
      </MenuWrapper>
    </NavWrapper>
  )
}

export default NavBar

const NavWrapper = styled.div`
  width: 98%;
  display: flex;
  border: 1px solid black;
  justify-content: space-between;
`

const MenuWrapper = styled.div`
  display: flex;
  border: 1px solid red;
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
  &.active,
  &:active{
    color:#0368FF;
    border-bottom: 2px solid #0368FF;
  }
`