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

  run() {
    this.get();
    this.create();
  }
}

export default Sondage;