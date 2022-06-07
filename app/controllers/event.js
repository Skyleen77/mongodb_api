import EventModel from '../models/event.js';

const Event = class Event {
  constructor(app, connect) {
    this.app = app;
    this.EventModel = connect.model('Event', EventModel);

    this.run();
  }

  get() {
    this.app.get('/event/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.EventModel.findById(req.params.id).then((event) => {
          res.status(200).json(event || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        });
      }
    })
  }

  create() {
    this.app.post('/event/', (req, res) => {
      try {
        const eventModel = new this.EventModel(req.body);

        eventModel.save().then((event) => {
          res.status(200).json(event || {});
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          });
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err
        });
      }
    })
  }

  run() {
    this.get();
    this.create();
  }
}

export default Event;