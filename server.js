"use strict";
const express = require('express')  
const bodyParser = require('body-parser')
const controller = require('./controller.js')
const app = express();

app.use(bodyParser.json());

app.get('/api/users', controller.getUsers)
app.get('/api/users/admin', controller.privilegeAdmin)
app.get('/api/users/moderator', controller.privilegeModerator)
app.get('/api/users/user', controller.privilegeUser)
app.get('/api/users/:id', controller.getById)
app.post('/api/users', controller.addUser)
app.post('/api/users/admin', controller.addPrivilegeAdmin)
app.post('/api/users/moderator', controller.addPrivilegeModerator)
app.post('/api/users/user', controller.addPrivilegeUser)
app.post('/api/users/language/:id', controller.changeLanguage)
app.post('/api/users/forums/:id', controller.addToForums)
app.delete('/api/users/forums/:id', controller.deleteFromForums)
app.delete('/api/users/:id', controller.deleteUser)
app.put('/api/users/:id', controller.updateUser)

app.listen(process.env.PORT || 3000, function(){
    console.log(`listening on port ${this.address().port}` );
})

module.exports = app;