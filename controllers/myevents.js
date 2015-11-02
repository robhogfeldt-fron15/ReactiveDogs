
let MyEvent = require('../models/myEvent');


exports.postmyEvents = function(req, res) {


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

//    Update reults
console.log(req.body.dogId);
if (req.body.result) {
      let selectedDog;
      myEvent.dogs.forEach( function( dog ){
        if ( String(dog._id) === req.body.dogId ){
          selectedDog = dog;
        }
      } );

    selectedDog.results = req.body.result;
    console.log(req.body.result);
    console.log('resultUpdated');


    } else {
      if (req.body.removeDogId) {

        let selectedDog;
        myEvent.dogs.forEach( function( dog ){
          if ( String(dog._id) === req.body.removeDogId ){
            selectedDog = dog;
            let i = myEvent.dogs.indexOf(selectedDog);
              if (i !== -1) {
              	 myEvent.dogs.splice(i, 1);
              }
          }
        } );

      } else {


        myEvent.dogs.push(req.body.addDogId);

      }}





    myEvent.save(function(errs) {
      if (err)
        res.send(errs);
          res.json({ message: 'event added !', data: myEvent });

    });
  });
};


exports.deletemyEvent = function(req, res) {
  MyEvent.findByIdAndRemove(req.params.myevent_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'delete!' });
  });
};
