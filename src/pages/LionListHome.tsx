import React from 'react'
import { Outlet } from 'react-router-dom'
import { PageFlex } from '../styles/globalStyle'
import NavBar from '../components/common/NavBar'

const LionListHome = () => {
  return (
    <PageFlex>
      <NavBar where="lionlist" />
      <Outlet />
    </PageFlex>
  )
}

export default LionListHome