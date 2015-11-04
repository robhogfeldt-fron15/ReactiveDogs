import React from 'react';
import request from 'superagent';

class Dog extends React.Component {

  constructor(props) {
   super(props);
   this.handleDogClick = this.handleDogClick.bind(this);
    }

  handleDogClick(i) {
   const dog = this.props.dogs[i];
   this.props.addDogToEvent(dog);
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
 addDogToEvent: React.PropTypes.func,
 choosenEvent: React.PropTypes.object
};
