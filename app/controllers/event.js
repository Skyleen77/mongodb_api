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

  update() {
    this.app.put('/event/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.EventModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { upsert: true }).then((event) => {
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
    this.app.post('/event', (req, res) => {
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

  delete() {
    this.app.delete('/event/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.EventModel.deleteOne({ _id: req.params.id }).then((event) => {
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

  setMember() {
    this.app.post('/event/member/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.EventModel.updateMany({ _id: req.params.id }, {
          $push: {
            members: req.body.members
          }
        }, { upsert: true }).then((event) => {
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
    this.update();
    this.delete();
    this.setMember();
  }
}

export default Event;