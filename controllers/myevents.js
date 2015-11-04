
const MyEvent = require('../models/myEvent');


exports.postmyEvents = function(req, res) {
  console.log(req.body);
  const myEvent = new MyEvent();
  myEvent.name = req.body.name;
  myEvent.location = req.body.location;
  myEvent.date = req.body.date;
  myEvent.dogs = [];


  myEvent.save(function(err) {
    if (err) {
      res.send(err);
     }

    res.json({ message: 'myEvent added !', data: myEvent });
  });
};


exports.getmyEvents = function(req, res) {
  MyEvent.find(function(err, events) {
    if (err) {
      res.send(err);
     }

    res.json(events);
  });
};


exports.getmyEvent = function(req, res) {
  MyEvent.findById(req.params.event_id, function(err, myEvent) {
    if (err) {
      res.send(err);
     }

    res.json(myEvent);
  });
};


exports.putmyEvent = function(req, res) {
  MyEvent.findById(req.params.myevent_id, function(err, myEvent) {
    if (err) {
      res.send(err);
     }
      let selectedDog;


      // Remove from event
      if (req.body.removeDogId) {
        console.log('remove dog from event');
        MyEvent.findByIdAndUpdate(
          req.params.myevent_id,
          { $pull: { 'dogs': {  _id: req.body.removeDogId._id } } }, {new: true}, function(er, model) {
          if (er) {
          	console.log(err);
          	return res.send(err);
           }
           console.log(model);
           return res.json(model);
         });
       } else if (req.body.addDogId) {
           console.log('add dog to event');
           MyEvent.findByIdAndUpdate(
             req.params.myevent_id,
             { $push: { 'dogs': req.body.addDogId  } }, {new: true}, function(er, model) {
             if (er) {
               console.log(err);
               return res.send(err);
              }
              console.log(model);
              return res.json(model);
            });
        // Add Results
      } else if (req.body.result) {
        console.log('add result');
        myEvent.dogs.forEach( function( dog ) {
          if ( String(dog._id) === req.body.dogId ) {
            selectedDog = dog;
          }
        });
      selectedDog.results = req.body.result;
      console.log(req.body.result);
      myEvent.save(function(errs) {
        if (err) {
          res.send(errs);
         }
        res.json(selectedDog);
      });
    }
});
};

exports.deletemyEvent = function(req, res) {
  MyEvent.findByIdAndRemove(req.params.event_id, function(err) {
    if (err) {
      res.send(err);
     }
    res.json({ message: 'delete!' });
  });
};
