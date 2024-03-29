import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { PageFlex } from '../styles/globalStyle'
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../atom';

const EvaluateHome = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const pageheight = window.innerHeight;
  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken === ""){
      alert("로그인해주세요!");
      navigate("/");
    }
  }, []);
  
  return (
    <PageFlex className="liondetail-bg-active" $innerheight={pageheight}>
      <Outlet />
    </PageFlex>
  )
}

export default EvaluateHome