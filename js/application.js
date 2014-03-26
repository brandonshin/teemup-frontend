window.TeemUp = Ember.Application.create({
        ready: function () {
            setInterval(function() {
                $(document).foundation();
            }, 2000);
        }
    });

TeemUp.ApplicationAdapter = DS.FixtureAdapter.extend();