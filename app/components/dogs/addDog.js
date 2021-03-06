import React from 'react';

class addDog extends React.Component {

  constructor(props) {
   super(props);
   this.handleChange = this.handleChange.bind(this);
   this.handleMeritsChange = this.handleMeritsChange.bind(this);
   this.handleDogSubmit = this.handleDogSubmit.bind(this);
   this.state = {

                 newDog: {
                          name: '',
                          image: '',
                          merits: []
                        }
                     };
                  }

handleDogSubmit() {
this.props.updateNewDog(this.state.newDog);
this.setState({
    newDog: {
      name: '',
      image: '',
      merits: []
    }
  });
 }

 handleChange(e) {
  const field = e.target.name;
  const value = e.target.value;
  this.state.newDog[field] = value;
  return this.setState({newDog: this.state.newDog });
  }

 handleMeritsChange(e) {
    const exists = this.meritExist(e.target.value);
    if (!exists) {
      this.state.newDog.merits.push(e.target.value);
    } else {
     this.state.newDog.merits.splice(this.state.newDog.merits.indexOf(e.target.value), 1);
    }
    this.setState({
      newDog: ({ merits: this.state.newDog.merits, name: this.state.newDog.name, image: this.state.newDog.image })
    });
}

 meritExist(e) {
  const newArr = this.state.newDog.merits;
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
        <div className="row flipInX animated">
          <div>
            <div className="panel panel-default">
              <div className="panel-heading">Add Dog</div>
              <div className="panel-body">
                <form onSubmit={this.handleDogSubmit}>
                   <div className="form-group">
                     <label className="control-label">Name</label>
                       <input required type="text" className="form-control" name="name" value={this.state.newDog.name} onChange={this.handleChange}/>
                       <label className="control-label">Image Url</label>
                       <input type="text" className="form-control" placeholder="Not Required" name="image" value={this.state.newDog.image} onChange={this.handleChange}/>
                         <label className="checkbox-inline"><input onChange={this.handleMeritsChange}  type="checkbox" value="IPO1"/>IPO1</label>
                         <label className="checkbox-inline"><input onChange={this.handleMeritsChange}  type="checkbox" value="IPO2"/>IPO2</label>
                         <label className="checkbox-inline"><input onChange={this.handleMeritsChange}  type="checkbox" value="BSL"/>BSL</label>
                    </div>
                   <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default addDog;

addDog.propTypes = {

 newDog: React.PropTypes.object,
 updateNewDog: React.PropTypes.func
};
