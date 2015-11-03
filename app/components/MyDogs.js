import React from 'react';
import request from 'superagent';
import Card from './Card.js';
import AddDog from './dogs/addDog.js';
import EditDog from './dogs/editDog.js';


class MyDogs extends React.Component {

  constructor(props) {
   super(props);
   this.handleDelete = this.handleDelete.bind(this);
   this.handleDogToEdit = this.handleDogToEdit.bind(this);
   this.state = {
                 dogs: [],
                 dogToEdit: {}
               };
             }


componentDidMount() {
  const self = this;
       request
          .get('api/dogs')
          .end(function(err, res) {
           self.setState({dogs: res.body});
          });
}

handleDogToEdit(dog) {
console.log(dog);
  this.setState({
    dogToEdit: dog
  });
}

handleDelete(i) {
  console.log(this.state.dogs[i]._id);
  request
  .del('api/dogs/' + this.state.dogs[i]._id)
  .end(function(err, res) {
   console.log(res);
  });
}

updateNewDog(dog) {
const self = this;
if (!dog.image) {
  dog.image = 'http://image.spreadshirtmedia.com/image-server/v1/designs/12337518,width=200,height=200';
}
request
   .post('api/dogs')
   .send(dog)
   .end(function(err, res) {
    self.setState({dogs: self.state.dogs.concat([dog])});
    console.log(res);
   });
}

  render() {
      const self = this;
      const eventList = this.state.dogs.map(function(dog, i) {
      return <li key={i}> <Card dogs={dog} name={dog.name} handleDogToEdit={self.handleDogToEdit}/></li>;
    });
    return (
      <div className="container">
       <div className="col-sm-8">
          <ul>
            {eventList}
          </ul>
       </div>
       <div className="col-sm-4">
         <AddDog newDog={this.state.newDog} updateNewDog={this.updateNewDog.bind(this)} />
         <EditDog dog={this.state.dogToEdit} />
      </div>
    </div>
    );
  }
}

export default MyDogs;
Event.propTypes = {
 dogs: React.PropTypes.array,
 choosenEvent: React.PropTypes.object
};
