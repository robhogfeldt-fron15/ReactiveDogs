import React from 'react';
import request from 'superagent';
import Picker from './../common/datePicker.js';


class AddEvent extends React.Component {

  constructor(props) {
   super(props);
   this.handleEventSubmit = this.handleEventSubmit.bind(this);
   this.handleDate = this.handleDate.bind(this);
   this.state = {

                 newEvent: {},
                 date: ''
               };

}

handleChange(name, e){
     let change = {};
     change[name] = e.target.value;
     this.setState(change);

  }


handleDate(mydate){
  this.setState({
      date: mydate
    });
}

  handleEventSubmit(){

    request
       .post('api/myevents')
       .send(this.state)
       .end(function(err, res){
      console.log(res);
       });

  }

  render() {

    return (

      <div className='row flipInX animated'>
          <div>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Event</div>
              <div className='panel-body'>
                <form onSubmit={this.handleEventSubmit}>
                   <div className='form-group'>
                     <label className='control-label'>Event Name</label>

                     <input type='text'
                            className='form-control'
                            name='name'
                            required
                            value={this.state.name}
                            onChange={this.handleChange.bind(this, 'name')} />

                     <label className='control-label'>Event Place</label>

                     <input type='text'
                            className='form-control'
                            name='location'
                            required
                            value={this.state.location}
                            onChange={this.handleChange.bind(this, 'location')} />

                       <label className='control-label'>Event Date</label>

                       <Picker handleChange={this.handleDate} />
                   </div>
                   <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
               </div>
            </div>
          </div>
      </div>
    );
  }
}

export default AddEvent;
AddEvent.propTypes = {
 onChange: React.PropTypes.any,
 changeNumber: React.PropTypes.any,
 newEvent: React.PropTypes.any,
 handleEventSubmit: React.PropTypes.Any
};
