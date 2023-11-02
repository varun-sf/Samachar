import React, { Component } from 'react'
import spinnerphoto from './Fadingventilation.gif'

export default class Loading extends Component {
  render() {
    return (
        <div className='text-center'>
        <img src={spinnerphoto} alt="loading"/>
     </div>
    )
  }
}
