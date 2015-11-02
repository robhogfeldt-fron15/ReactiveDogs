
let Event = require('../models/event');


exports.postEvents = function(req, res) {

  console.log(req.body);
  let event = new Event();
  event.name = req.body.name;
  event.location = req.body.location;
  event.date = req.body.date;
  event.dogs = req.body.dogs;



  event.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'event added !', data: event });
  });
};


exports.getEvents = function(req, res) {
  Event.find(function(err, events) {
    if (err)
      res.send(err);

    res.json(events);
  });
};


exports.getEvent = function(req, res) {
  Event.findById(req.params.event_id, function(err, event) {
    if (err)
      res.send(err);

    res.json(event);
  });
};


exports.putEvent = function(req, res) {
console.log(req.body);
  Event.findById(req.params.event_id, function(err, event) {
    if (err)
      res.send(err);

    event.dogs.push(req.body._id);
    console.log(event.dogs);


    event.save(function(errs) {
      if (err)
        res.send(errs);

      res.json(event);
    });
  });
};


exports.deleteEvent = function(req, res) {
  Event.findByIdAndRemove(req.params.event_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'delete!' });
  });
};
