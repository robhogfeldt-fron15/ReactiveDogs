import React from 'react';
import request from 'superagent';

class Dog extends React.Component {

  constructor(props) {
   super(props);
   this.handleDogClick = this.handleDogClick.bind(this);
    }

  handleDogClick(i) {
    const self = this;
    request
       .put('api/myevents/' + this.props.choosenEvent._id)
       .send({
        addDogId: this.props.dogs[i]})
       .end(function(err, res) {
        self.setState({events: res.body});
       });
  }

  render() {
    const self = this;
    const eventList = this.props.dogs.map(function(dog, i) {
      return <li key={i} onClick={self.handleDogClick.bind(self, i)}>{dog.name} </li>;
    });
    return (
      <div>
        <div className="row flipInX animated">
          <div>
            <div className="panel panel-default">
              <div className="panel-heading">Add dog to event: {this.props.choosenEvent.name}</div>
              <div className="panel-body">
                {eventList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dog;
Dog.propTypes = {
 dogs: React.PropTypes.array,
 choosenEvent: React.PropTypes.object
};
