import React from 'react';
import request from 'superagent';


class ResultInp extends React.Component{



  constructor(props) {
   super(props);
   this.handleClick = this. handleClick.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.state = {
      track: '0',
      obedience: '0',
      protection: '0'

   };

 }

 componentWillMount() {
   if (this.props.results) {
     this.setState({
          track: this.props.results.track,
          obedience: this.props.results.obedience,
          protection: this.props.results.protection
    });
   }
 }

 handleChange(name, e) {
  const change = {};
  change[name] = e.target.value;
  this.setState(change);
 }

handleClick() {
const self = this;
     request
        .put('api/myevents/' + this.props.choosenEvent._id)
        .send({
        result: this.state,
        dogId: this.props.dog._id
        })
        .end(function(err, res) {
         self.setState(res.body.results);
        });
    }

  render() {
    return (


      <div>
        <div className='col-md-8'>
          <h3>{this.props.dog.name}</h3>

          <label className='control-label'>Spår</label>
          <input
            className='form-control'
            type='text'
            placeholder='Spår'
            name='track'
            value={this.state.track}
            onChange={this.handleChange.bind(this, 'track')} />

            <label className='control-label'>Lydnad</label>
            <input
              className='form-control'
              type='text'
              placeholder='Lydnad'
              name='obedience'
              value={this.state.obedience}
              onChange={this.handleChange.bind(this, 'obedience')} />

            <label className='control-label'>Skydd</label>
              <input
                className='form-control'
                type='text'
                placeholder='Skydd'
                name='protection'
                value={this.state.protection}
                onChange={this.handleChange.bind(this, 'protection')} />


          <button className='btn btn-primary' onClick={this.handleClick}>Submit</button>
          </div>
          <div className='col-md-4'>
               <img src={this.props.dog.image} className="img-responsive profile-pic" alt=""/>

          </div>

      </div>


    );
  }
}

module.exports = ResultInp;
ResultInp.propTypes = {
    choosenEvent: React.PropTypes.ObjectId,
    dog: React.PropTypes.Object,
    results: React.PropTypes.any
};
