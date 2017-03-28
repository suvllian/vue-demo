exports.toTop = (position) => {
    window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
    if(x > 0 || y != position) {
        setTimeout(function(){
          f();
        }, 60);
    }
}

exports.escape = (text) => {
	return text.replace(/[<>"&"]/g,function(match,pos,originalText){
		switch(match){
			case "<":
				return "&lt";
			case ">":
				return "&gt";
			case "\"":
				return "&quot";
			case "&":
				return "&amp";
		}
	});
}

exports.getScreenScale = () => {
	let height = document.documentElement.clientHeight;
	let width = document.documentElement.clientWidth;
	let scale = width / height;

	return {
		height: height,
		width: width, 
		scale: scale
	}
} 