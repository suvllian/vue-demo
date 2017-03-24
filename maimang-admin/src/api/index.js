import {getResource, postResource} from './resources';

export default{
	getAlbum:() => { return getResource.get({ do:"get", concrete:"album"})},

	getHot:() => { return getResource.get({ do:"get", concrete:"hot"})},

	getEmail:() => { return getResource.get({ do:"get", concrete:"email"})},

	getJoin:() => { return getResource.get({ do:"get", concrete:"join"})},

	getTeacher:() => { return getResource.get({ do:"get", concrete:"teacher"})},

	uploadImage:(fileData, name) => { return postResource.save({ do:"post", concrete:"uploadimage" ,image:fileData, name:name} )},

	changeAlbum:(id, intro) => { return postResource.save({ do:"post", concrete:"changealbum" ,id:id, intro:intro} )},

	deletePerson:(id) => { return postResource.save({ do:"post", concrete:"deleteperson", id:id})},

	deleteEmail:(id) => { return postResource.save({ do:"post", concrete:"deleteemail", id:id})},
}