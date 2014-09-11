'use strict';
var Mongo = require('mongodb');


function Priority(o){
  this.name   = o.name;
  this.color  = o.color;
}

Object.defineProperty(Priority, 'collection', {
  get: function(){return global.mongodb.collection('priorities');}
});

Priority.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Priority.collection.findOne({_id:_id}, function(err, obj){
    cb(err, _.create(Priority.prototype, obj));
  });
};

Priority.all = function(cb){
  Priority.collection.find().toArray(cb);
};


Priority.create = function(obj, cb){
  var p = new Priority(obj);
  Priority.collection.save(p, cb);
};

module.exports = Priority;
