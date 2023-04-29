const express = require('express');

const Router = express.Router();
const Controller = require('../Controllers/milo_c');

Router.get('/', Controller.home);

Router.get('/saved', Controller.saved);

Router.get('/addPost', Controller.addPost);

Router.get('/messages', Controller.messages);

Router.get('/games', Controller.games);

Router.post('/add-a-post',Controller.addNewPost);

Router.post('/add-comment',Controller.addComment);

Router.get('/delete-comment', Controller.deleteComment);

Router.get('/delete-post', Controller.deletePost);

module.exports = Router;