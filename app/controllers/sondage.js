import SondageModel from '../models/sondage.js';

const Sondage = class Sondage {
  constructor(app, connect) {
    this.app = app;
    this.SondageModel = connect.model('Sondage', SondageModel);

    this.run();
  }

  get() {
    this.app.get('/sondage/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.SondageModel.findById(req.params.id).then((sondage) => {
          res.status(200).json(sondage || {});
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
    this.app.put('/sondage/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.SondageModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then((sondage) => {
          res.status(200).json(sondage || {});
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
    this.app.post('/sondage/', (req, res) => {
      try {
        const sondageModel = new this.SondageModel(req.body);

        sondageModel.save().then((sondage) => {
          res.status(200).json(sondage || {});
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
    this.app.delete('/sondage/:id', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.SondageModel.deleteOne({ _id: req.params.id }).then((sondage) => {
          res.status(200).json(sondage || {});
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

  setAnswer() {
    this.app.post('/sondage/question/:id/answer/:idQuestion', (req, res) => {
      try {
        if(!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        if(!req.params.idQuestion) {
          res.status(400).json({
            status: 400,
            message: 'Please use an id in the query string parameters'
          });

          return;
        }

        this.SondageModel.findOneAndUpdate({ 
          '_id': req.params.id, 
          'questions._id': req.params.idQuestion 
        }, {
          $push: {
            'questions.$.answers': req.body
          }
        }, { upsert: true }).then((sondage) => {
          res.status(200).json(sondage || {});
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
    this.setAnswer();
  }
}

export default Sondage;