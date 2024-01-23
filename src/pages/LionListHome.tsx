import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { PageFlex } from '../styles/globalStyle'
import NavBar from '../components/common/NavBar'
import { accessTokenAtom } from '../atom'
import { useRecoilValue } from 'recoil'

const LionListHome = () => {
  const params = useParams();
  const [bgActive, setBgActive] = useState("");
  const accessToken = useRecoilValue(accessTokenAtom);
  const pageheight = window.innerHeight;
  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken === ""){
      alert("로그인해주세요!");
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if(params.id){
      //id가 있을 경우, detail bg color active
      setBgActive(() => "liondetail-bg-active");
    } else {
      setBgActive(() => "");
    }
  }, [params])
  return (
    <PageFlex className={bgActive} $innerheight={pageheight}>
      <NavBar where="lionlist" />
      <Outlet />
    </PageFlex>
  )
}

export default LionListHome