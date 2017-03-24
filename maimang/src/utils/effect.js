exports.toTop = function (position){
    window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
    if(x > 0 || y != position) {
        setTimeout(function(){
          f();
        }, 60);
    }
}

exports.escape = function htmlEscape(text){
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