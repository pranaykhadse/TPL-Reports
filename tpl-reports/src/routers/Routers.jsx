import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReportScenarios from '../components/MainContainer/ReportScenarios'

const Routers = () => {
  return (
   
<Routes>
      <Route path="/" element={<ReportScenarios />}/>
    </Routes>
  )
}

export default Routers
