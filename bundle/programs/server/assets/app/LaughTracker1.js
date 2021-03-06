Users = new Meteor.Collection('users');
History = new Meteor.Collection('history');

if (Meteor.isClient) {
	Meteor.subscribe('allUsers');
	Meteor.subscribe('allHistory');
	
	Template.userDetails.helpers({
		user: function(){
				return Users.findOne();
			}
			
			
	});
	Template.history.helpers({
		historyItem: function(){
			return History.find({}, {sort: {date: -1}, limit: 10});
		}
	})
	Template.userDetails.events({
		'click #addAmount': function(e){
			e.preventDefault();
			
			var amount = parseInt($('#amount').val());
			
			Users.update(this._id, {$inc: {total:amount} });
			
			History.insert({
				value: amount,
				date: new Date().toTimeString(),
				userId: this._id
			})
		}
	})
}
if (Meteor.isServer) {
	Meteor.publish('allUsers', function(){
		return Users.find();
	});
	
	Meteor.publish('allHistory', function(){
		return History.find();
	});
  Meteor.startup(function () {
    // code to run on server at startup
	if (Users.find().count() === 0){
		Users.insert({
			total:10,
			goal: 2000
		});
	}
	if (History.find().count() === 0){
		History.insert({
			value: 50,
			date: new Date().toTimeString()
		});
		History.insert({
			value: 30,
			date: new Date().toTimeString()
		});
		History.insert({
			value: 10,
			date: new Date().toTimeString()
		});
	}
  });
}