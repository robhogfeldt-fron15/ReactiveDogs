import React, {PropTypes} from 'react';
import request from 'superagent';



class ChoosenEvent extends React.Component {

  constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

  componentWillMount(){
   this.props.choosenEvent.dogs = [];

  }

  handleClick(i) {
         let self = this;
              request
                 .put('api/myevents/' + this.props.choosenEvent._id)
                 .send({
                 removeDogId: this.props.choosenEvent.dogs[i]._id
                 })
                 .end(function(err, res){
                   console.log(res.body);
                   self.props.updateChoosenEvent(res.body);
                 });
              }

  render() {

      let choosenStyle = {clear: 'both'};
      let deleteButton = {fontSize: '0.8em', fontStyle: 'cursive'};
      let dogsInEvent;

      let self = this;
      if (this.props.choosenEvent.dogs.length === 0) {

      dogsInEvent =  <div className='col-md-12'>
                            <div>
                                <h4>Add  a couple of dogs..</h4>
                                <p>Add the dogs that will participate in {this.props.choosenEvent.name} from the list to your right</p>
                            </div>
                        </div>

      }else {
        dogsInEvent = this.props.choosenEvent.dogs.map(function(item, i) {
        return <li key={i} style={choosenStyle} onClick={self.handleClick.bind(self, i)}>

          <h4 className='alignleft'>{item.name}</h4>
          <h4 className='alignright' style={deleteButton}>Delete {item.name}</h4>
        </li>;
      });

      }



    return (

        <div className='col-md-12'>
          <div>
            <div className='panel panel-default'>
              <div className='panel-heading'>Choosen Event: {this.props.choosenEvent.name}</div>
              <div className='panel-body'>

                <ul>
                    {dogsInEvent}
                </ul>
              </div>
            </div>
              <button onClick={this.props.deleteChoosenEvent.bind(this, this.props.choosenEvent._id)}>Delete event {this.props.choosenEvent.name}</button>
          </div>
        </div>

    );
  }
}
ChoosenEvent.propTypes =  {
  choosenEvent: PropTypes.object,
  deleteChoosenEvent: PropTypes.func,
  updateChoosenEvent: PropTypes.func

};
export default ChoosenEvent;
