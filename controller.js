const users = require('./users.json')

module.exports = {
  getUsers: function(req, res){
    if(Object.keys(req.query).length !== 0){ 
      let list = [] 
      param = Object.keys(req.query)[0];
      for (let user of users){
        if(user[param] && req.query[param] && user[param].toString().toLowerCase() == req.query[param].toString().toLowerCase()) list.push(user)
        else if(user[param] == req.query[param]) list.push(user)
      } 
      res.status(200).send(list)
    }
    else res.status(200).send(users)
  },
  privilegeAdmin: function(req, res){
    let admins = [];
    for(let user of users){
      if(user.type === 'admin') admins.push(user)
    }
    res.status(200).send(admins)
  },
  privilegeModerator: function(req, res){
    let moderators = []
    for(let user of users){
      if(user.type === 'moderator') moderators.push(user)
    }
    res.status(200).send(moderators)
  },
  privilegeUser: function(req, res){
    let privilegeUsers = []
    for(let user of users){
      if(user.type === 'user') privilegeUsers.push(user)
    }
    res.status(200).send(privilegeUsers)
  },
  getById: function(req, res){
    let found = false;
    for(let user of users){
      if(user.id == req.params.id){
        found = true;
        res.status(200).send(user)
      }
    }
    if(!found) res.sendStatus(404)
  },
  addUser: function(req, res){
    req.body.id = Math.max.apply(Math, users.map(function(user){return user.id}))+1;
    req.body.type = 'user'
    users.push(req.body)
    res.status(200).send(req.body)
  },
  addPrivilegeAdmin: function(req, res){
    req.body.id = Math.max.apply(Math, users.map(function(user){return user.id}))+1;
    req.body.type = 'admin'
    users.push(req.body)
    res.status(200).send(req.body)
  },
  addPrivilegeModerator: function(req, res){
    req.body.id = Math.max.apply(Math, users.map(function(user){return user.id}))+1;
    req.body.type = 'moderator'
    users.push(req.body)
    res.status(200).send(req.body)
  },
  addPrivilegeUser: function(req, res){
    req.body.id = Math.max.apply(Math, users.map(function(user){return user.id}))+1;
    req.body.type = 'user'
    users.push(req.body)
    res.status(200).send(req.body)
  },
  changeLanguage: function(req, res){
    if(req.params.id){ 
      for(let user of users){
        if(user.id == req.params.id){
          user.language = req.body.language
          res.status(200).send(user)
        }
      }
    }
    else res.sendStatus(404);
  },
  addToForums: function(req, res){
    if(req.params.id){
      for(let user of users){
        if(user.id == req.params.id){
          if(Array.isArray(user.favorites)) user.favorites[user.favorites.length] = (req.body.add)
          else user.favorites = [req.body.add];
          res.status(200).send(user)
        }
      }
    }
    else res.sendStatus(404);
  },
  deleteFromForums: function(req, res){
    if(req.params.id && Object.keys(req.query).length !== 0){
      for(let user of users){
        if(user.id == req.params.id){
          if(user.favorites) user.favorites.splice(user.favorites.indexOf(req.query.favorite),1)
          res.status(200).send(user)
        }
      }
    }
    else res.sendStatus(404);
  },
  deleteUser: function(req, res){
    if(req.params.id){
      for(let user of users){
        if(user.id == req.params.id){
          users.splice(users.indexOf(user), 1)
          res.status(200).send(user)
        }
      }
    }
    else res.sendStatus(404);
  },
  updateUser: function(req, res){
    if(req.params.id){
      for(let user of users){
        if(user.id == req.params.id){
          for(let key in req.body){
            user[key] = req.body[key] 
          }
          res.status(200).send(user)
        }
      }
    }
    else res.sendStatus(404);
  }



}//end of module