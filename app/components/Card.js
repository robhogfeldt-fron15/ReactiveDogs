import React from 'react';


class Card extends React.Component {

  constructor(props) {
   super(props);
  }
  handleDogToEdit() {
    alert('EditDog not yet implemented...sorry =)')
  }
  render() {
  const meritList = this.props.dogs.merits.map(function(merit, i) {
  return <li key= {i}>{merit}</li>;
   });

    return (

      <div className="col-md-4">
           <div className="team-member">
               <img src={this.props.dogs.image} className="img-responsive" alt=""/>
               <div className="team-details">
                  <div className="designation">Thunder Dust´s Kennel</div>
                   <h4>{this.props.dogs.name}</h4>
                  <div className="designation">
                   <ul>
                     {meritList}
                   </ul>
                 </div>
                   <ul onClick={this.handleDogToEdit.bind(this, this.props.dogs)}>
                       <li><a><i className="fa fa-pencil-square-o"></i></a></li>
                   </ul>
               </div>
         </div>
       </div>

    );
  }
}

module.exports = Card;
Card.propTypes = {
handleDelete: React.PropTypes.func,
handleDogToEdit: React.PropTypes.func,
 dogs: React.PropTypes.object
};
