import React from 'react'
import Home from './components/Home/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MergePDF from './components/Merge/MergePDF';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/merge_pdf' element={<MergePDF />} />
        <Route exact path='/404' element={<UnderConstruction />} />
      </Routes>
    </Router>
  )
}
