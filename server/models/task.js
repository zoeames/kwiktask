'use strict';

var Mongo = require('mongodb');

function Task(o){
  this.name       = o.name;
  this.due        = new Date(o.due);
  this.priorityId = Mongo.ObjectID(o.priorityId);
  this.isComplete = false;
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

Task.all = function(cb){
  Task.collection.find().toArray(cb);
};

Task.create = function(o, cb){
  var t = new Task(o);
  Task.collection.save(t, cb);
};

module.exports = Task;
