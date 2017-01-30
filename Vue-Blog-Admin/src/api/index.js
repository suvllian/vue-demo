import {getResource,postResource} from './resources';

export default{

	// Book
	getBookClass: () => { return getResource.get({do:"book", concrete:"getClass"}); },

	getAllBook: page => { return getResource.get({do:"book", concrete:"allBook", page:page}); },

	addBookClass: className => { 
		if (className !== null)
		return postResource.save({do:"book", concrete:"addClass", class:className}) 
	},

	addBook: content => { return postResource.save({do:"book", concrete:"addBook", content:content})},

	deleteBook: id => { return postResource.save({do:"book", concrete:"deleteBook", iId:id})},

	changeBook: content => { return postResource.save({do:"book", concrete:"changeBook", content:content})},

	//Article
	getArticleClass:() => { return getResource.get({do:"article", concrete:"getClass"}); },

	// Image
	addImage: content => { return postResource.save({do:"image", concrete:"addImage", content:content})},

	getImageClass: () => { return getResource.get({do:"image", concrete:"getCity"}); },

	getAllImage: page => { return getResource.get({do:"image", concrete:"allImage", page:page}); },

	deleteImage: id => { return postResource.save({do:"image", concrete:"deleteImage", iId:id})},

	changeImage: content => { return postResource.save({do:"image", concrete:"changeImage", content:content})},
}