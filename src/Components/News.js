import React, { Component } from 'react'
import NewsItem from './NewsItem'; 
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps ={
    pageSize: 8,
    country: 'in',
    category: 'general'
    }
  static propTypes ={
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }
        constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page:1  
        }

    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6bf29ce29834db783d39462344f09a0&page=1&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parsedata=await data.json();
        this.setState({articles: parsedata.articles,totalResults: parsedata.totalResults});
    }
    onPrevClick=async()=>{
      
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6bf29ce29834db783d39462344f09a0&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      let data= await fetch(url);
      let parsedata=await data.json();
      
      this.setState({
        page: this.state.page-1,
        articles: parsedata.articles
      })
    }
    onNextClick=async()=>{
     if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)) {
      
     }
     else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d6bf29ce29834db783d39462344f09a0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parsedata=await data.json();
        this.setState({
          page: this.state.page+1,
          articles: parsedata.articles
        })
        // this.setState({articles: parsedata.articles});
    }
  }

  render() {
    return (
      <div className="container my-3" >
        <h1 className="text-center">News - Headlines</h1>
        <div className="row">
        {this?.state?.articles?.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} url={element.url?element.url:""} date={element.publishedAt} author={element.author} source={element.source.name}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" onClick={this.onPrevClick} className="btn btn-dark ">&larr; Previous</button>
        <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))}type="button" onClick={this.onNextClick} className="btn btn-dark ">Next &rarr;</button>
        </div>
        
        
      </div>
    )
  }
}

export default News
