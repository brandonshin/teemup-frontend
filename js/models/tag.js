TeemUp.Event = DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
   image_url: DS.attr('string'),
   lat: DS.attr('float'),
   lon: DS.attr('float')
});

TeemUp.Event.FIXTURES = [
 {
   id: 1,
   name: 'Corduroy',
   description: "Have you ever dreamed of being locked in a department store at night? The endearing story of Corduroy paints a picture of the adventures that might unfold (for a teddy bear at least) in such a situation. When all the shoppers have gone home for the night, Corduroy climbs down from the shelf to look for his missing button. It's a brave new world! He accidentally gets on an elevator that he thinks must be a mountain and sees the furniture section that he thinks must be a palace. He tries to pull a button off the mattress, but he ends up falling off the bed and knocking over a lamp. The night watchman hears the crash, finds Corduroy, and puts him back on the shelf downstairs. The next morning, he finds that it's his lucky day! A little girl buys him with money she saved in her piggy bank and takes him home to her room. Corduroy decides that this must be home and that Lisa must be his friend.",
   image_url: "http://teemup.us/system/events/pictures/000/000/109/medium/spikeandmike.png?1395700752",
   lat: 34.4162578,
   lon: -119.8452565
 },
 {
   id: 2,
   name: 'The Very Hungry Caterpillar',
   description: "One sunny Sunday, the caterpillar was hatched out of a tiny egg. He was very hungry. On Monday, he ate through one apple; on Tuesday, he ate through three plums--and still he was hungry. Strikingly bold, colorful pictures and a simple text in large, clear type tell the story of a hungry little caterpillar's progress through an amazing variety and quantity of foods. Full at last, he made a cocoon around himself and went to sleep, to wake up a few weeks later wonderfully transformed into a butterfly!",
   image_url: "http://teemup.us/system/events/pictures/000/000/088/medium/smoke.png?1395697508",
   lat: 34.4162578,
   lon: -119.8452565
 },
 {
   id: 3,
   name: 'Goodnight Moon',
   description: 'In a great green room, tucked away in bed, is a little bunny. "Goodnight room, goodnight moon." And to all the familiar things in the softly lit room--to the picture of the three little bears sitting in chairs, to the clocks and his socks, to the mittens and the kittens, to everything one by one--he says goodnight.',
   image_url: "http://teemup.us/system/events/pictures/000/000/094/medium/china.png?1395698304",
   lat: 34.4162578,
   lon: -119.8452565
 }
];

TeemUp.imageView = Ember.View.extend({
  tagName: 'img',
  attributeBindings: ['src', 'alt', 'width', 'height'],
  src: function(){
      var image_url = this.get('event.image_url');
      return image_url;
    }.property('event.image_url'),
  alt: function(){
      var name = this.get('event.name')
      return name;
   }.property('event.name'),
  width: function(){
      return '320px';
  }.property(),
  height: function(){
      return '200px';
  }.property()
});

TeemUp.mapView = Ember.View.extend({
  id: 'map_canvas',
  tagName: 'div',
  attributeBindings: ['style'],
  style:"width:320px; height:200px",
  map:null,

  didInsertElement: function() {
   var mapOptions = {
   center: new google.maps.LatLng(37.871667, -122.272778),
   zoom: 13,
   mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   var map = new google.maps.Map(this.$().get(0),mapOptions);
   this.set("map",map);

   var that = this;

 
  }
});

TeemUp.MarkerView = Ember.View.extend({

  marker: null,

  setup : function(mapEvent,eventCont,mapView){
    console.log("setting up")
    console.log(this.get('content'))
    var marker = new google.maps.Marker({
        position: mapEvent.latLng
    });
    this.set("marker",marker);
    marker.setMap(mapView.get("map"));
    this.set("controller", eventCont);

    var that=this;
    google.maps.event.addListener(marker, 'click', function() {
        console.log("controller:")
        that.get("controller").eltSelected();
    });
  },
  markerIcon: function() {
        if (this.get("controller").get("selected")) {
          this.get("marker").setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
        } else {
          this.get("marker").setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
        }
  }.observes("controller.selected"),

  removed: function(){
    if(this.get("controller").get("model").get("removed")){
      this.marker.setMap(null);
      this.get("parentView").removeObject(this);
    }
  }.observes("controller.content.removed")

})
