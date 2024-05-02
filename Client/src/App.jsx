import React from 'react'
import Form from './Components/Form/Form'
import Login from './Components/Login/Login'
import Chat from './Components/Chat/Chat'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Report from './Components/Report/Report';

const App=()=> {
  return (
     <Router>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/details' element={<Form/>}/>
          <Route path='/interview' element={<Chat/>}/>
          <Route path='/report' element={<Report/>}/>
        </Routes>
     </Router>
  )
}

export default App
