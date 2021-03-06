import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import ImagePart from '../ImagePart/ImagePart';

import './Bookmark.css';

class Bookmark extends Component {
	state = {
		imagesSrc: []
	}
	componentWillMount() {
		const url = this.props.href.toLowerCase();
		if( url.indexOf('.pdf') < 0){
			if(url.match(/\.gif|png|jpg|svg/)){
				this.setState({ imagesSrc:[this.props.href] });
				return;
			}
			this.fetchContent.call(this, this.props.href);
		}

	}
	// find some images inside bookmark
	// todo: handle png/jpg/gif request
	fetchContent(url) {
		const proxt = 'https://crossorigin.me/';
		let header = new Headers({
		    'Access-Control-Allow-Origin':'*',
		});
		const req = { 
			method: 'GET',
            mode: 'cors',
            cache: 'default',
            header
        };
		fetch(proxt + url, req)
		.then((response) => {
			return response.blob();
		})
		.then(data => {
			const resReader = new FileReader();
			resReader.onload = (event) => {
				const result =  DOMPurify.sanitize(event.target.result, { WHOLE_DOCUMENT: true,RETURN_DOM: true});
				const images = [...result.querySelectorAll('img')];
				if(images.length > 0){
					let imagesSrc = [];
					images.reduce((imagesSrc, image) => {
						if(image.attributes.src !== undefined){
							imagesSrc.push(image.attributes.src.value)
						}
						return imagesSrc;
					}, imagesSrc);
					this.setState({ imagesSrc });
				}
			};
			resReader.readAsText(data);
		})
		.catch( err => console.log(err.message));
	}
	handleChildUnmount(){
        this.setState({imagesSrc: []});
    }
  	render() { 
	    return (
	    	<article className="bookmark">
	    		{ this.state.imagesSrc.length > 0 
	    			? <ImagePart handleChildUnmount={this.handleChildUnmount.bind(this)}  imagesSrc={this.state.imagesSrc} href={this.props.href} />
	    			: <div className="bookmark_404">Image not found!</div>
	    		}
	    		<a className="bookmark_intro" href={this.props.href} target="_blank">
		    		{ this.props.icon ? <img  alt="" src={this.props.icon.value} />
			    		: <span ></span>
			    	}
			    	{ this.props.title ? <h3 className="bookmark_title">{this.props.title}</h3>
			    		: this.props.icon? <span ></span>:<h3 className="bookmark_title">Link</h3>
			    	}
	    		</a>
	    	</article>
		);
  }
}
export default Bookmark;

