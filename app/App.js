import React from 'react';
import Events from './components/events/event.js';
import Dogs from './components/dogs/dogs.js';
import ChoosenEvent from './components/events/choosenEvent.js';
import request from 'superagent';
import Spinner from 'react-spinner';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.updateChoosenEvent = this.updateChoosenEvent.bind(this);
    this.removeDogFromEvent = this.removeDogFromEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setEventState = this.setEventState.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.eventFormIsValid = this. eventFormIsValid.bind(this);
    this.state = {
                  choosenEvent: {},
                  events: [],
                  dogs: [],
                  newEvent: {},
                  errors: {}
                };
              }

  componentDidMount() {
    const self = this;
      request
         .get('api/myevents')
         .end(function(err, res) {
          self.setState({
            events: res.body,
            choosenEvent: res.body[0]
          });
         });
         request
            .get('api/dogs')
            .end(function(err, res) {
             self.setState({dogs: res.body});
            });
          }

  handleChange(num) {
     this.setState({
       choosenEvent: this.state.events[num]
     });
   }

   eventFormIsValid() {
     let isValid = true;
     this.state.errors = {};
     if (this.state.newEvent.name.length < 3) {
         this.state.errors.name = 'at least 3 chars..';
         isValid = false;
     }
      this.setState({errors: this.state.errors});
      return isValid;
   }

   handleEventSubmit(event) {
    event.preventDefault();
     if (!this.eventFormIsValid()) {
       return;
     }
       request
          .post('api/events')
          .send(this.state.newEvent)
          .end(function(err, res) {
           self.setState({events: res.body});
          });


          return;
   }

   setEventState(event) {
     const field = event.target.name;
     const value = event.target.value;

     this.state.newEvent[field] = value;
     return this.setState({newEvent: this.state.newEvent});
   }

  deleteEvent(x) {
    request
      .del('api/myevents/' + x)
      .end(function(err, res) {
       console.log(res);
   });
}

addDogToEvent(dogToAdd) {
 const self = this;
    request
       .put('api/myevents/' + this.state.choosenEvent._id)
       .send({
        addDogId: dogToAdd})
       .end(function(err, res) {
        self.setState({choosenEvent: res.body});
       });
}

removeDogFromEvent(dog) {
  const self = this;
  request
     .put('api/myevents/' + this.state.choosenEvent._id)
     .send({
      removeDogId: dog})
     .end(function(err, res) {
      console.log(res.body);
      self.setState({choosenEvent: res.body});
     });
}


updateChoosenEvent(event) {
this.setState({
  choosenEvent: event
});
}

  render() {
    return (
        <div className="container">
             <div className="col-sm-4">
              <div>
                  <Events handleEventClick={this.handleChange}
                           events={this.state.events}/>
              </div>
            </div>

            <div className="col-sm-4">
              <Spinner/>
              <ChoosenEvent choosenEvent={this.state.choosenEvent}
                            deleteChoosenEvent={this.deleteEvent}
                            removeDogFromEvent={this.removeDogFromEvent}
                            updateChoosenEvent={this.updateChoosenEvent}/>
            </div>
            <div className="col-sm-4">
               <Dogs choosenEvent={this.state.choosenEvent}
                     addDogToEvent={this.addDogToEvent.bind(this)}
                     dogs={this.state.dogs}/>

      </div>
    </div>

    );
  }
}
