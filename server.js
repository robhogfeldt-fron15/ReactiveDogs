 import path from 'path';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
let eventController = require('./controllers/events');
let dogController = require('./controllers/dogs');
let myEventController = require('./controllers/myevents');


let assestsPath = path.resolve(__dirname, 'assets');





const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));
app.use(express.static(assestsPath));



if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}


let mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/reactdb'); 

router.get('/', function (req, res) {
  res.json({ message: 'yay!' });
});


router.route('/events')
  .post(eventController.postEvents)
  .get(eventController.getEvents);


router.route('/events/:event_id')
  .get(eventController.getEvent)
  .put(eventController.putEvent)
  .delete(eventController.deleteEvent);

  router.route('/dogs')
    .post(dogController.postDogs)
    .get(dogController.getDogs);


  router.route('/dogs/:dog_id')
    .get(dogController.getDog)
    .put(dogController.putDog)
    .delete(dogController.deleteDog);


    router.route('/myevents')
      .post(myEventController.postmyEvents)
      .get(myEventController.getmyEvents);


    router.route('/myevents/:myevent_id')
      .get(myEventController.getmyEvent)
      .put(myEventController.putmyEvent)
      .delete(myEventController.deletemyEvent);



app.use('/api', router);

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
