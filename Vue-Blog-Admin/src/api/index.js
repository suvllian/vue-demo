import {getResource,postResource} from './resources';

export default{

	// Book
	getBookClass: () => { return getResource.get({do:"book", concrete:"getClass"}); },

	getAllBook: page => { return getResource.get({do:"book", concrete:"allBook", page:page}); },

	addBookClass: className => { 
		if (className !== null)
		return postResource.save({do:"book", concrete:"addClass", class:className}) 
	},

	uploadBookImage: (data, name) => { return postResource.save({do:"book", concrete:"uploadImage", name:name, image:data})},

	addBook: content => { return postResource.save({do:"book", concrete:"addBook", content:content})},

	deleteBook: id => { return postResource.save({do:"book", concrete:"deleteBook", iId:id})},

	changeBook: content => { return postResource.save({do:"book", concrete:"changeBook", content:content})},

	//Article
	getArticleClass:() => { return getResource.get({do:"article", concrete:"getClass"}); },

	addArticeClass: className => { return postResource.save({do:"article", concrete:"addClass", class:className})},

	addArticle: content => { return postResource.save({do:"article", concrete:"addArticle", name:content.name,
								image:content.image, intro:content.intro, date:content.date, content:content.content, 
								class:content.class})},

	// Image
	addImage: content => { return postResource.save({do:"image", concrete:"addImage", content:content})},

	uploadImage: (data, name) => { return postResource.save({do:"image", concrete:"uploadImage", name:name, image:data})},

	addCity: city => { return postResource.save({do:"image", concrete:"addCity", city:city})},

	getImageClass: () => { return getResource.get({do:"image", concrete:"getCity"}); },

	getAllImage: page => { return getResource.get({do:"image", concrete:"allImage", page:page}); },

	deleteImage: id => { return postResource.save({do:"image", concrete:"deleteImage", iId:id})},

	changeImage: content => { return postResource.save({do:"image", concrete:"changeImage", content:content})},
}