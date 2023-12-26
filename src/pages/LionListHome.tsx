import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { PageFlex } from '../styles/globalStyle'
import NavBar from '../components/common/NavBar'

const LionListHome = () => {
  const params = useParams();
  const [bgActive, setBgActive] = useState("");
  useEffect(() => {
    if(params.id){
      //id가 있을 경우, detail bg color active
      setBgActive(() => "liondetail-bg-active");
    } else {
      setBgActive(() => "");
    }
  }, [params])
  return (
    <PageFlex className={bgActive}>
      <NavBar where="lionlist" />
      <Outlet />
    </PageFlex>
  )
}

export default LionListHome