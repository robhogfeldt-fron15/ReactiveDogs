import React from 'react';
import moment from 'moment';

let timeStyle = {
  time: '',
  style: ''
};



let divStyle = {color: 'green',  fontWeight: 'bold', fontSize: '90px', clear: 'both'};
let divStyle2 = {color: '#337ab7', textAlign: 'justify', clear: 'both'};
let divStyle3 = {color: '#FA6900', textAlign: 'justify', clear: 'both'};



class Event extends React.Component {
  constructor(props) {
   super(props);
    }






    dateCheck(date){
      let nowDate = new Date();

      let moment1 = new moment(new Date(nowDate));
      let moment2 = new moment(new Date(date));
      let diffInMilliSeconds = moment2.diff(moment1);
      let duration = moment.duration(diffInMilliSeconds);



      let days = duration.days().toString();



      let today = 'Idag!';
      let upComming = 'Days left : ' + days;
      let datePassed = 'Completed! ';
      let x = nowDate.toLocaleDateString('en-US');

    if (date === x)  {
      timeStyle = { time: today, style: divStyle };
    } else if (days.substring(0, 1) === '-') {
       timeStyle = { time: datePassed, style: divStyle3 };
    } else {
       timeStyle = { time: upComming, style: divStyle2 };
      }
    return timeStyle;
      }

  render() {

      let self = this;

      let sorted = this.props.events.sort(function(obj1, obj2) {
      	return new Date(obj2.date) - new Date(obj1.date);
  });

      let eventList = sorted.map(function(event, i){
      timeStyle = self.dateCheck(event.date);
      return <li key={i} style={timeStyle.style}
                         onClick={self.props.handleEventClick.bind(self, i)}>
                         <p className='alignleft'>
                          {event.name}
                         </p>
                         <p className='alignright'>
                           {timeStyle.time}
                         </p>
                       </li>;
    });
    return (

      <div>
        <div className='row flipInX animated'>
          <div>

            <div className='panel panel-default'>
              <div className='panel-heading'>Choose Event</div>
              <div className='panel-body'>
                {eventList}
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default Event;
Event.propTypes = {
 handleEventClick: React.PropTypes.any,
 events: React.PropTypes.array
};
