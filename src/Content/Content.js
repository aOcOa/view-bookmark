import React, { Component } from 'react';
import Bookmark from '../bookmark/bookmark';
import './Content.css';

class Content extends Component {
	state = {
		bookmarks:[],
		index: 15
	}
	constructor(props){
		super(props);
		this.loadMore = this.loadMore.bind(this);
		this.parseBookMark = this.parseBookMark.bind(this);
	}
	componentDidMount(){
		this.parseBookMark(this.props.bookmarkDom);
	}
	parseBookMark(bookmarkDom){
		const bookmarks = [];
		const elements = [...bookmarkDom];
		// todo: the reason for two reduce is to separate into folders in future
		elements.reduce((obj, element)=> {
			const aElements = [...element.querySelectorAll('a')];
			aElements.reduce((obj, aElement) =>{
				obj.push({
					'title': aElement.text,
					'icon': aElement.attributes.icon,
					'date': aElement.add_date,
					'href':  aElement.href,
				});
				return obj;
			}, obj);
			return obj;
		}, bookmarks);
		this.setState({ bookmarks });
	}
	loadMore(){
		const index = this.state.index + 15;
		this.setState({ index });
	}
  	render() { 
  		if(this.state.bookmarks.length ){
  			return( 
  				<div className="content">
  					{ 
  						this.state.bookmarks.slice(0,this.state.index)
  						.map((bookmark, i) => <Bookmark key={i} {...bookmark} />)
  					}
  					<button className="content_load" onClick={ this.loadMore }>Load</button>
  				</div>
  			);
  		}
  		else{
	   		return <h1>importing Bookmark...</h1>
   		}
  }
}
export default Content;

