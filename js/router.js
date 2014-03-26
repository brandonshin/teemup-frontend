TeemUp.Router.map(function(){
	this.resource('events', {path: '/'}, function(){
		this.resource('event', { path: '/event/:event_id' });
		this.resource('tags', { path: '/tags' });
	});
});

TeemUp.EventsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('event');
	}
});

TeemUp.EventsIndexRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('events');
	}
});

TeemUp.EventRoute = Ember.Route.extend({
  model: function(params) { 
    return this.store.find('event', params.event_id);
	}
});

TeemUp.TagsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('tag');
	}
});