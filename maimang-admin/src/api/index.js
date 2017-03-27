import {getResource, postResource} from './resources';

export default{
	getAlbum:() => { return getResource.get({ do:"get", concrete:"album"})},

	getHot:() => { return getResource.get({ do:"get", concrete:"hot"})},

	getEmail:() => { return getResource.get({ do:"get", concrete:"email"})},

	getJoin:() => { return getResource.get({ do:"get", concrete:"join"})},

	getTeacher:() => { return getResource.get({ do:"get", concrete:"teacher"})},

	getTeacherId:() => { return getResource.get({ do:"get", concrete:"teachernumber"})},

	uploadImage:(fileData, name) => { return postResource.save({ do:"post", concrete:"uploadimage", image:fileData, name:name} )},

	changeAlbum:(id, intro) => { return postResource.save({ do:"post", concrete:"changealbum", id:id, intro:intro} )},

	changeTeacher:(id, intro, name) => { return postResource.save({ do:"post", concrete:"changeteacher", id:id, intro:intro, name:name} )},

	addTeacher:(id, intro, name) => { return postResource.save({ do:"post", concrete:"addteacher", id:id, intro:intro, name:name} )},

	deleteTeacher:(id) => { return postResource.save({ do:"post", concrete:"deleteteacher", id:id})},

	deletePerson:(id) => { return postResource.save({ do:"post", concrete:"deleteperson", id:id})},

	deleteEmail:(id) => { return postResource.save({ do:"post", concrete:"deleteemail", id:id})},

	login:(name, pass) => { return postResource.save({ do:"post", concrete:"login" ,name:name, pass:pass} )},
}