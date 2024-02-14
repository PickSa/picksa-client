import React from 'react'
import { ArticleFlex, PageFlex } from '../../styles/globalStyle'
import { NAVBARSIZE } from '../../dummy/datatypes';
import styled from 'styled-components';
import NavBar from './NavBar';

const NotApplicant = () => {
    const pageheight = window.innerHeight;
  return (
    <PageFlex $innerheight={pageheight}>
      <NavBar where="lionlist" />
        <ArticleFlex className='landing' $innerheight={pageheight} $navheight={NAVBARSIZE}>
            <Text>현재 지원접수 기간이 아닙니다</Text>
        </ArticleFlex>
    </PageFlex>
  )
}

export default NotApplicant

const Text = styled.div`
    display: flex;
    font-size: 2rem;
    font-weight: 700;
    color: black;
`