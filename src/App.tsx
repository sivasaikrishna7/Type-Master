import 'regenerator-runtime/runtime'
import React, { ReactElement, useState } from 'react'
import 'antd/dist/reset.css'
import Login from './components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import TypingPage from './components/TypingPage/TypingPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/type" element={<TypingPage />} />
      </Routes>
    </div>
  )
}

export default App
