
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navbar/>
        <Routes>

        <Route path="/" element={<News key="/general" pageSize={6} country={"in"} category={"General"}/>}></Route>
        <Route path="/entertainment" element={<News key="entertainment" pageSize={6} country={"in"} category={"Entertainment"}/>}></Route>
        <Route  path="/health" element={<News key="/health" pageSize={6} country={"in"} category={"Health"}/>}></Route>
        <Route  path="/science" element={<News key="/science" pageSize={6} country={"in"} category={"Science"}/>}></Route>
        <Route  path="/sports" element={<News key="/sports" pageSize={6} country={"in"} category={"Sports"}/>}></Route>
        <Route  path="/technology" element={<News key="/technology" pageSize={6} country={"in"} category={"Technology"}/>}></Route>
        </Routes>
      </div>
      </Router>
    )
  }
}

