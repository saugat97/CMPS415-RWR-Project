// var users = [
//     {
//        "Date": "2019-04-29T19:07:25.582Z",
//        "FirstName": "Billy",
//        "LastName": "Jorden",
//        "Major": "Bacholer",
//        "__v": "0",
//        "_id": "5cc74b6d02d310048c65d97d",
//        "isFullTime": "true"
//     },
//     {
//        "Date": "2019-04-29T19:18:15.312Z",
//        "FirstName": "Mike",
//        "LastName": "Gill",
//        "Major": "IT",
//        "__v": "0",
//        "_id": "5cc74df7146afe3d6cd011a5",
//        "isFullTime": "true"
//     },
//     {
//        "Date": "2019-04-29T19:18:37.959Z",
//        "FirstName": "Josh",
//        "LastName": "Hayden",
//        "Major": "HS",
//        "__v": "0",
//        "_id": "5cc74e0dc5752f403c734fba",
//        "isFullTime": "true"
//     }
//  ];

// var xml2js = require('xml2js');
// var builder = new xml2js.Builder({
//     rootName: 'users'
// });
// users = builder.buildObject(users);
// console.log(users); // show xml string















/***********  XML TO JSON  **********/

var xml2js = require('xml2js');
var users = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><tickets><_id>5cc74b6d02d310048c65d97d</_id><FirstName>Billy</FirstName><LastName>Jorden</LastName><Major>Bacholer</Major><isFullTime>true</isFullTime><Date>2019-04-29T19:07:25.582Z</Date><__v>0</__v></tickets>';
 

xml2js.parseString(users, {
    explicitArray: false, // we don't want an array for child nodes
    explicitRoot: false  // We don't want the child nodes to be as child property of a root element
}, function (error, object) {
    users = object;
    console.log(users);
});