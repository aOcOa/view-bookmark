export function normalizeImgSrc(baseUrl, imageUrl){
	if(imageUrl.indexOf('data:image') === 0){
		return imageUrl;
	}
	const basePatt = /^https?:\/\/[^/]+/i;
	const adjustedImgUrl = (imageUrl.indexOf('/') === 0)
		? imageUrl : '/' + imageUrl;
	const fullSrc = (imageUrl.indexOf('http') > -1) || (imageUrl.indexOf('//') === 0) 
				? imageUrl : baseUrl.match(basePatt)[0] + adjustedImgUrl;
	// console.log(`url:${baseUrl} full:${fullSrc}`);
	return fullSrc;
}