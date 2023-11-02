import React, { Component } from 'react'
import NewsItem from './NewsItem'

import PropTypes from 'prop-types'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroller';








export default class News extends Component {
  static defaultProps={
    country: "in",
    pageSize: 6
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(props){
    super(props);
    this.state ={
      articles : this.articles,
      loading: false,
      page: 1,
      TotalPages:1,
      totalResults: 0
    }
    document.title = `Samachar-${this.props.category}`
  };

  

  async componentDidMount(){
    // console.log("cdn");
     let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddb75b7372284aa598e91063139d06b5&pageSize=${this.props.pageSize}`);
  
     let parseddata = await data.json();
    
     this.setState({articles: parseddata.articles, TotalPages:Math.ceil(parseddata.totalResults/this.props.pageSize)});
  }

   handleNextPage = async ()=>{
    this.setState({loading: true});
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddb75b7372284aa598e91063139d06b5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);
    let parseddata = await data.json();
    this.setState({articles: parseddata.articles,page:this.state.page+1,loading:false})
  }

  handlePreviousPage = async ()=>{
    this.setState({loading: true});
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddb75b7372284aa598e91063139d06b5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`);
    let parseddata = await data.json();
    this.setState({articles: parseddata.articles,page:this.state.page-1,loading:false})
  }
  
  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin: '20px 0px'}}>Samachar- Top headlines</h1>
       {this.state.loading&& <Loading/>}
        <div className='row'>
        {this.state.articles?.map((element)=>                 
                <div className='col-md-4 my-3' key ={element.url}>
                  <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} author={element.author?element.author:"Unknown"} time={new Date(element.publishedAt).toGMTString()} imageUrl={element.urlToImage?element.urlToImage:"https://www.solodev.com/core/fileparse.php/131/urlt/Solodev_Blog_NewsAlerts_951x651.jpg"} newsurl={element.url} />
                </div>
        )} 
         </div>
        <div className='container d-flex justify-content-center'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePreviousPage}>Previous</button>
        <button disabled={this.state.page>=this.state.TotalPages}type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next</button>
        </div>
      </div>
    )
  }
}
