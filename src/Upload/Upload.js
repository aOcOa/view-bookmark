import React, { Component } from 'react';
// import DOMPurify from 'dompurify';
import './Upload.css';

class Upload extends Component {
	constructor(props){
		super(props);
		this.hadleFileSubmit = this.hadleFileSubmit.bind(this);
	}
	hadleFileSubmit(evt){
		evt.preventDefault();
		const file = this.refs.bookmarkFile.files[0];
		if(file){
			this.readFile.call(this, file);
		}
		return ;
	}
	readFile(file){
		const reader = new FileReader();
		reader.onload = (event) => {
			const parser = new DOMParser();
			const result =  parser.parseFromString(event.target.result,'text/html');
			const folder = result.querySelectorAll('body > dl > dt');
			this.props.getDomElement(folder);
		};
		reader.readAsText(file);
	}
	
  	render() { 
	    return (
	    	<form className="Upload">
				<p>Upload your bookmark.html:</p>
				<input type="file" ref="bookmarkFile"/>
				<button onClick={ this.hadleFileSubmit }>OK</button>
			</form>
		);
  }
}
export default Upload;

