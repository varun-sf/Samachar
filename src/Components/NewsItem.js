import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl, newsurl, author, time } = this.props;
    return (
<div className="card h-100" >
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">By {author} on {time}</small></p>
    <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    )
  }
}
