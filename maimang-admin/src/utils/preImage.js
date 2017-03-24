const preViewImg = (file, imageDom) =>{
	let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (oFREvent) => {
        imageDom.src = oFREvent.target.result;
    };
}

export { preViewImg };