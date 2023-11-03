import React, { Component } from 'react'
import NewsItem from './NewsItem'

import PropTypes from 'prop-types'
import Loading from './Loading'

import InfiniteScroll from 'react-infinite-scroll-component';







export default class News extends Component {
  static defaultProps={
    country: "in",
    pageSize: 6,
    category: 'general'
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props){
    super(props);
    this.state ={
      articles : [],
      loading: false,
      page: 1,
      TotalPages:1,
      totalResults: 0
    }
    // console.log(this.state.articles.length);
   
    document.title = `Samachar-${this.props.category}`
  };

  

  async componentDidMount(){
    this.props.setProgress(10)
    this.setState({loading: true});
     let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`);
  
     let parseddata = await data.json();
     
     this.setState({articles: parseddata.articles, TotalPages:Math.ceil(parseddata.totalResults/this.props.pageSize), totalResults: parseddata.totalResults, loading: false});
     this.props.setProgress(100)
    //  console.log(this.state.articles.length)
  }

  loadMore = async()=>{
    this.setState({ page:this.state.page+1});
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`);
    let parseddata = await data.json();
    this.setState({articles: this.state.articles.concat(parseddata.articles)});

  }
  
  render() {

    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin: '20px 0px'}}>Samachar- Top headlines</h1>
        {this.state.loading && <Loading/>}
      <InfiniteScroll
         dataLength ={this.state.articles.length}
          next={this.loadMore}
          hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Loading/>}>
      
       <div className='container'>
        <div className='row'>
        {this.state.articles.map((element)=>{
                         
              return <div className='col-md-4 my-3' key ={element.url} >
                  <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} author={element.author?element.author:"Unknown"} time={new Date(element.publishedAt).toGMTString()} imageUrl={element.urlToImage?element.urlToImage:"https://www.solodev.com/core/fileparse.php/131/urlt/Solodev_Blog_NewsAlerts_951x651.jpg"} newsurl={element.url} />
                </div>
         } )}
         </div>
         </div>
        </InfiniteScroll>

      </div>
    )
  }
}

