import React from 'react';
import request from 'superagent';



class editDog extends React.Component {

  constructor(props) {
   super(props);
   this.handleChange = this.handleChange.bind(this);
   this.handleMeritsChange = this.handleMeritsChange.bind(this);
   this.handleEditDogSubmit = this.handleEditDogSubmit.bind(this);
   this.state = {

                 editDog: {
                          name: '',
                          image: '',
                          merits: []
                        }
                      };
                    }



handleEditDogSubmit(){
  request
     .post('api/dogs')
     .send(this.state.newDog)
     .end(function(err, res){
       alert(res.body);
      self.setState({events: res.body});
     });
   }

handleChange(e){
   this.setState({
     newDog: ({ name: e.target.value, merits: this.state.newDog.merits })
   });
 }

 handleChange(e){
  let field = e.target.name;
  let value = e.target.value;
  this.state.newDog[field] = value;
  return this.setState({newDog: this.state.newDog });
  }

 handleMeritsChange(e){

    let exists = this.meritExist(e.target.value);
    if (!exists) {
      this.state.newDog.merits.push(e.target.value);
    } else {
     this.state.newDog.merits.splice(this.state.newDog.merits.indexOf(e.target.value), 1);
    }
    this.setState({
      newDog: ({ merits: this.state.newDog.merits, name: this.state.newDog.name })
    });
 }

 meritExist(e){

  let newArr = this.state.newDog.merits;
  let i = null;

   for (i = 0; newArr.length > i; i += 1) {
       if (newArr[i] === e) {
           return true;
       }
   }
   return false;
 }

  render() {

    return (
      <div>
        <div className='row flipInX animated'>
          <div>

            <div className='panel panel-default'>
              <div className='panel-heading'>Edit -NOT IMPLEMENTED-</div>
              <div className='panel-body'>



              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default editDog;

editDog.propTypes = {

 dog: React.PropTypes.object,
 handleEditDogSubmit: React.PropTypes.func
};
