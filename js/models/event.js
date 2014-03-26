TeemUp.Tag = DS.Model.extend({
	name: DS.attr('string'),
	count: DS.attr('integer'),
});

TeemUp.Tag.FIXTURES = [
 {
   id: 1,
   name: 'Movies',
   count: 5
 },
 {
   id: 2,
   name: 'Music',
   count: 2
 },
];