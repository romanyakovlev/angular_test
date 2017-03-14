var express = require('express');
var router = express.Router();
var json_data = require('../messages.json');
var fs = require('fs')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Сообщения'});
});

router.get('/get_all_posts', function(req, res, next) {
    res.end(JSON.stringify({messages:json_data.messages}));
});

router.post('/post_message', function(req, res, next) {
    var message_text = req.body.text;
    var message_user = req.body.user;
    var created_date = new Date();
    json_data.messages.push({text:message_user, user:message_text, date:created_date.toJSON()});
    fs.writeFile('messages.json', JSON.stringify(json_data), 'utf8');
    res.end(JSON.stringify({date:created_date.toJSON()}));
});

module.exports = router;
