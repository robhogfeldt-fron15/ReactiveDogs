import React from 'react';
import request from 'superagent';
import Result from './Result';
import AddEvent from './events/addEvent.js';
import Events from './events/event.js';


class MyEvents extends React.Component {

  constructor(props) {
   super(props);
   this.handleEventSubmit = this.handleEventSubmit.bind(this);
   this.handleEventClick = this.handleEventClick.bind(this);
   this.state = {
                 events: [],
                 dogs: [],
                 newEvent: {},
                 choosenEvent: {},
               };

}



componentWillMount() {

  let self = this;
    request
       .get('api/myevents')
       .end(function(err, res){
        self.setState({
          events: res.body,
          choosenEvent: res.body[0],
          dogs: res.body[0].dogs
        });
       });
}





eventFormIsValid(){
  let isValid = true;
  this.state.errors = {};

  if (this.state.newEvent.name.length < 3){
      this.state.errors.name = 'at least 3 chars..';
      isValid = false;
  }
   this.setState({errors: this.state.errors});
   return isValid;

}

handleEventSubmit(){
   event.preventDefault();

    request
       .post('api/myevents')
       .send(this.state.newEvent)
       .end(function(err, res){
        self.setState({events: res.body});
       });

}


  handleEventClick(x){
  this.setState({
      choosenEvent: this.state.events[x],
      dogs: this.state.events[x].dogs
    });

  }


  render() {

      let self = this;
    //   let eventList = this.state.events.map(function(event, x){
    //   return <li key={x}>{event.date} {event.name}</li>;
    // });

    let dogsInEvent = this.state.dogs.map(function(dog, i){

    return <li key={i}>

              <Result dog={dog}
                      results={dog.results}
                      choosenEvent={self.state.choosenEvent}/>
            </li>;
  });
    return (
     <div className="container">
         <div className="col-md-4">
                  <div>
                      <Events events={this.state.events}
                              handleEventClick={this.handleEventClick}/>
                  </div>
                 <div>
                     <AddEvent />
                 </div>
         </div>

         <div className="col-md-8">
             <div className='panel panel-default'>
              <div className='panel-heading'>{this.state.choosenEvent.name}</div>
               <div className='panel-body'>

                 <div className="col-md-12">
                             <div className="col-md-6">
                                 <ul>
                                     <li><strong>When : </strong> {this.state.choosenEvent.date}</li>
                                     <li><strong>Where : </strong> {this.state.choosenEvent.location}</li>
                                 </ul>
                             </div>
                             <div className="col-md-6">

                                 <ul>
                                     <li><strong>Notes : </strong></li>
                                 </ul>
                                 <p>Lägg till prop för notes i modellen...</p>
                             </div>
                         </div>
                                 {dogsInEvent}
               </div>
            </div>
         </div>
      <div>


                    </div>

               </div>


    );
  }
}

export default MyEvents;
MyEvents.PropTypes = {
 dogs: React.PropTypes.array,
 choosenEvent: React.PropTypes.object
};

// handleDelete(i) {
//
//   console.log(this.state.dogs[i]._id);
//   request
//   .del('api/dogs/' + this.state.dogs[i]._id)
//   .end(function(err, res){
//    console.log(res);
//   });
// }
