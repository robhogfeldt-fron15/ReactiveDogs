import React from 'react';




class Home extends React.Component {



  render() {

    return (
      <div className="copyright">
            <div className="container">

                    <div className="col-md-6">
                        <h2>Reactive Dogs?</h2>
                        <p>This is an app I tinker with while learning ReactJS. It´s where I put together all the bits and pieces from various books, videos and other
                        learning resources into a project of my own in order to get a better understandeing of the framework.</p>

                      <h2>Is it even completed?</h2>
                      <p>Nope...Its a work in progress and there are features and designs that are only half-implemented as you´ll see.</p>

                      <h2>Allright, What does it do?</h2>
                      <p>My girlfriend has got a lot of dogs. Nine german shepherds to be exact. This is an app that lets her keep track of events, results and the dogs themeselves</p>

                      <h2>Ok, Good for her, what´s in it for me?</h2>
                      <p>Well, the code is available on github and it might contain something useful for you.</p>
                      <p>In this demo, all calls to the db is replaced by a toaster message. So dont be afraid to click on anything that moves.</p>

                    </div>

                    <div className="col-md-6">
                        <h2>Weapons of choice</h2>

                       <ul>
                        <li>ReactJS</li>
                        <li>ExpressJs</li>
                        <li>Mongoose</li>
                        <li>MongoDb</li>
                        <li>Bootstrap</li>
                        <li>The excellent <a href='http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup'>webpack boilerplate</a> by Christian Alfoni </li>
                       </ul>


                    </div>

            </div>
        </div>
    );
  }
}

export default Home;
