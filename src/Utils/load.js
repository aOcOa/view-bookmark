// load image and return a promise.
export function loadImg(src){
		return new Promise((resolve, reject) => {
		let imageObj = new Image();
		imageObj.onload = (evt) => {
			resolve(evt.target);
		}
		imageObj.onerror = (err) =>{
			reject(err);
		}
		imageObj.src = src; 
	})
}