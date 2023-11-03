
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey = process.env.REACT_APP_apiKey
  state={
    progress: 0
  }
  
  setProgress =(progress)=>{
    this.setState({progress: progress});
  }

  render() {
    return (
      <Router>
      <div>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(100)}
      />
        <Navbar/>
        <Routes>

        <Route path="/" element={<News setProgress={this.setProgress}key="/general" pageSize={6} apiKey={this.apikey} country={"in"} category={"General"}/>}></Route>
        <Route path="/entertainment" element={<News setProgress={this.setProgress}key="entertainment" pageSize={6} apiKey={this.apikey} country={"in"} category={"Entertainment"}/>}></Route>
        <Route  path="/health" element={<News setProgress={this.setProgress}key="/health" pageSize={6} apiKey={this.apikey} country={"in"} category={"Health"}/>}></Route>
        <Route  path="/science" element={<News setProgress={this.setProgress}key="/science" pageSize={6} apiKey={this.apikey} country={"in"} category={"Science"}/>}></Route>
        <Route  path="/sports" element={<News setProgress={this.setProgress}key="/sports" pageSize={6} apiKey={this.apikey} country={"in"} category={"Sports"}/>}></Route>
        <Route  path="/technology" element={<News setProgress={this.setProgress}key="/technology" pageSize={6} apiKey={this.apikey} country={"in"} category={"Technology"}/>}></Route>
        </Routes>
      </div>
      </Router>
    )
  }
}

