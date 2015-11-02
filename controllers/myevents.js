
let MyEvent = require('../models/myEvent');


exports.postmyEvents = function(req, res) {

  console.log(req.body);
  let myEvent = new MyEvent();
  myEvent.name = req.body.name;
  myEvent.location = req.body.location;
  myEvent.date = req.body.date;
  myEvent.dogs = [];




  myEvent.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'myEvent added !', data: myEvent });
  });
};


exports.getmyEvents = function(req, res) {
  MyEvent.find(function(err, events) {
    if (err)
      res.send(err);

    res.json(events);
  });
};


exports.getmyEvent = function(req, res) {
  MyEvent.findById(req.params.event_id, function(err, myEvent) {
    if (err)
      res.send(err);

    res.json(myEvent);
  });
};


exports.putmyEvent = function(req, res) {



  MyEvent.findById(req.params.myevent_id, function(err, myEvent) {
    if (err)
      res.send(err);


      let selectedDog;

      myEvent.dogs.forEach( function( dog ){
        if ( String(dog._id) === req.body.dogId ){
          selectedDog = dog;
        }
      } );

    selectedDog.results = req.body.result;
    console.log(req.body.result);

    myEvent.save(function(errs) {
      if (err)
        res.send(errs);

      res.json(selectedDog);
    });
  });
};


exports.deletemyEvent = function(req, res) {
  MyEvent.findByIdAndRemove(req.params.event_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'delete!' });
  });
};
