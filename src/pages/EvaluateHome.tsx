import React from 'react'
import { Outlet } from 'react-router-dom'
import { PageFlex } from '../styles/globalStyle'

const EvaluateHome = () => {
  return (
    <PageFlex className="liondetail-bg-active">
      <Outlet />
    </PageFlex>
  )
}

export default EvaluateHome