import React from 'react'
import { Outlet } from 'react-router-dom'
import { PageFlex } from '../styles/globalStyle'
import NavBar from '../components/common/NavBar'

const EvaluateHome = () => {
  return (
    <PageFlex>
      {/* <NavBar where="evaluate" /> */}
      <Outlet />
    </PageFlex>
  )
}

export default EvaluateHome