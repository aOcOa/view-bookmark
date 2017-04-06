import React, { Component } from 'react';
import { normalizeImgSrc } from '../Utils/normalize'
import { loadImg } from '../Utils/load'
import './ImagePart.css';

class ImagePart extends Component {
	constructor(props){
		super(props);
		this.proccessImage = this.proccessImage.bind(this);
		this.checkSize = this.checkSize.bind(this);
		this.shitThingHappend = this.shitThingHappend.bind(this);
		this.state = { 
			currentSrc:'',
		};
		this.index = 0;
		this.imagesSrc = [...props.imagesSrc];
	}
	// try to avoid small icons, and then render images.
	componentWillMount() {
		this.proccessImage(this.imagesSrc, this.index);
		// this.renderImg.call(this,this.state.imagesSrc, this.state.index );
	}
	proccessImage(imagesSrc, index){
		const realImgSrc = normalizeImgSrc(this.props.href, imagesSrc[index]);
		loadImg(realImgSrc)
		.then((imgObj) => this.checkSize(imgObj,30,30))
		.then((imageValid) => {
			if(imageValid){
				this.renderImg(realImgSrc, 0);
			}
			else{
				if(imagesSrc.length > index + 1){
					this.imagesSrc = [...imagesSrc.slice(0, index),
								...imagesSrc.slice(index+1)];
					this.proccessImage(this.imagesSrc,index);
				}
				else{
					this.shitThingHappend();
				}
			}
		})
		.catch((err)=>{
			if(imagesSrc.length > index + 1){
				this.imagesSrc = [...imagesSrc.slice(0, index),
							...imagesSrc.slice(index+1)];
				this.proccessImage(this.imagesSrc,index);
			}
			else{
				this.shitThingHappend();
			}
		});
	}
	renderImg(currentSrc){
		this.setState({ currentSrc });
	}
	// check image size.
	checkSize(imgObj, width, height){
		return (imgObj.width >= width && imgObj.height >= height)
		? true :false;
	}
	// when all images are not available
	shitThingHappend(){
		this.props.handleChildUnmount();
	}
  	render() { 
  		const { currentSrc } = this.state;
  		const imagesSrc = this.imagesSrc;
	    return (
			<figure  className="figure">
				<span 
					className={( this.index > 0)? 'figure_prev': 'hide' } 
					onClick={ ()=> this.proccessImage( imagesSrc,  --this.index)  }>previous</span>
				<span 
					className={( this.index < imagesSrc.length-1 )? 'figure_next': 'hide' } 
					onClick={ ()=> this.proccessImage( imagesSrc,  ++this.index) }>next</span>
				<img 
					className="figure_img" 
					alt="" 
					src={ currentSrc} />
			</figure>
		);
	}
}
export default  ImagePart;

